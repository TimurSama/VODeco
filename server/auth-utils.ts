import { User } from "@shared/schema";

/**
 * Адаптирует объект пользователя из базы данных для использования в Passport.js
 */
export function adaptUserForPassport(user: any): Express.User {
  return {
    id: Number(user.id),
    username: user.username || "",
    email: user.email || "",
    password: user.password || "",
    firstName: user.firstName || null,
    lastName: user.lastName || null,
    profileImageUrl: user.profileImageUrl || null,
    walletAddress: user.walletAddress || null,
    avatar: user.avatar || null,
    role: user.role || null,
    votingPower: user.votingPower || null,
    joined: user.joined || null,
    googleId: user.googleId || null,
    telegramId: user.telegramId || null,
    createdAt: user.createdAt || null,
    updatedAt: user.updatedAt || null
  };
}