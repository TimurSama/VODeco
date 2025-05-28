import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Убрали дублирование схем аутентификации

// Session storage table для Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: text("sid").primaryKey(),
    sess: text("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [{
    name: "IDX_session_expire",
    on: table.expire
  }]
);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  walletAddress: text("wallet_address"),
  avatar: text("avatar"),
  role: text("role").default("participant"),
  joined: timestamp("joined").defaultNow(),
  votingPower: integer("voting_power").default(10),
  googleId: text("google_id").unique(),
  telegramId: text("telegram_id").unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
  walletAddress: true,
  avatar: true,
  role: true,
  votingPower: true,
  googleId: true,
  telegramId: true
}).omit({ id: true });

export const loginSchema = z.object({
  email: z.string().email("Требуется корректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов")
});

export const registerSchema = loginSchema.extend({
  username: z.string().min(3, "Имя пользователя должно содержать минимум 3 символа"),
  confirmPassword: z.string().min(6, "Пароль должен содержать минимум 6 символов")
}).refine(data => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"]
});

export const upsertUserSchema = insertUserSchema.partial();

// Water Resources table
export const waterResources = pgTable("water_resources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  region: text("region").notNull(),
  country: text("country").notNull(),
  status: text("status").notNull(),
  qualityIndex: integer("quality_index").notNull(),
  flowRate: real("flow_rate").notNull(),
  isActive: boolean("is_active").default(true),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  // Инвестиционные параметры
  totalFunding: real("total_funding"),
  availableForDAO: real("available_for_dao"),
  fundingProgress: integer("funding_progress").default(0),
  irr: real("irr"),                     // Estimated Annual Return
  participantsCount: integer("participants_count").default(0),
  projectType: text("project_type"),    // pump station, treatment plant, etc.
  investmentStatus: text("investment_status").default("open"), // open, closed, fully-funded
  category: text("category"),   // тип маркера: investment или path
});

export const insertWaterResourceSchema = createInsertSchema(waterResources).pick({
  name: true,
  region: true,
  country: true,
  status: true,
  qualityIndex: true,
  flowRate: true,
  isActive: true,
  latitude: true,
  longitude: true,
  description: true,
  imageUrl: true,
  totalFunding: true,
  availableForDAO: true,
  fundingProgress: true,
  irr: true,
  projectType: true,
  investmentStatus: true,
  category: true,
});

// Investment Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  region: text("region").notNull(),
  country: text("country").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  totalFunding: real("total_funding").notNull(),
  availableForDAO: real("available_for_dao").notNull(),
  fundingProgress: integer("funding_progress").default(0),
  irr: real("irr").notNull(),
  endDate: timestamp("end_date").notNull()
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  location: true,
  region: true,
  country: true,
  description: true,
  imageUrl: true,
  totalFunding: true,
  availableForDAO: true,
  fundingProgress: true,
  irr: true,
  endDate: true
});

// DAO Proposals table
export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  votesYes: integer("votes_yes").default(0),
  votesNo: integer("votes_no").default(0),
  quorum: integer("quorum").default(0),
  requiredQuorum: integer("required_quorum").default(50),
  status: text("status").notNull(),
  endDate: timestamp("end_date").notNull(),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertProposalSchema = createInsertSchema(proposals).pick({
  title: true,
  description: true,
  votesYes: true,
  votesNo: true,
  quorum: true,
  requiredQuorum: true,
  status: true,
  endDate: true,
  createdBy: true
});

// DAO Events table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  isVirtual: boolean("is_virtual").default(false),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  date: true,
  location: true,
  isVirtual: true
});

// Votes table to track user votes on proposals
export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  proposalId: integer("proposal_id").references(() => proposals.id).notNull(),
  voteType: text("vote_type").notNull(), // "yes" or "no"
  votingPower: integer("voting_power").notNull(),
  timestamp: timestamp("timestamp").defaultNow()
});

export const insertVoteSchema = createInsertSchema(votes).pick({
  userId: true,
  proposalId: true,
  voteType: true,
  votingPower: true
});

// Investments table to track user investments in projects
export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  amount: real("amount").notNull(),
  timestamp: timestamp("timestamp").defaultNow()
});

export const insertInvestmentSchema = createInsertSchema(investments).pick({
  userId: true,
  projectId: true,
  amount: true
});

// Только актуальные типы и схемы сохранены

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

export type InsertWaterResource = z.infer<typeof insertWaterResourceSchema>;
export type WaterResource = typeof waterResources.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertProposal = z.infer<typeof insertProposalSchema>;
export type Proposal = typeof proposals.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export type InsertVote = z.infer<typeof insertVoteSchema>;
export type Vote = typeof votes.$inferSelect;

export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Investment = typeof investments.$inferSelect;

