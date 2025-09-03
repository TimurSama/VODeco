import { z } from "zod";

// Enum для ролей пользователей
export const UserRoleEnum = z.enum([
  'citizen',
  'government',
  'infrastructure',
  'investor',
  'scientific',
  'operator',
  'admin'
]);

// Enum для статуса верификации
export const VerificationStatusEnum = z.enum([
  'pending',
  'verified',
  'rejected'
]);

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
  role: UserRoleEnum.optional().default('citizen'),
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

// Схема для обновления профиля
export const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().max(500).optional(),
  location: z.string().optional(),
  organization: z.string().optional(),
  website: z.string().url().optional(),
  phone: z.string().optional(),
  role: UserRoleEnum.optional(),
});

// Схема для верификации пользователя
export const verificationSchema = z.object({
  documentType: z.enum(['passport', 'drivers_license', 'national_id', 'business_license']),
  documentNumber: z.string(),
  documentImage: z.string(), // base64 encoded image
  organizationName: z.string().optional(),
  organizationRole: z.string().optional(),
});

// Типы для аутентификации
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type GoogleProfileData = z.infer<typeof googleProfileSchema>;
export type TelegramProfileData = z.infer<typeof telegramProfileSchema>;
export type UpdateProfileData = z.infer<typeof updateProfileSchema>;
export type VerificationData = z.infer<typeof verificationSchema>;
export type UserRole = z.infer<typeof UserRoleEnum>;
export type VerificationStatus = z.infer<typeof VerificationStatusEnum>;

// Интерфейс для статистики пользователя
export interface UserStats {
  totalTokens: number;
  tokensEarned: number;
  tokensSpent: number;
  projectsParticipated: number;
  projectsCompleted: number;
  waterQualityReports: number;
  communityContributions: number;
  achievementsUnlocked: number;
  votingPower: number;
  reputation: number;
}

// Интерфейс для достижений пользователя
export interface UserAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  progress: number;
  maxProgress: number;
}

// Интерфейс для активности пользователя
export interface UserActivity {
  id: string;
  type: 'water_quality_report' | 'project_participation' | 'community_contribution' | 'voting' | 'achievement';
  title: string;
  description: string;
  tokensEarned: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// Определение интерфейса пользователя для согласованности между клиентом и сервером
export interface UserInterface {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  bio?: string | null;
  location?: string | null;
  organization?: string | null;
  website?: string | null;
  phone?: string | null;
  profileImageUrl?: string | null;
  walletAddress?: string | null;
  avatar?: string | null;
  
  // Роли и права доступа
  role: UserRole;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  verificationData?: VerificationData | null;
  
  // Токены и экономика
  totalTokens: number;
  votingPower: number;
  reputation: number;
  
  // Статистика и активность
  stats?: UserStats | null;
  achievements?: UserAchievement[] | null;
  recentActivity?: UserActivity[] | null;
  
  // Настройки и предпочтения
  preferences?: {
    language: string;
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      email: boolean;
      push: boolean;
      telegram: boolean;
    };
    privacy: {
      profileVisibility: 'public' | 'private' | 'friends';
      showLocation: boolean;
      showStats: boolean;
    };
  } | null;
  
  // Поля для аутентификации через Google и Telegram
  googleId?: string | null;
  telegramId?: string | null;
  
  // Временные метки
  joined?: Date | null;
  lastActive?: Date | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}