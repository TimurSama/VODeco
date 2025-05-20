import { Express, Request, Response, NextFunction } from "express";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { insertUserSchema, loginSchema } from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { z } from "zod";

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
  // Настройка сессий с хранением в PostgreSQL
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 неделя
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  
  app.use(session({
    secret: process.env.SESSION_SECRET || "vodeco-secret-key-change-in-production",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: sessionTtl,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  }));

  // Регистрация
  app.post("/api/register", async (req: Request, res: Response) => {
    try {
      // Парсинг и валидация входных данных
      const userInput = insertUserSchema.safeParse(req.body);
      if (!userInput.success) {
        return res.status(400).json({ 
          message: "Некорректные данные", 
          errors: userInput.error.format() 
        });
      }

      // Проверка существующего пользователя
      const existingUser = await storage.getUserByEmail(userInput.data.email);
      if (existingUser) {
        return res.status(409).json({ message: "Пользователь с таким email уже существует" });
      }

      const usernameCheck = await storage.getUserByUsername(userInput.data.username);
      if (usernameCheck) {
        return res.status(409).json({ message: "Пользователь с таким именем уже существует" });
      }

      // Хеширование пароля
      const hashedPassword = await hashPassword(userInput.data.password);

      // Создание пользователя
      const user = await storage.createUser({
        ...userInput.data,
        password: hashedPassword,
      });

      // Сохраняем ID пользователя в сессии
      req.session.userId = user.id;

      // Возвращаем данные пользователя (без пароля)
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  });

  // Вход
  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      // Парсинг и валидация входных данных
      const credentials = loginSchema.safeParse(req.body);
      if (!credentials.success) {
        return res.status(400).json({ 
          message: "Некорректные данные для входа", 
          errors: credentials.error.format() 
        });
      }

      // Поиск пользователя
      const user = await storage.getUserByEmail(credentials.data.email);
      if (!user) {
        return res.status(401).json({ message: "Неверный email или пароль" });
      }

      // Проверка пароля
      const passwordMatch = await comparePasswords(credentials.data.password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Неверный email или пароль" });
      }

      // Сохраняем ID пользователя в сессии
      req.session.userId = user.id;

      // Возвращаем данные пользователя (без пароля)
      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Ошибка при входе:", error);
      res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  });

  // Выход
  app.post("/api/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Ошибка при выходе:", err);
        return res.status(500).json({ message: "Ошибка при выходе" });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Выход успешен" });
    });
  });

  // Получение текущего пользователя
  app.get("/api/user", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "Пользователь не найден" });
      }

      // Возвращаем данные пользователя (без пароля)
      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Ошибка при получении пользователя:", error);
      res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  });
}

// Middleware для проверки аутентификации
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Не авторизован" });
  }
  next();
}