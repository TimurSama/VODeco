
import { db } from "../server/db";
import { users } from "../shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdminAccount() {
  try {
    console.log("Создание аккаунта администратора...");
    
    const hashedPassword = await hashPassword("61330325511055");
    
    const adminUser = {
      username: "Foxampy",
      email: "admin@vodeco.org",
      password: hashedPassword,
      firstName: "Timur",
      lastName: "Sadikov",
      role: "admin",
      votingPower: 100,
      joined: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.insert(users).values(adminUser).returning();
    
    console.log("Аккаунт администратора успешно создан:");
    console.log(`ID: ${result[0].id}`);
    console.log(`Номер аккаунта: 00770017`);
    console.log(`Имя пользователя: ${result[0].username}`);
    console.log(`Полное имя: ${result[0].firstName} ${result[0].lastName}`);
    console.log(`Email: ${result[0].email}`);
    console.log(`Роль: ${result[0].role}`);
    
  } catch (error) {
    console.error("Ошибка при создании аккаунта администратора:", error);
  }
}

createAdminAccount();
