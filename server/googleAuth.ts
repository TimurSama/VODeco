import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Express } from "express";
import { storage } from "./storage";
import { UserInterface } from "@shared/auth-schema";

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
          return done(new Error("Email not provided by Google"), null);
        }

        // Проверяем, существует ли пользователь с таким email
        const existingUser = await storage.getUserByEmail(email);
        if (existingUser) {
          // Обновляем существующего пользователя, добавляя Google ID
          user = await storage.updateUserGoogleId(existingUser.id, profile.id);
        } else {
          // Создаем нового пользователя
          user = await storage.createUser({
            username: profile.displayName || email.split('@')[0],
            email,
            password: "", // Пустой пароль, так как авторизация через Google
            firstName: profile.name?.givenName || null,
            lastName: profile.name?.familyName || null,
            profileImageUrl: profile.photos?.[0]?.value || null,
            googleId: profile.id
          });
        }
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
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