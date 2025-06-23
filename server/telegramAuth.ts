import { Express, Request, Response, NextFunction } from "express";
import { storage } from "./storage";
import crypto from "crypto";
import { adaptUserForPassport } from "./auth-utils";

// Функция для настройки Telegram аутентификации
export function setupTelegramAuth(app: Express) {
  // Проверка наличия бота токена
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!TELEGRAM_BOT_TOKEN) {
    console.warn("Telegram Bot Token not provided. Telegram authentication is disabled.");
    return;
  }

  // Маршрут для аутентификации через Telegram
  app.post("/api/auth/telegram", async (req: Request, res: Response) => {
    try {
      const { id, first_name, last_name, username, photo_url, auth_date, hash } = req.body;

      // Проверка валидности данных Telegram
      if (!id || !auth_date || !hash) {
        return res.status(400).json({ message: "Недостаточно данных для аутентификации" });
      }

      // Проверка хеша для безопасности
      if (!validateTelegramAuth(req.body, TELEGRAM_BOT_TOKEN)) {
        return res.status(403).json({ message: "Неверные данные аутентификации" });
      }

      // Поиск пользователя по Telegram ID
      let user = await storage.getUserByTelegramId(id.toString());

      // Если пользователь не найден, создаем нового
      if (!user) {
        // Генерируем уникальное имя пользователя
        let generatedUsername = username || `telegram_${id}`;
        let counter = 1;
        while (await storage.getUserByUsername(generatedUsername)) {
          generatedUsername = `${username || `telegram_${id}`}_${counter}`;
          counter++;
        }
        
        // Создаем нового пользователя
        user = await storage.createUser({
          username: generatedUsername,
          email: `${generatedUsername}@telegram.placeholder`, // Placeholder email
          password: "", // Пустой пароль для OAuth
          firstName: first_name || null,
          lastName: last_name || null,
          profileImageUrl: photo_url || null,
          telegramId: id.toString(),
          role: "participant",
          joined: new Date(),
          votingPower: 100,
          isActive: true,
          isVerified: true, // Telegram аккаунты считаем верифицированными
          lastLogin: new Date()
        });

        // Даем приветственные токены
        await storage.updateUserToken(user.id, 'VOD', 750, 0, 0); // Бонус за OAuth регистрацию
      } else {
        // Обновляем время последнего входа
        await storage.updateUserLastLogin(user.id);
      }

      // Вход пользователя с использованием адаптера для правильной типизации
      req.login(adaptUserForPassport(user), (err) => {
        if (err) {
          return res.status(500).json({ message: "Ошибка аутентификации", error: err.message });
        }
        return res.status(200).json(user);
      });
    } catch (error) {
      console.error("Ошибка Telegram аутентификации:", error);
      res.status(500).json({ message: "Ошибка аутентификации" });
    }
  });
}

// Функция для валидации данных Telegram аутентификации
function validateTelegramAuth(authData: any, botToken: string): boolean {
  const { hash, ...data } = authData;
  
  // Удаляем hash из проверяемых данных
  delete data.hash;
  
  // Проверка временной метки (не более 24 часов)
  const authDate = parseInt(data.auth_date);
  const now = Math.floor(Date.now() / 1000);
  if (now - authDate > 86400) {
    return false;
  }
  
  // Формируем строку для проверки
  const dataCheckString = Object.keys(data)
    .sort()
    .map(key => `${key}=${data[key]}`)
    .join('\n');
  
  // Создаем секретный ключ из токена бота
  const secretKey = crypto
    .createHash('sha256')
    .update(botToken)
    .digest();
  
  // Вычисляем HMAC-SHA-256
  const calculatedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');
  
  // Сравниваем вычисленный хеш с полученным
  return calculatedHash === hash;
}