import {
  users, type User, type InsertUser,
  waterResources, type WaterResource, type InsertWaterResource,
  projects, type Project, type InsertProject,
  proposals, type Proposal, type InsertProposal,
  events, type Event, type InsertEvent,
  votes, type Vote, type InsertVote,
  investments, type Investment, type InsertInvestment
} from "@shared/schema";

// Define the storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByWalletAddress(walletAddress: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waterResources: Map<number, WaterResource>;
  private projects: Map<number, Project>;
  private proposals: Map<number, Proposal>;
  private events: Map<number, Event>;
  private votes: Map<number, Vote>;
  private investments: Map<number, Investment>;
  
  private currentUserId: number;
  private currentResourceId: number;
  private currentProjectId: number;
  private currentProposalId: number;
  private currentEventId: number;
  private currentVoteId: number;
  private currentInvestmentId: number;

  constructor() {
    this.users = new Map();
    this.waterResources = new Map();
    this.projects = new Map();
    this.proposals = new Map();
    this.events = new Map();
    this.votes = new Map();
    this.investments = new Map();
    
    this.currentUserId = 1;
    this.currentResourceId = 1;
    this.currentProjectId = 1;
    this.currentProposalId = 1;
    this.currentEventId = 1;
    this.currentVoteId = 1;
    this.currentInvestmentId = 1;
    
    // Seed the database with some initial data
    this.seedData();
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
  
  // Seed initial data for development
  private seedData() {
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
  }
}

export const storage = new MemStorage();
