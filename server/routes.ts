import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertUserSchema, 
  insertWaterResourceSchema, 
  insertProjectSchema, 
  insertProposalSchema, 
  insertEventSchema, 
  insertVoteSchema, 
  insertInvestmentSchema,
  insertGroupSchema,
  insertGroupMemberSchema,
  insertGroupPostSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create RESTful API routes
  // All routes prefixed with /api
  
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });
  
  // === Users API ===
  
  // Get user by ID
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.json(user);
    } catch (error) {
      console.error("Error getting user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create a new user
  app.post("/api/users", async (req, res) => {
    try {
      const userInput = insertUserSchema.safeParse(req.body);
      if (!userInput.success) {
        return res.status(400).json({ message: "Invalid user data", errors: userInput.error.format() });
      }
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userInput.data.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already taken" });
      }
      
      // Create the user
      const newUser = await storage.createUser(userInput.data);
      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get user by wallet address
  app.get("/api/users/wallet/:address", async (req, res) => {
    try {
      const { address } = req.params;
      
      if (!address) {
        return res.status(400).json({ message: "Wallet address is required" });
      }
      
      const user = await storage.getUserByWalletAddress(address);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.json(user);
    } catch (error) {
      console.error("Error getting user by wallet:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // === Water Resources API ===
  
  // Get all water resources
  app.get("/api/water-resources", async (_req, res) => {
    try {
      const resources = await storage.getAllWaterResources();
      return res.json(resources);
    } catch (error) {
      console.error("Error getting water resources:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get water resource by ID
  app.get("/api/water-resources/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid resource ID" });
      }
      
      const resource = await storage.getWaterResource(id);
      if (!resource) {
        return res.status(404).json({ message: "Water resource not found" });
      }
      
      return res.json(resource);
    } catch (error) {
      console.error("Error getting water resource:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create a new water resource
  app.post("/api/water-resources", async (req, res) => {
    try {
      const resourceInput = insertWaterResourceSchema.safeParse(req.body);
      if (!resourceInput.success) {
        return res.status(400).json({ message: "Invalid resource data", errors: resourceInput.error.format() });
      }
      
      const newResource = await storage.createWaterResource(resourceInput.data);
      return res.status(201).json(newResource);
    } catch (error) {
      console.error("Error creating water resource:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Update water resource
  app.patch("/api/water-resources/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid resource ID" });
      }
      
      const resource = await storage.getWaterResource(id);
      if (!resource) {
        return res.status(404).json({ message: "Water resource not found" });
      }
      
      const updatedResource = await storage.updateWaterResource(id, req.body);
      return res.json(updatedResource);
    } catch (error) {
      console.error("Error updating water resource:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // === Projects API ===
  
  // Get all projects
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getAllProjects();
      return res.json(projects);
    } catch (error) {
      console.error("Error getting projects:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get project by ID
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      return res.json(project);
    } catch (error) {
      console.error("Error getting project:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create a new project
  app.post("/api/projects", async (req, res) => {
    try {
      const projectInput = insertProjectSchema.safeParse(req.body);
      if (!projectInput.success) {
        return res.status(400).json({ message: "Invalid project data", errors: projectInput.error.format() });
      }
      
      const newProject = await storage.createProject(projectInput.data);
      return res.status(201).json(newProject);
    } catch (error) {
      console.error("Error creating project:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // === Proposals API ===
  
  // Get active proposals
  app.get("/api/proposals/active", async (_req, res) => {
    try {
      const proposals = await storage.getActiveProposals();
      return res.json(proposals);
    } catch (error) {
      console.error("Error getting active proposals:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get recent decisions
  app.get("/api/proposals/recent-decisions", async (_req, res) => {
    try {
      const decisions = await storage.getRecentDecisions();
      return res.json(decisions);
    } catch (error) {
      console.error("Error getting recent decisions:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get proposal by ID
  app.get("/api/proposals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid proposal ID" });
      }
      
      const proposal = await storage.getProposal(id);
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      
      return res.json(proposal);
    } catch (error) {
      console.error("Error getting proposal:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create a new proposal
  app.post("/api/proposals", async (req, res) => {
    try {
      const proposalInput = insertProposalSchema.safeParse(req.body);
      if (!proposalInput.success) {
        return res.status(400).json({ message: "Invalid proposal data", errors: proposalInput.error.format() });
      }
      
      const newProposal = await storage.createProposal(proposalInput.data);
      return res.status(201).json(newProposal);
    } catch (error) {
      console.error("Error creating proposal:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Vote on a proposal
  app.post("/api/proposals/:id/vote", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid proposal ID" });
      }
      
      const proposal = await storage.getProposal(id);
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      
      // Validate if proposal is still active
      if (proposal.status !== 'Active') {
        return res.status(400).json({ message: "Cannot vote on inactive proposal" });
      }
      
      // Validate if voting period has ended
      if (new Date() > proposal.endDate) {
        return res.status(400).json({ message: "Voting period has ended" });
      }
      
      // Validate the vote input
      const voteSchema = z.object({
        userId: z.number(),
        voteType: z.enum(['yes', 'no']),
        votingPower: z.number().positive()
      });
      
      const voteInput = voteSchema.safeParse(req.body);
      if (!voteInput.success) {
        return res.status(400).json({ message: "Invalid vote data", errors: voteInput.error.format() });
      }
      
      // Create the vote with the proposal ID
      const voteData = {
        ...voteInput.data,
        proposalId: id
      };
      
      const vote = await storage.voteOnProposal(voteData);
      return res.status(201).json(vote);
    } catch (error) {
      console.error("Error voting on proposal:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // === Events API ===
  
  // Get upcoming events
  app.get("/api/events/upcoming", async (_req, res) => {
    try {
      const events = await storage.getUpcomingEvents();
      return res.json(events);
    } catch (error) {
      console.error("Error getting upcoming events:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get event by ID
  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      return res.json(event);
    } catch (error) {
      console.error("Error getting event:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create a new event
  app.post("/api/events", async (req, res) => {
    try {
      const eventInput = insertEventSchema.safeParse(req.body);
      if (!eventInput.success) {
        return res.status(400).json({ message: "Invalid event data", errors: eventInput.error.format() });
      }
      
      const newEvent = await storage.createEvent(eventInput.data);
      return res.status(201).json(newEvent);
    } catch (error) {
      console.error("Error creating event:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // === Investments API ===
  
  // Create a new investment
  app.post("/api/investments", async (req, res) => {
    try {
      const investmentInput = insertInvestmentSchema.safeParse(req.body);
      if (!investmentInput.success) {
        return res.status(400).json({ message: "Invalid investment data", errors: investmentInput.error.format() });
      }
      
      // Validate if project exists
      const project = await storage.getProject(investmentInput.data.projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      const newInvestment = await storage.createInvestment(investmentInput.data);
      return res.status(201).json(newInvestment);
    } catch (error) {
      console.error("Error creating investment:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get investments by user
  app.get("/api/investments/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const investments = await storage.getInvestmentsByUser(userId);
      return res.json(investments);
    } catch (error) {
      console.error("Error getting investments by user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get investments by project
  app.get("/api/investments/project/:projectId", async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const investments = await storage.getInvestmentsByProject(projectId);
      return res.json(investments);
    } catch (error) {
      console.error("Error getting investments by project:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // === Groups API ===

  // Get all groups
  app.get("/api/groups", async (req, res) => {
    try {
      // Фильтры
      const category = req.query.category as string;
      const type = req.query.type as string;
      
      if (category) {
        const groups = await storage.getGroupsByCategory(category);
        return res.json(groups);
      } else if (type) {
        const groups = await storage.getGroupsByType(type);
        return res.json(groups);
      } else {
        const groups = await storage.getAllGroups();
        return res.json(groups);
      }
    } catch (error) {
      console.error("Error getting groups:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get a specific group by ID
  app.get("/api/groups/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid group ID" });
      }
      
      const group = await storage.getGroup(id);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      
      return res.json(group);
    } catch (error) {
      console.error("Error getting group:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create a new group
  app.post("/api/groups", async (req, res) => {
    try {
      const groupData = insertGroupSchema.safeParse(req.body);
      if (!groupData.success) {
        return res.status(400).json({ 
          message: "Invalid group data", 
          errors: groupData.error.format() 
        });
      }
      
      const newGroup = await storage.createGroup(groupData.data);
      
      // Добавим создателя как владельца группы
      if (newGroup.creatorId) {
        await storage.addGroupMember({
          groupId: newGroup.id,
          userId: newGroup.creatorId,
          role: 'owner'
        });
      }
      
      return res.status(201).json(newGroup);
    } catch (error) {
      console.error("Error creating group:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update a group
  app.patch("/api/groups/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid group ID" });
      }
      
      const group = await storage.getGroup(id);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      
      const updatedGroup = await storage.updateGroup(id, req.body);
      return res.json(updatedGroup);
    } catch (error) {
      console.error("Error updating group:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get members of a group
  app.get("/api/groups/:id/members", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid group ID" });
      }
      
      const group = await storage.getGroup(id);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      
      const members = await storage.getGroupMembers(id);
      return res.json(members);
    } catch (error) {
      console.error("Error getting group members:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Add member to a group
  app.post("/api/groups/:id/members", async (req, res) => {
    try {
      const groupId = parseInt(req.params.id);
      if (isNaN(groupId)) {
        return res.status(400).json({ message: "Invalid group ID" });
      }
      
      const group = await storage.getGroup(groupId);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      
      const memberData = insertGroupMemberSchema.safeParse({
        ...req.body,
        groupId
      });
      
      if (!memberData.success) {
        return res.status(400).json({ 
          message: "Invalid member data", 
          errors: memberData.error.format() 
        });
      }
      
      const newMember = await storage.addGroupMember(memberData.data);
      return res.status(201).json(newMember);
    } catch (error) {
      console.error("Error adding group member:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update a member's role
  app.patch("/api/groups/:groupId/members/:userId", async (req, res) => {
    try {
      const groupId = parseInt(req.params.groupId);
      const userId = parseInt(req.params.userId);
      
      if (isNaN(groupId) || isNaN(userId)) {
        return res.status(400).json({ message: "Invalid IDs" });
      }
      
      const roleSchema = z.object({
        role: z.enum(['owner', 'moderator', 'member'])
      });
      
      const roleData = roleSchema.safeParse(req.body);
      if (!roleData.success) {
        return res.status(400).json({ 
          message: "Invalid role data", 
          errors: roleData.error.format() 
        });
      }
      
      const updatedMember = await storage.updateGroupMemberRole(
        groupId, 
        userId, 
        roleData.data.role
      );
      
      if (!updatedMember) {
        return res.status(404).json({ message: "Member not found in this group" });
      }
      
      return res.json(updatedMember);
    } catch (error) {
      console.error("Error updating member role:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Remove a member from a group
  app.delete("/api/groups/:groupId/members/:userId", async (req, res) => {
    try {
      const groupId = parseInt(req.params.groupId);
      const userId = parseInt(req.params.userId);
      
      if (isNaN(groupId) || isNaN(userId)) {
        return res.status(400).json({ message: "Invalid IDs" });
      }
      
      const removed = await storage.removeGroupMember(groupId, userId);
      if (!removed) {
        return res.status(404).json({ message: "Member not found in this group" });
      }
      
      return res.json({ success: true });
    } catch (error) {
      console.error("Error removing group member:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get posts for a group
  app.get("/api/groups/:id/posts", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid group ID" });
      }
      
      const group = await storage.getGroup(id);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      
      const posts = await storage.getGroupPosts(id);
      return res.json(posts);
    } catch (error) {
      console.error("Error getting group posts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create a post in a group
  app.post("/api/groups/:id/posts", async (req, res) => {
    try {
      const groupId = parseInt(req.params.id);
      if (isNaN(groupId)) {
        return res.status(400).json({ message: "Invalid group ID" });
      }
      
      const group = await storage.getGroup(groupId);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      
      const postData = insertGroupPostSchema.safeParse({
        ...req.body,
        groupId
      });
      
      if (!postData.success) {
        return res.status(400).json({ 
          message: "Invalid post data", 
          errors: postData.error.format() 
        });
      }
      
      const newPost = await storage.createGroupPost(postData.data);
      return res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating group post:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update a post
  app.patch("/api/groups/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      
      const post = await storage.getGroupPost(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      const updatedPost = await storage.updateGroupPost(id, req.body);
      return res.json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Delete a post
  app.delete("/api/groups/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      
      const post = await storage.getGroupPost(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      const deleted = await storage.deleteGroupPost(id);
      return res.json({ success: deleted });
    } catch (error) {
      console.error("Error deleting post:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get groups for a user
  app.get("/api/users/:id/groups", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const groups = await storage.getUserGroups(id);
      return res.json(groups);
    } catch (error) {
      console.error("Error getting user groups:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