// User Tokens table - для хранения токенов пользователей
export const userTokens = pgTable("user_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  tokenSymbol: text("token_symbol").notNull(), // VOD, H2O, VOD_Regional и т.д.
  balance: real("balance").default(0).notNull(),
  staked: real("staked").default(0).notNull(),
  earned: real("earned").default(0).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow()
});

export const insertUserTokenSchema = createInsertSchema(userTokens).pick({
  userId: true,
  tokenSymbol: true,
  balance: true,
  staked: true,
  earned: true
});

// User Activities table - для отслеживания активности
export const userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sessionId: text("session_id"), // для незарегистрированных пользователей
  activityType: text("activity_type").notNull(), // 'preview_exploration', 'vote', 'investment', 'mission_complete'
  tokensEarned: real("tokens_earned").default(0),
  details: text("details"), // JSON строка с дополнительными данными
  timestamp: timestamp("timestamp").defaultNow().notNull()
});

export const insertUserActivitySchema = createInsertSchema(userActivities).pick({
  userId: true,
  sessionId: true,
  activityType: true,
  tokensEarned: true,
  details: true
});

// Temporary Sessions table - для незарегистрированных пользователей
export const tempSessions = pgTable("temp_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").unique().notNull(),
  tokensCollected: real("tokens_collected").default(0),
  activitiesCompleted: integer("activities_completed").default(0),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  lastActiveAt: timestamp("last_active_at").defaultNow().notNull(),
  convertedToUserId: integer("converted_to_user_id").references(() => users.id),
  isActive: boolean("is_active").default(true)
});

export const insertTempSessionSchema = createInsertSchema(tempSessions).pick({
  sessionId: true,
  tokensCollected: true,
  activitiesCompleted: true,
  convertedToUserId: true
});

// User Staking table - для детального отслеживания стейкинга
export const userStaking = pgTable("user_staking", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  tokenSymbol: text("token_symbol").notNull(),
  amount: real("amount").notNull(),
  apy: real("apy").notNull(),
  startDate: timestamp("start_date").defaultNow().notNull(),
  lockPeriod: integer("lock_period").notNull(), // в днях
  endDate: timestamp("end_date").notNull(),
  status: text("status").default("active").notNull(), // active, completed, withdrawn
  rewardsEarned: real("rewards_earned").default(0)
});

export const insertUserStakingSchema = createInsertSchema(userStaking).pick({
  userId: true,
  tokenSymbol: true,
  amount: true,
  apy: true,
  lockPeriod: true,
  endDate: true,
  status: true,
  rewardsEarned: true
});

export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'official', 'public', 'private'
  category: text("category").notNull(), // 'global', 'regional', 'project', 'initiative', 'education'
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  creatorId: integer("creator_id").references(() => users.id),
  memberCount: integer("member_count").default(0),
  isActive: boolean("is_active").default(true)
});

export const insertGroupSchema = createInsertSchema(groups).pick({
  name: true,
  description: true,
  type: true,
  category: true,
  imageUrl: true,
  creatorId: true
});

export const groupMembers = pgTable("group_members", {
  id: serial("id").primaryKey(),
  groupId: integer("group_id").references(() => groups.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  role: text("role").default("member").notNull(), // 'owner', 'moderator', 'member'
  joinedAt: timestamp("joined_at").defaultNow().notNull()
});

export const insertGroupMemberSchema = createInsertSchema(groupMembers).pick({
  groupId: true,
  userId: true,
  role: true
});

export const groupPosts = pgTable("group_posts", {
  id: serial("id").primaryKey(),
  groupId: integer("group_id").references(() => groups.id).notNull(),
  authorId: integer("author_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: text("type").default("post").notNull(), // 'post', 'announcement', 'poll'
  isPinned: boolean("is_pinned").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
});

export const insertGroupPostSchema = createInsertSchema(groupPosts).pick({
  groupId: true,
  authorId: true,
  title: true,
  content: true,
  type: true,
  isPinned: true
});

export type InsertGroup = z.infer<typeof insertGroupSchema>;
export type Group = typeof groups.$inferSelect;

export type InsertGroupMember = z.infer<typeof insertGroupMemberSchema>;
export type GroupMember = typeof groupMembers.$inferSelect;

export type InsertGroupPost = z.infer<typeof insertGroupPostSchema>;
export type GroupPost = typeof groupPosts.$inferSelect;

export type InsertUserToken = z.infer<typeof insertUserTokenSchema>;
export type UserToken = typeof userTokens.$inferSelect;

export type InsertUserActivity = z.infer<typeof insertUserActivitySchema>;
export type UserActivity = typeof userActivities.$inferSelect;

export type InsertTempSession = z.infer<typeof insertTempSessionSchema>;
export type TempSession = typeof tempSessions.$inferSelect;

export type InsertUserStaking = z.infer<typeof insertUserStakingSchema>;
export type UserStaking = typeof userStaking.$inferSelect;
```