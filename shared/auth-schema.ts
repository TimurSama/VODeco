import { z } from "zod";

// Схема для входа по email/пароль
export const loginSchema = z.object({
  username: z.string().min(3, "Имя пользователя должно быть не менее 3 символов"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

// Схема для регистрации через email/пароль
export const registerSchema = z.object({
  username: z.string().min(3, "Имя пользователя должно быть не менее 3 символов"),
  email: z.string().email("Неверный формат email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

// Схема для профиля пользователя Google
export const googleProfileSchema = z.object({
  googleId: z.string(),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileImageUrl: z.string().optional(),
});

// Схема для профиля пользователя Telegram
export const telegramProfileSchema = z.object({
  telegramId: z.string(),
  username: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileImageUrl: z.string().optional(),
});

// Типы для аутентификации
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type GoogleProfileData = z.infer<typeof googleProfileSchema>;
export type TelegramProfileData = z.infer<typeof telegramProfileSchema>;

// Определение интерфейса пользователя для согласованности между клиентом и сервером
export interface UserInterface {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
  walletAddress?: string | null;
  avatar?: string | null;
  role?: string | null;
  votingPower?: number | null;
  joined?: Date | null;
  // Поля для аутентификации через Google и Telegram
  googleId?: string | null;
  telegramId?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}