import { z } from "zod";

// Схема для входа
export const loginSchema = z.object({
  username: z.string().min(3, "Имя пользователя должно быть не менее 3 символов"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

// Схема для регистрации
export const registerSchema = loginSchema.extend({
  email: z.string().email("Неверный формат email"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

// Типы для аутентификации
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

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
  createdAt?: Date | null;
  updatedAt?: Date | null;
}