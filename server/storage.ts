import {
  users, waterResources, projects, proposals, events, votes, investments, groups, groupMembers, groupPosts,
  userTokens, userActivities, tempSessions, userStaking,
  type User, type WaterResource, type Project, type Proposal, type Event, type Vote, type Investment, 
  type Group, type GroupMember, type GroupPost, type UserToken, type UserActivity, type TempSession, type UserStaking,
  type InsertUser, type InsertWaterResource, type InsertProject, type InsertProposal, 
  type InsertEvent, type InsertVote, type InsertInvestment, type InsertGroup, 
  type InsertGroupMember, type InsertGroupPost, type InsertUserToken, type InsertUserActivity,
  type InsertTempSession, type InsertUserStaking
} from "@shared/schema";

// Define the storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByWalletAddress(walletAddress: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  getUserByTelegramId(telegramId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserGoogleId(userId: number, googleId: string): Promise<User>;

  // Water resource operations
  getWaterResource(id: number): Promise<WaterResource | undefined>;
  getAllWaterResources(): Promise<WaterResource[]>;
  createWaterResource(resource: InsertWaterResource): Promise<WaterResource>;
  updateWaterResource(id: number, data: Partial<WaterResource>): Promise<WaterResource | undefined>;

  // Project operations
  getProject(id: number): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProjectFunding(id: number, additionalFunding: number): Promise<Project | undefined>;

  // Proposal operations
  getProposal(id: number): Promise<Proposal | undefined>;
  getActiveProposals(): Promise<Proposal[]>;
  getRecentDecisions(): Promise<Proposal[]>;
  createProposal(proposal: InsertProposal): Promise<Proposal>;
  voteOnProposal(vote: InsertVote): Promise<Vote>;
  updateProposalStatus(id: number, status: string): Promise<Proposal | undefined>;

  // Event operations
  getEvent(id: number): Promise<Event | undefined>;
  getUpcomingEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;

  // Investment operations
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  getInvestmentsByUser(userId: number): Promise<Investment[]>;
  getInvestmentsByProject(projectId: number): Promise<Investment[]>;

  // Group operations
  getGroup(id: number): Promise<Group | undefined>;
  getAllGroups(): Promise<Group[]>;
  getGroupsByCategory(category: string): Promise<Group[]>;
  getGroupsByType(type: string): Promise<Group[]>;
  createGroup(group: InsertGroup): Promise<Group>;
  updateGroup(id: number, data: Partial<Group>): Promise<Group | undefined>;

  // Group member operations
  getGroupMembers(groupId: number): Promise<GroupMember[]>;
  getUserGroups(userId: number): Promise<Group[]>;
  addGroupMember(member: InsertGroupMember): Promise<GroupMember>;
  updateGroupMemberRole(groupId: number, userId: number, role: string): Promise<GroupMember | undefined>;
  removeGroupMember(groupId: number, userId: number): Promise<boolean>;

  // Group post operations
  getGroupPosts(groupId: number): Promise<GroupPost[]>;
  getGroupPost(id: number): Promise<GroupPost | undefined>;
  createGroupPost(post: InsertGroupPost): Promise<GroupPost>;
  updateGroupPost(id: number, data: Partial<GroupPost>): Promise<GroupPost | undefined>;
  deleteGroupPost(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waterResources: Map<number, WaterResource>;
  private projects: Map<number, Project>;
  private proposals: Map<number, Proposal>;
  private events: Map<number, Event>;
  private votes: Map<number, Vote>;
  private investments: Map<number, Investment>;
  private groups: Map<number, Group>;
  private groupMembers: Map<number, GroupMember>;
  private groupPosts: Map<number, GroupPost>;

  private currentUserId: number;
  private currentResourceId: number;
  private currentProjectId: number;
  private currentProposalId: number;
  private currentEventId: number;
  private currentVoteId: number;
  private currentInvestmentId: number;
  private currentGroupId: number;
  private currentGroupMemberId: number;
  private currentGroupPostId: number;

  constructor() {
    this.users = new Map();
    this.waterResources = new Map();
    this.projects = new Map();
    this.proposals = new Map();
    this.events = new Map();
    this.votes = new Map();
    this.investments = new Map();
    this.groups = new Map();
    this.groupMembers = new Map();
    this.groupPosts = new Map();

    this.currentUserId = 1;
    this.currentResourceId = 1;
    this.currentProjectId = 1;
    this.currentProposalId = 1;
    this.currentEventId = 1;
    this.currentVoteId = 1;
    this.currentInvestmentId = 1;
    this.currentGroupId = 1;
    this.currentGroupMemberId = 1;
    this.currentGroupPostId = 1;

    // Seed the database with some initial data
    // Вызываем асинхронную функцию, но не ждем ее завершения в конструкторе
    this.seedData().catch(err => console.error("Error seeding data:", err));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByWalletAddress(walletAddress: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.walletAddress === walletAddress,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.googleId === googleId,
    );
  }

  async getUserByTelegramId(telegramId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.telegramId === telegramId,
    );
  }

  async updateUserGoogleId(userId: number, googleId: string): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const updatedUser = { ...user, googleId, updatedAt: new Date() };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      joined: new Date(),
      votingPower: 0
    };
    this.users.set(id, user);
    return user;
  }

  // Water resource operations
  async getWaterResource(id: number): Promise<WaterResource | undefined> {
    return this.waterResources.get(id);
  }

  async getAllWaterResources(): Promise<WaterResource[]> {
    return Array.from(this.waterResources.values());
  }

  async createWaterResource(resource: InsertWaterResource): Promise<WaterResource> {
    const id = this.currentResourceId++;
    const waterResource: WaterResource = { ...resource, id };
    this.waterResources.set(id, waterResource);
    return waterResource;
  }

  async updateWaterResource(id: number, data: Partial<WaterResource>): Promise<WaterResource | undefined> {
    const resource = this.waterResources.get(id);
    if (!resource) return undefined;

    const updatedResource = { ...resource, ...data };
    this.waterResources.set(id, updatedResource);
    return updatedResource;
  }

  // Project operations
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const newProject: Project = { ...project, id };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProjectFunding(id: number, additionalFunding: number): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;

    // Calculate new funding progress
    const totalNeeded = project.availableForDAO;
    const currentFunding = (project.fundingProgress / 100) * totalNeeded;
    const newFunding = currentFunding + additionalFunding;
    const newFundingProgress = Math.min(Math.round((newFunding / totalNeeded) * 100), 100);

    const updatedProject = { ...project, fundingProgress: newFundingProgress };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  // Proposal operations
  async getProposal(id: number): Promise<Proposal | undefined> {
    return this.proposals.get(id);
  }

  async getActiveProposals(): Promise<Proposal[]> {
    return Array.from(this.proposals.values()).filter(
      (proposal) => proposal.status === 'Active'
    );
  }

  async getRecentDecisions(): Promise<Proposal[]> {
    return Array.from(this.proposals.values()).filter(
      (proposal) => proposal.status === 'Passed' || proposal.status === 'Failed'
    ).sort((a, b) => b.endDate.getTime() - a.endDate.getTime());
  }

  async createProposal(proposal: InsertProposal): Promise<Proposal> {
    const id = this.currentProposalId++;
    const newProposal: Proposal = { 
      ...proposal, 
      id,
      createdAt: new Date()
    };
    this.proposals.set(id, newProposal);
    return newProposal;
  }

  async voteOnProposal(insertVote: InsertVote): Promise<Vote> {
    const id = this.currentVoteId++;
    const vote: Vote = { 
      ...insertVote, 
      id,
      timestamp: new Date()
    };
    this.votes.set(id, vote);

    // Update the proposal
    const proposal = this.proposals.get(vote.proposalId);
    if (proposal) {
      const updatedVotes = vote.voteType === 'yes' 
        ? { votesYes: proposal.votesYes + vote.votingPower }
        : { votesNo: proposal.votesNo + vote.votingPower };

      // Calculate new quorum
      const totalVotingPower = 10000; // Mock total for calculation
      const totalVotes = proposal.votesYes + proposal.votesNo + vote.votingPower;
      const newQuorum = Math.round((totalVotes / totalVotingPower) * 100);

      const updatedProposal = { 
        ...proposal, 
        ...updatedVotes,
        quorum: newQuorum
      };
      this.proposals.set(proposal.id, updatedProposal);
    }

    return vote;
  }

  async updateProposalStatus(id: number, status: string): Promise<Proposal | undefined> {
    const proposal = this.proposals.get(id);
    if (!proposal) return undefined;

    const updatedProposal = { ...proposal, status };
    this.proposals.set(id, updatedProposal);
    return updatedProposal;
  }

  // Event operations
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return Array.from(this.events.values())
      .filter(event => event.date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const newEvent: Event = { 
      ...event, 
      id,
      createdAt: new Date()
    };
    this.events.set(id, newEvent);
    return newEvent;
  }

  // Investment operations
  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const id = this.currentInvestmentId++;
    const newInvestment: Investment = { 
      ...investment, 
      id,
      timestamp: new Date()
    };
    this.investments.set(id, newInvestment);

    // Update the project funding
    await this.updateProjectFunding(investment.projectId, investment.amount);

    return newInvestment;
  }

  async getInvestmentsByUser(userId: number): Promise<Investment[]> {
    return Array.from(this.investments.values())
      .filter(investment => investment.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getInvestmentsByProject(projectId: number): Promise<Investment[]> {
    return Array.from(this.investments.values())
      .filter(investment => investment.projectId === projectId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // Group operations
  async getGroup(id: number): Promise<Group | undefined> {
    return this.groups.get(id);
  }

  async getAllGroups(): Promise<Group[]> {
    return Array.from(this.groups.values());
  }

  async getGroupsByCategory(category: string): Promise<Group[]> {
    const groups = Array.from(this.groups.values());
    return groups.filter(group => group.category === category);
  }

  async getGroupsByType(type: string): Promise<Group[]> {
    const groups = Array.from(this.groups.values());
    return groups.filter(group => group.type === type);
  }

  async createGroup(group: InsertGroup): Promise<Group> {
    const id = this.currentGroupId++;
    const createdAt = new Date();
    const newGroup: Group = { ...group, id, createdAt, memberCount: 0, isActive: true };
    this.groups.set(id, newGroup);
    return newGroup;
  }

  async updateGroup(id: number, data: Partial<Group>): Promise<Group | undefined> {
    const group = this.groups.get(id);
    if (!group) return undefined;

    const updatedGroup = { ...group, ...data };
    this.groups.set(id, updatedGroup);
    return updatedGroup;
  }

  // Group member operations
  async getGroupMembers(groupId: number): Promise<GroupMember[]> {
    const members = Array.from(this.groupMembers.values());
    return members.filter(member => member.groupId === groupId);
  }

  async getUserGroups(userId: number): Promise<Group[]> {
    const members = Array.from(this.groupMembers.values())
      .filter(member => member.userId === userId);

    const groupIds = members.map(member => member.groupId);
    return Array.from(this.groups.values())
      .filter(group => groupIds.includes(group.id));
  }

  async addGroupMember(member: InsertGroupMember): Promise<GroupMember> {
    const id = this.currentGroupMemberId++;
    const joinedAt = new Date();
    const newMember: GroupMember = { ...member, id, joinedAt };
    this.groupMembers.set(id, newMember);

    // Update member count in the group
    const group = this.groups.get(member.groupId);
    if (group) {
      group.memberCount = (group.memberCount || 0) + 1;
      this.groups.set(group.id, group);
    }

    return newMember;
  }

  async updateGroupMemberRole(groupId: number, userId: number, role: string): Promise<GroupMember | undefined> {
    for (const member of this.groupMembers.values()) {
      if (member.groupId === groupId && member.userId === userId) {
        const updatedMember = { ...member, role };
        this.groupMembers.set(member.id, updatedMember);
        return updatedMember;
      }
    }
    return undefined;
  }

  async removeGroupMember(groupId: number, userId: number): Promise<boolean> {
    let found = false;
    for (const [key, member] of this.groupMembers.entries()) {
      if (member.groupId === groupId && member.userId === userId) {
        this.groupMembers.delete(key);
        found = true;

        // Update member count in the group
        const group = this.groups.get(groupId);
        if (group && group.memberCount > 0) {
          group.memberCount -= 1;
          this.groups.set(groupId, group);
        }

        break;
      }
    }
    return found;
  }

  // Group post operations
  async getGroupPosts(groupId: number): Promise<GroupPost[]> {
    const posts = Array.from(this.groupPosts.values());
    return posts.filter(post => post.groupId === groupId)
      .sort((a, b) => {
        // Sort by pinned status first, then by date (newest first)
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
  }

  async getGroupPost(id: number): Promise<GroupPost | undefined> {
    return this.groupPosts.get(id);
  }

  async createGroupPost(post: InsertGroupPost): Promise<GroupPost> {
    const id = this.currentGroupPostId++;
    const createdAt = new Date();
    const newPost: GroupPost = { ...post, id, createdAt, updatedAt: null };
    this.groupPosts.set(id, newPost);
    return newPost;
  }

  async updateGroupPost(id: number, data: Partial<GroupPost>): Promise<GroupPost | undefined> {
    const post = this.groupPosts.get(id);
    if (!post) return undefined;

    const updatedPost = { 
      ...post, 
      ...data,
      updatedAt: new Date()
    };
    this.groupPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteGroupPost(id: number): Promise<boolean> {
    return this.groupPosts.delete(id);
  }

  // Seed initial data for development
  private async seedData() {
    // Seed water resources
    const waterResourcesData: InsertWaterResource[] = [
      {
        name: 'Amu-Bukhara-1 Pumping Station',
        region: 'Bukhara region',
        country: 'Republic of Uzbekistan',
        status: 'Critical',
        qualityIndex: 62,
        flowRate: 145,
        isActive: true,
        latitude: 39.775,
        longitude: 64.421,
        description: 'A primary pumping station in the Bukhara region of Uzbekistan that serves water to local agriculture operations.',
        imageUrl: 'https://pixabay.com/get/g1ff0316103990c1c812c2f03f4f379ea2d6602fbe572acb80eb0863971c98b3a04b2589e9a4a163273a5971363343c567999bc8ce43ec83ecc85c76bbe9842fc_1280.jpg'
      },
      {
        name: 'Kuyumazar Pumping Station',
        region: 'Bukhara region',
        country: 'Republic of Uzbekistan',
        status: 'Needs Attention',
        qualityIndex: 74,
        flowRate: 112,
        isActive: true,
        latitude: 39.8,
        longitude: 64.45,
        description: 'Major pumping station serving the Kuyumazar area with water distribution to agricultural lands and local communities.',
        imageUrl: 'https://pixabay.com/get/g530132d3a9e2adcbf471f47796582f2966700eeb045765710acb676acc24e649da0c40359c23a772d4f0f5ce6bb422e19a8889839e9074caa0a7fb8b20ef1bc5_1280.jpg'
      },
      {
        name: 'Korovulbozor Pumping Station',
        region: 'Bukhara region',
        country: 'Republic of Uzbekistan',
        status: 'Stable',
        qualityIndex: 86,
        flowRate: 98,
        isActive: true,
        latitude: 39.5,
        longitude: 64.8,
        description: 'A stable water resource providing consistent water quality to the surrounding areas.',
        imageUrl: 'https://pixabay.com/get/g4fa2d45f26fff7348695891c87fc3605bcf6e3924747b8b7dd2da58b7e86991357bb8784795bf80d9385979c7c21dba14536f790a4b3cce77a1a9f45da31ef92_1280.jpg'
      },
      {
        name: 'Pumping Station No. 2',
        region: 'Jizzakh region',
        country: 'Republic of Uzbekistan',
        status: 'Stable',
        qualityIndex: 91,
        flowRate: 132,
        isActive: true,
        latitude: 40.1,
        longitude: 67.8,
        description: 'One of the most efficient pumping stations in the network with excellent water quality metrics.',
        imageUrl: 'https://pixabay.com/get/g4fa2d45f26fff7348695891c87fc3605bcf6e3924747b8b7dd2da58b7e86991357bb8784795bf80d9385979c7c21dba14536f790a4b3cce77a1a9f45da31ef92_1280.jpg'
      }
    ];

    waterResourcesData.forEach(resource => {
      this.createWaterResource(resource);
    });

    // Seed projects
    const projectsData: InsertProject[] = [
      {
        name: "Kuyumazar Auxiliary Pumping Station",
        location: "Bukhara region",
        region: "Bukhara",
        country: "Uzbekistan",
        description: "The Kuyumazar Auxiliary Pumping Station is part of the national water resource management system, scheduled for modernization under the Water Resources Development Concept for 2020–2030.",
        imageUrl: "https://pixabay.com/get/g530132d3a9e2adcbf471f47796582f2966700eeb045765710acb676acc24e649da0c40359c23a772d4f0f5ce6bb422e19a8889839e9074caa0a7fb8b20ef1bc5_1280.jpg",
        totalFunding: 11965400,
        availableForDAO: 3589620,
        fundingProgress: 64,
        irr: 22,
        endDate: new Date('2023-12-31')
      },
      {
        name: "Amu-Bukhara-1 Pumping Station",
        location: "Bukhara region",
        region: "Bukhara",
        country: "Uzbekistan",
        description: "The Amu-Bukhara-1 Pumping Station is part of the national water resource management system, scheduled for modernization under the Water Resources Development Concept for 2020–2030.",
        imageUrl: "https://pixabay.com/get/g1ff0316103990c1c812c2f03f4f379ea2d6602fbe572acb80eb0863971c98b3a04b2589e9a4a163273a5971363343c567999bc8ce43ec83ecc85c76bbe9842fc_1280.jpg",
        totalFunding: 9490100,
        availableForDAO: 2837030,
        fundingProgress: 82,
        irr: 20,
        endDate: new Date('2023-11-15')
      },
      {
        name: "Pumping Station No. 2",
        location: "Jizzakh region",
        region: "Jizzakh",
        country: "Uzbekistan",
        description: "Pumping Station No. 2 is part of the national water resource management system, scheduled for modernization under the Water Resources Development Concept for 2020–2030.",
        imageUrl: "https://pixabay.com/get/g4fa2d45f26fff7348695891c87fc3605bcf6e3924747b8b7dd2da58b7e86991357bb8784795bf80d9385979c7c21dba14536f790a4b3cce77a1a9f45da31ef92_1280.jpg",
        totalFunding: 7760600,
        availableForDAO: 2328180,
        fundingProgress: 45,
        irr: 17,
        endDate: new Date('2024-01-15')
      }
    ];

    projectsData.forEach(project => {
      this.createProject(project);
    });

    // Seed proposals
    const proposalsData: InsertProposal[] = [
      {
        title: 'VIP-023: Allocate Funds for Aral Sea Conservation',
        description: 'This proposal seeks to allocate 250,000 VOD tokens from the treasury to fund water conservation efforts in the Aral Sea region through a partnership with the United Nations Development Programme.',
        votesYes: 760,
        votesNo: 240,
        quorum: 63,
        requiredQuorum: 50,
        status: 'Active',
        endDate: new Date('2023-08-15'),
        createdBy: 1
      },
      {
        title: 'VIP-024: Implement Water Quality Monitoring in Bukhara',
        description: 'This proposal aims to establish a network of IoT sensors for real-time water quality monitoring in the Bukhara region. The proposed budget is 180,000 VOD tokens for hardware and implementation.',
        votesYes: 920,
        votesNo: 80,
        quorum: 45,
        requiredQuorum: 50,
        status: 'Active',
        endDate: new Date('2023-08-20'),
        createdBy: 1
      },
      {
        title: 'VIP-022: Educational Programs Funding',
        description: 'Allocated 100,000 VOD tokens for educational programs on water conservation.',
        votesYes: 870,
        votesNo: 130,
        quorum: 72,
        requiredQuorum: 50,
        status: 'Passed',
        endDate: new Date('2023-07-12'),
        createdBy: 1
      },
      {
        title: 'VIP-021: Modification of Governance Rules',
        description: 'Proposal to modify quorum requirements for certain types of votes.',
        votesYes: 420,
        votesNo: 580,
        quorum: 65,
        requiredQuorum: 50,
        status: 'Failed',
        endDate: new Date('2023-07-08'),
        createdBy: 1
      },
      {
        title: 'VIP-020: Partnership with UNICEF',
        description: 'Approved strategic partnership with UNICEF for clean water initiatives.',
        votesYes: 950,
        votesNo: 50,
        quorum: 68,
        requiredQuorum: 50,
        status: 'Passed',
        endDate: new Date('2023-07-02'),
        createdBy: 1
      }
    ];

    proposalsData.forEach(proposal => {
      this.createProposal(proposal);
    });

    // Seed events
    const eventsData: InsertEvent[] = [
      {
        title: 'Quarterly DAO Meeting',
        description: 'Review of Q2 projects and funding allocations',
        date: new Date('2023-07-24T12:00:00Z'),
        location: 'Virtual',
        isVirtual: true
      },
      {
        title: 'Proposal Workshop',
        description: 'Learn how to craft effective DAO proposals',
        date: new Date('2023-07-28T14:00:00Z'),
        location: 'Virtual',
        isVirtual: true
      },
      {
        title: 'Water Tech Summit',
        description: 'Innovation showcase for water technologies',
        date: new Date('2023-08-05T09:00:00Z'),
        location: 'Tashkent',
        isVirtual: false
      }
    ];

    eventsData.forEach(event => {
      this.createEvent(event);
    });

    // Seed groups data
    const groupsData = [
      {
        name: 'Глобальная DAO-группа',
        description: 'Официальная группа для всех участников VODeco DAO',
        type: 'official',
        category: 'global',
        imageUrl: null,
        creatorId: 1
      },
      {
        name: 'Европейский регион',
        description: 'Региональная группа для обсуждения европейских водных инициатив',
        type: 'official',
        category: 'regional',
        imageUrl: null,
        creatorId: 1
      },
      {
        name: 'Азиатский регион',
        description: 'Региональная группа для обсуждения азиатских водных инициатив',
        type: 'official',
        category: 'regional',
        imageUrl: null,
        creatorId: 1
      },
      {
        name: 'Научное сообщество',
        description: 'Группа для научных дискуссий о технологиях очистки воды',
        type: 'public',
        category: 'professional',
        imageUrl: null,
        creatorId: 2
      },
      {
        name: 'Образовательные курсы',
        description: 'Обучающие материалы по ESG-стандартам и водным ресурсам',
        type: 'public',
        category: 'education',
        imageUrl: null,
        creatorId: 3
      },
      {
        name: 'Инвестиционное сообщество',
        description: 'Закрытая группа для инвесторов с обсуждением проектов и ROI',
        type: 'private',
        category: 'investment',
        imageUrl: null,
        creatorId: 4
      }
    ];

    // Create groups and store their IDs
    const groupIds: number[] = [];
    for (const group of groupsData) {
      const createdGroup = await this.createGroup(group);
      groupIds.push(createdGroup.id);
    }

    // Add group members
    if (groupIds.length > 0) {
      // Add creator as owner
      await this.addGroupMember({ groupId: groupIds[0], userId: 1, role: 'owner' });
      await this.addGroupMember({ groupId: groupIds[1], userId: 1, role: 'owner' });
      await this.addGroupMember({ groupId: groupIds[2], userId: 1, role: 'owner' });
      await this.addGroupMember({ groupId: groupIds[3], userId: 2, role: 'owner' });
      await this.addGroupMember({ groupId: groupIds[4], userId: 3, role: 'owner' });
      await this.addGroupMember({ groupId: groupIds[5], userId: 4, role: 'owner' });

      // Add some members
      await this.addGroupMember({ groupId: groupIds[0], userId: 2, role: 'moderator' });
      await this.addGroupMember({ groupId: groupIds[0], userId: 3, role: 'member' });
      await this.addGroupMember({ groupId: groupIds[0], userId: 4, role: 'member' });
      await this.addGroupMember({ groupId: groupIds[1], userId: 2, role: 'member' });
      await this.addGroupMember({ groupId: groupIds[3], userId: 1, role: 'member' });
      await this.addGroupMember({ groupId: groupIds[4], userId: 1, role: 'member' });
      await this.addGroupMember({ groupId: groupIds[4], userId: 2, role: 'member' });
    }

    // Add sample posts
    if (groupIds.length > 0) {
      await this.createGroupPost({
        groupId: groupIds[0],
        authorId: 1,
        title: 'Добро пожаловать в VODeco DAO!',
        content: 'Это официальная группа для всех участников экосистемы VODeco. Здесь мы будем публиковать важные объявления и обсуждать глобальные инициативы.',
        type: 'announcement',
        isPinned: true
      });

      await this.createGroupPost({
        groupId: groupIds[0],
        authorId: 2,
        title: 'Новые функции в платформе',
        content: 'Мы рады представить вам новые функции нашей платформы, включая расширенную аналитику и улучшенную визуализацию данных.',
        type: 'post',
        isPinned: false
      });

      await this.createGroupPost({
        groupId: groupIds[3],
        authorId: 2,
        title: 'Исследование новых методов фильтрации',
        content: 'В этом посте мы рассмотрим последние научные достижения в области фильтрации и очистки воды с использованием нанотехнологий.',
        type: 'post',
        isPinned: true
      });

      await this.createGroupPost({
        groupId: groupIds[4],
        authorId: 3,
        title: 'Начало нового курса по ESG-стандартам',
        content: 'Приглашаем всех на новый образовательный курс по ESG-стандартам в области управления водными ресурсами. Курс начнется 15 апреля.',
        type: 'announcement',
        isPinned: true
      });
    }
  }
}

import { db } from "./db";
import { eq, sql, and, desc } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByWalletAddress(walletAddress: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.walletAddress, walletAddress));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.googleId, googleId));
    return user || undefined;
  }

  async getUserByTelegramId(telegramId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.telegramId, telegramId));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserGoogleId(userId: number, googleId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ googleId, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async upsertUser(userData: Partial<InsertUser> & { id: string }): Promise<User> {
    // Проверяем существование пользователя
    const existingUser = await this.getUser(userData.id);

    if (existingUser) {
      // Обновляем существующего пользователя
      const [updatedUser] = await db
        .update(users)
        .set({
          ...userData,
          updatedAt: new Date()
        })
        .where(eq(users.id, userData.id))
        .returning();
      return updatedUser;
    } else {
      // Создаем нового пользователя с необходимыми полями
      const newUser = {
        ...userData,
        username: userData.username || `user${userData.id}`,
        votingPower: userData.votingPower || 10
      } as InsertUser;

      return await this.createUser(newUser);
    }
  }

  async getWaterResource(id: number): Promise<WaterResource | undefined> {
    const [resource] = await db.select().from(waterResources).where(eq(waterResources.id, id));
    return resource || undefined;
  }

  async getAllWaterResources(): Promise<WaterResource[]> {
    return await db.select().from(waterResources);
  }

  async createWaterResource(resource: InsertWaterResource): Promise<WaterResource> {
    const [waterResource] = await db
      .insert(waterResources)
      .values(resource)
      .returning();
    return waterResource;
  }

  async updateWaterResource(id: number, data: Partial<WaterResource>): Promise<WaterResource | undefined> {
    const [updatedResource] = await db
      .update(waterResources)
      .set(data)
      .where(eq(waterResources.id, id))
      .returning();
    return updatedResource || undefined;
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values(project)
      .returning();
    return newProject;
  }

  async updateProjectFunding(id: number, additionalFunding: number): Promise<Project | undefined> {
    const [project] = await db
      .update(projects)
      .set({
        fundingProgress: sql`${projects.fundingProgress} + ${additionalFunding}`
      })
      .where(eq(projects.id, id))
      .returning();
    return project || undefined;
  }

  async getProposal(id: number): Promise<Proposal | undefined> {
    const [proposal] = await db.select().from(proposals).where(eq(proposals.id, id));
    return proposal || undefined;
  }

  async getActiveProposals(): Promise<Proposal[]> {
    return await db.select().from(proposals).where(eq(proposals.status, "Active"));
  }

  async getRecentDecisions(): Promise<Proposal[]> {
    return await db
      .select()
      .from(proposals)
      .where(sql`${proposals.status} IN ('Passed', 'Failed')`)
      .orderBy(sql`${proposals.createdAt} DESC`)
      .limit(5);
  }

  async createProposal(proposal: InsertProposal): Promise<Proposal> {
    const [newProposal] = await db
      .insert(proposals)
      .values(proposal)
      .returning();
    return newProposal;
  }

  async voteOnProposal(vote: InsertVote): Promise<Vote> {
    // First insert the vote
    const [newVote] = await db
      .insert(votes)
      .values(vote)
      .returning();

    // Then update the proposal's votes
    if (vote.voteType === 'yes') {
      await db
        .update(proposals)
        .set({
          votesYes: sql`${proposals.votesYes} + ${vote.votingPower}`,
          quorum: sql`${proposals.quorum} + ${vote.votingPower}`
        })
        .where(eq(proposals.id, vote.proposalId));
    } else {
      await db
        .update(proposals)
        .set({
          votesNo: sql`${proposals.votesNo} + ${vote.votingPower}`,
          quorum: sql`${proposals.quorum} + ${vote.votingPower}`
        })
        .where(eq(proposals.id, vote.proposalId));
    }

    return newVote;
  }

  async updateProposalStatus(id: number, status: string): Promise<Proposal | undefined> {
    const [proposal] = await db
      .update(proposals)
      .set({ status })
      .where(eq(proposals.id, id))
      .returning();
    return proposal || undefined;
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }

  async getUpcomingEvents(): Promise<Event[]> {
    return await db
      .select()
      .from(events)
      .where(sql`${events.date} > NOW()`)
      .orderBy(sql`${events.date} ASC`);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db
      .insert(events)
      .values(event)
      .returning();
    return newEvent;
  }

  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const [newInvestment] = await db
      .insert(investments)
      .values(investment)
      .returning();

    // Update project funding progress
    await db
      .update(projects)
      .set({
        fundingProgress: sql`${projects.fundingProgress} + ${investment.amount}`
      })
      .where(eq(projects.id, investment.projectId));

    return newInvestment;
  }

  async getInvestmentsByUser(userId: number): Promise<Investment[]> {
    return await db.select().from(investments).where(eq(investments.userId, userId));
  }

  async getInvestmentsByProject(projectId: number): Promise<Investment[]> {
    return await db.select().from(investments).where(eq(investments.projectId, projectId));
  }

  async getGroup(id: number): Promise<Group | undefined> {
    const [group] = await db.select().from(groups).where(eq(groups.id, id));
    return group || undefined;
  }

  async getAllGroups(): Promise<Group[]> {
    return await db.select().from(groups);
  }

  async getGroupsByCategory(category: string): Promise<Group[]> {
    return await db.select().from(groups).where(eq(groups.category, category));
  }

  async getGroupsByType(type: string): Promise<Group[]> {
    return await db.select().from(groups).where(eq(groups.type, type));
  }

  async createGroup(group: InsertGroup): Promise<Group> {
    const [newGroup] = await db
      .insert(groups)
      .values(group)
      .returning();
    return newGroup;
  }

  async updateGroup(id: number, data: Partial<Group>): Promise<Group | undefined> {
    const [updatedGroup] = await db
      .update(groups)
      .set(data)
      .where(eq(groups.id, id))
      .returning();
    return updatedGroup || undefined;
  }

  async getGroupMembers(groupId: number): Promise<GroupMember[]> {
    return await db.select().from(groupMembers).where(eq(groupMembers.groupId, groupId));
  }

  async getUserGroups(userId: number): Promise<Group[]> {
    const userMemberships = await db
      .select()
      .from(groupMembers)
      .where(eq(groupMembers.userId, userId));

    const groupIds = userMemberships.map(m => m.groupId);

    if (groupIds.length === 0) return [];

    return await db
      .select()
      .from(groups)
      .where(sql`${groups.id} IN (${groupIds.join(',')})`);
  }

  async addGroupMember(member: InsertGroupMember): Promise<GroupMember> {
    const [newMember] = await db
      .insert(groupMembers)
      .values(member)
      .returning();

    // Increment member count
    await db
      .update(groups)
      .set({
        memberCount: sql`${groups.memberCount} + 1`
      })
      .where(eq(groups.id, member.groupId));

    return newMember;
  }

  async updateGroupMemberRole(groupId: number, userId: number, role: string): Promise<GroupMember | undefined> {
    const [updatedMember] = await db
      .update(groupMembers)
      .set({ role })
      .where(sql`${groupMembers.groupId} = ${groupId} AND ${groupMembers.userId} = ${userId}`)
      .returning();
    return updatedMember || undefined;
  }

  async removeGroupMember(groupId: number, userId: number): Promise<boolean> {
    const result = await db
      .delete(groupMembers)
      .where(sql`${groupMembers.groupId} = ${groupId} AND ${groupMembers.userId} = ${userId}`);

    // Decrement member count
    await db
      .update(groups)
      .set({
        memberCount: sql`${groups.memberCount} - 1`
      })
      .where(eq(groups.id, groupId));

    return true;
  }

  async getGroupPosts(groupId: number): Promise<GroupPost[]> {
    return await db
      .select()
      .from(groupPosts)
      .where(eq(groupPosts.groupId, groupId))
      .orderBy(sql`${groupPosts.createdAt} DESC`);
  }

  async getGroupPost(id: number): Promise<GroupPost | undefined> {
    const [post] = await db.select().from(groupPosts).where(eq(groupPosts.id, id));
    return post || undefined;
  }

  async createGroupPost(post: InsertGroupPost): Promise<GroupPost> {
    const [newPost] = await db
      .insert(groupPosts)
      .values(post)
      .returning();
    return newPost;
  }

  async updateGroupPost(id: number, data: Partial<GroupPost>): Promise<GroupPost | undefined> {
    const [updatedPost] = await db
      .update(groupPosts)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(groupPosts.id, id))
      .returning();
    return updatedPost || undefined;
  }

  async deleteGroupPost(id: number): Promise<boolean> {
    await db.delete(groupPosts).where(eq(groupPosts.id, id));
    return true;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(sql`LOWER(${users.username}) = LOWER(${username})`);
    return user || undefined;
  }

  async updateUser(userId: number, updateData: Partial<User>): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();

    return updatedUser;
  }

  // User Tokens management
  async getUserTokens(userId: number): Promise<UserToken[]> {
    return await db.select().from(userTokens).where(eq(userTokens.userId, userId));
  }

  async updateUserToken(userId: number, tokenSymbol: string, balance: number, staked?: number, earned?: number) {
    const existing = await db.select().from(userTokens)
      .where(and(eq(userTokens.userId, userId), eq(userTokens.tokenSymbol, tokenSymbol)))
      .limit(1);

    if (existing[0]) {
      return await db.update(userTokens)
        .set({ 
          balance, 
          staked: staked ?? existing[0].staked,
          earned: earned ?? existing[0].earned,
          lastUpdated: new Date() 
        })
        .where(and(eq(userTokens.userId, userId), eq(userTokens.tokenSymbol, tokenSymbol)))
        .returning();
    } else {
      return await db.insert(userTokens)
        .values({ userId, tokenSymbol, balance, staked: staked || 0, earned: earned || 0 })
        .returning();
    }
  }

  // User Activities
  async createUserActivity(activity: InsertUserActivity): Promise<UserActivity> {
    const [result] = await db.insert(userActivities).values(activity).returning();
    return result;
  }

  async getUserActivities(userId: number, limit: number = 50): Promise<UserActivity[]> {
    return await db.select().from(userActivities)
      .where(eq(userActivities.userId, userId))
      .orderBy(desc(userActivities.timestamp))
      .limit(limit);
  }

  // Temporary Sessions for guests
  async createTempSession(sessionId: string): Promise<TempSession> {
    const [result] = await db.insert(tempSessions)
      .values({ sessionId })
      .returning();
    return result;
  }

  async getTempSession(sessionId: string): Promise<TempSession | null> {
    const [result] = await db.select().from(tempSessions)
      .where(and(eq(tempSessions.sessionId, sessionId), eq(tempSessions.isActive, true)))
      .limit(1);
    return result || null;
  }

  async updateTempSession(sessionId: string, tokensCollected: number, activitiesCompleted?: number) {
    const [updatedSession] = await db.update(tempSessions)
      .set({ 
        tokensCollected,
        activitiesCompleted: activitiesCompleted ?? undefined,
        lastActiveAt: new Date()
      })
      .where(eq(tempSessions.sessionId, sessionId))
      .returning();
    return updatedSession || undefined;
  }

  async convertTempSessionToUser(sessionId: string, userId: number) {
    const session = await this.getTempSession(sessionId);
    if (session) {
      // Переносим токены из временной сессии пользователю
      await this.updateUserToken(userId, 'VOD', session.tokensCollected);

      // Создаем запись об активности конвертации
      const createUserActivityResult = await this.createUserActivity({
        userId,
        sessionId,
        activityType: 'session_conversion',
        tokensEarned: session.tokensCollected,
        details: JSON.stringify({ convertedTokens: session.tokensCollected })
      });

      if(!createUserActivityResult) {
        console.error("Failed to create user activity for session conversion");
        return null;
      }

      // Помечаем сессию как конвертированную
      const [updatedTempSession] = await db.update(tempSessions)
        .set({ 
          convertedToUserId: userId,
          isActive: false
        })
        .where(eq(tempSessions.sessionId, sessionId))
        .returning();

      return updatedTempSession || null;
    }
    return null;
  }

  // User Staking
  async createUserStaking(staking: InsertUserStaking): Promise<UserStaking> {
    const [result] = await db.insert(userStaking).values(staking).returning();
    return result;
  }

  async getUserStakings(userId: number): Promise<UserStaking[]> {
    return await db.select().from(userStaking)
      .where(eq(userStaking.userId, userId))
      .orderBy(desc(userStaking.startDate));
  }

  async updateStakingRewards(stakingId: number, rewards: number) {
    const [updatedStaking] = await db.update(userStaking)
      .set({ rewardsEarned: rewards })
      .where(eq(userStaking.id, stakingId))
      .returning();
    return updatedStaking || undefined;
  }
}

export const storage = new DatabaseStorage();