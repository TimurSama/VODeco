import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Express } from "express";
import { storage } from "./storage";
import { UserInterface } from "@shared/auth-schema";
import { adaptUserForPassport } from "./auth-utils";

// Функция для настройки Google аутентификации
export function setupGoogleAuth(app: Express) {
  // Проверка наличия необходимых переменных окружения
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/auth/google/callback";

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    console.warn("Google OAuth credentials not provided. Google authentication is disabled.");
    return;
  }

  // Настройка стратегии аутентификации Google
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: ["profile", "email"]
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Поиск пользователя по Google ID
      let user = await storage.getUserByGoogleId(profile.id);

      // Если пользователь не найден, создаем нового
      if (!user) {
        // Извлечение данных профиля
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error("Email not provided by Google"), false);
        }

        // Проверяем, существует ли пользователь с таким email
        const existingUser = await storage.getUserByEmail(email);
        if (existingUser) {
          // Обновляем существующего пользователя, добавляя Google ID
          user = await storage.updateUserGoogleId(Number(existingUser.id), profile.id);
        } else {
          // Генерируем уникальное имя пользователя
          let username = profile.displayName || email.split('@')[0];
          let counter = 1;
          while (await storage.getUserByUsername(username)) {
            username = `${profile.displayName || email.split('@')[0]}_${counter}`;
            counter++;
          }

          // Создаем нового пользователя
          user = await storage.createUser({
            username,
            email,
            password: "", // Пустой пароль для OAuth
            firstName: profile.name?.givenName || null,
            lastName: profile.name?.familyName || null,
            profileImageUrl: profile.photos?.[0]?.value || null,
            googleId: profile.id,
            role: "participant",
            joined: new Date(),
            votingPower: 100,
            isActive: true,
            isVerified: true, // Google аккаунты считаем верифицированными
            lastLogin: new Date()
          });

          // Даем приветственные токены
          await storage.updateUserToken(user.id, 'VOD', 750, 0, 0); // Бонус за OAuth регистрацию
        }
      } else {
        // Обновляем время последнего входа
        await storage.updateUserLastLogin(user.id);
      }

      // Используем утилиту для адаптации пользователя к требованиям Passport
      return done(null, adaptUserForPassport(user));
    } catch (error) {
      console.error("Google OAuth error:", error);
      return done(error, false);
    }
  }));

  // Маршруты для Google аутентификации
  app.get(
    "/api/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth" }),
    (req, res) => {
      // Успешная аутентификация, перенаправляем на домашнюю страницу
      res.redirect("/");
    }
  );
}