// Basic User Type
export interface User {
  id: number;
  walletAddress?: string;
  username: string;
  avatar?: string;
  role?: UserRole;
  joined: Date;
  votingPower: number;
}

// User Roles
export enum UserRole {
  Guest = 'guest',
  Participant = 'participant',
  Operator = 'operator',
  Scientist = 'scientist',
  Investor = 'investor',
  Government = 'government'
}

// Token Types
export interface Token {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  logo?: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  type: TransactionType;
  token: string;
  amount: number;
  date: Date;
  status: TransactionStatus;
  from?: string;
  to?: string;
}

export enum TransactionType {
  RECEIVED = 'Received',
  SENT = 'Sent',
  STAKING = 'Staking',
  DAO_VOTE = 'DAO Vote'
}

export enum TransactionStatus {
  COMPLETED = 'Completed',
  PENDING = 'Pending',
  FAILED = 'Failed'
}

// Water Resource Types
export interface WaterResource {
  id: number;
  name: string;
  region: string;
  country: string;
  status: ResourceStatus;
  qualityIndex: number;
  flowRate: number;
  isActive: boolean;
  latitude: number;
  longitude: number;
  description?: string;
  imageUrl?: string;
  // Investment parameters
  totalFunding?: number;
  availableForDAO?: number;
  fundingProgress?: number;
  irr?: number; // Interest Rate of Return in %
  participantsCount?: number;
  projectType?: string; // pump station, treatment plant, etc.
  investmentStatus?: string; // 'open', 'closed', 'fully-funded'
  category?: ResourceCategory; // Категория ресурса для определения типа маркера
}

export enum ResourceStatus {
  CRITICAL = 'Critical',
  NEEDS_ATTENTION = 'Needs Attention',
  STABLE = 'Stable',
  EXCELLENT = 'Excellent'
}

export enum ResourceCategory {
  INVESTMENT = 'investment',  // Объекты для инвестирования (синие маркеры)
  PATH = 'path',              // Объекты пути (белые маркеры)
  COMPLETED = 'completed'     // Завершенные проекты (зеленые маркеры)
}

// Completed Project Types
export interface CompletedProject {
  id: number;
  name: string;
  type: string;
  status: string;
  location: string;
  region: string;
  country: string;
  completion_date: string;
  capacity?: number;
  total_investment?: number;
  beneficiaries?: number;
  latitude?: number;
  longitude?: number;
  description?: string;
  created_at?: string;
}

// Project Types
export interface Project {
  id: number;
  name: string;
  location: string;
  region: string;
  country: string;
  description: string;
  imageUrl?: string;
  totalFunding: number;
  availableForDAO: number;
  fundingProgress: number;
  irr: number; // Interest Rate of Return in %
  endDate: Date;
}

// DAO Proposal Types
export interface Proposal {
  id: number;
  title: string;
  description: string;
  votesYes: number;
  votesNo: number;
  quorum: number;
  requiredQuorum: number;
  status: ProposalStatus;
  endDate: Date;
}

export enum ProposalStatus {
  ACTIVE = 'Active',
  PASSED = 'Passed',
  FAILED = 'Failed',
  PENDING = 'Pending'
}

// DAO Event Types
export interface DAOEvent {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  isVirtual: boolean;
}

// NFT Achievement Types
export interface NFTAchievement {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  dateAcquired: Date;
}

// Staking Option Types
export interface StakingOption {
  id: number;
  name: string;
  token: string;
  apy: number; // Annual Percentage Yield in %
  capacity: number;
  filled: number;
  minAmount: number;
  lockPeriod: number; // in days
}

// Group Types
export interface Group {
  id: number;
  name: string;
  type: string; // 'official', 'public', 'private'
  description: string;
  category: string; // 'global', 'regional', 'professional', 'education', 'investment'
  memberCount: number;
  creatorId?: number;
  imageUrl?: string | null;
  isActive: boolean;
  createdAt: Date;
}

export interface GroupMember {
  id: number;
  groupId: number;
  userId: number;
  role: string; // 'owner', 'moderator', 'member'
  joinedAt: Date;
}

export interface GroupPost {
  id: number;
  groupId: number;
  authorId: number;
  title: string;
  content: string;
  type: string; // 'announcement', 'discussion', 'question', etc.
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}
