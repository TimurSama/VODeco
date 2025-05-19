// Глобальные типы для TypeScript

declare module "@shared/schema" {
  interface User {
    id: string;
    username: string;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    profileImageUrl: string | null;
    walletAddress: string | null;
    avatar: string | null;
    role: string | null;
    joined: Date | null;
    votingPower: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }
}