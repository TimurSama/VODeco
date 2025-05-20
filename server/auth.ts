import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User } from "@shared/schema";
import { UserInterface, loginSchema, registerSchema } from "@shared/auth-schema";
import { ZodError } from "zod";
import connectPg from "connect-pg-simple";

declare global {
  namespace Express {
    interface User extends User {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  // Создаем хранилище сессий в PostgreSQL
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    tableName: "sessions"
  });

  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "vodeco-secret-key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000 // одна неделя
    }
  };

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Регистрация пользователя
  app.post("/api/register", async (req: Request, res: Response) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Проверяем, существует ли уже пользователь с таким именем
      const existingUserByUsername = await storage.getUserByUsername(userData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
      }
      
      // Проверяем, существует ли уже пользователь с таким email
      const existingUserByEmail = await storage.getUserByEmail(userData.email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Пользователь с таким email уже существует" });
      }

      // Создаем нового пользователя с хешированным паролем
      const hashedPassword = await hashPassword(userData.password);
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
        role: "participant",
        joined: new Date(),
        votingPower: 0
      });

      // Аутентифицируем пользователя после регистрации
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Ошибка входа после регистрации" });
        }
        // Возвращаем данные пользователя без пароля
        const { password, ...userWithoutPassword } = user;
        return res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Ошибка валидации", errors: error.errors });
      }
      console.error("Ошибка регистрации:", error);
      res.status(500).json({ message: "Ошибка регистрации" });
    }
  });

  // Вход пользователя
  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      const credentials = loginSchema.parse(req.body);
      
      passport.authenticate("local", (err: Error, user: User) => {
        if (err) {
          return res.status(500).json({ message: "Ошибка входа" });
        }
        if (!user) {
          return res.status(401).json({ message: "Неверное имя пользователя или пароль" });
        }
        
        req.login(user, (loginErr) => {
          if (loginErr) {
            return res.status(500).json({ message: "Ошибка входа в систему" });
          }
          
          // Возвращаем данные пользователя без пароля
          const { password, ...userWithoutPassword } = user;
          return res.status(200).json(userWithoutPassword);
        });
      })(req, res);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Ошибка валидации", errors: error.errors });
      }
      console.error("Ошибка входа:", error);
      res.status(500).json({ message: "Ошибка входа" });
    }
  });

  // Выход пользователя
  app.post("/api/logout", (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Ошибка выхода" });
      }
      res.status(200).json({ message: "Выход выполнен успешно" });
    });
  });

  // Получение данных текущего пользователя
  app.get("/api/user", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Не авторизован" });
    }
    
    // Возвращаем данные пользователя без пароля
    const { password, ...userWithoutPassword } = req.user as User;
    res.json(userWithoutPassword);
  });
}

// Middleware для защиты маршрутов
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Требуется авторизация" });
}