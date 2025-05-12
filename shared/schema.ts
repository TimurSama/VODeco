import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  walletAddress: text("wallet_address"),
  avatar: text("avatar"),
  role: text("role").default("participant"),
  joined: timestamp("joined").defaultNow(),
  votingPower: integer("voting_power").default(0)
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  walletAddress: true,
  avatar: true,
  role: true,
});

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
  imageUrl: text("image_url")
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

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

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
