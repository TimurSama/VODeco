import React, { useState, useEffect } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import { Project } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { useWallet } from '@/context/WalletContext';

// Mock project data parsed from the objects for invest.txt
const mockProjects: Project[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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

type FilterType = 'All' | 'Highest ROI' | 'Newest';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<FilterType>('Highest ROI');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { connected } = useWallet();

  useEffect(() => {
    let filteredProjects = [...mockProjects];
    
    if (filter === 'Highest ROI') {
      filteredProjects.sort((a, b) => b.irr - a.irr);
    } else if (filter === 'Newest') {
      filteredProjects.sort((a, b) => b.endDate.getTime() - a.endDate.getTime());
    }
    
    setProjects(filteredProjects);
  }, [filter]);

  const handleInvest = (project: Project) => {
    if (!connected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to invest in this project.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleConfirmInvestment = () => {
    if (selectedProject) {
      toast({
        title: "Investment Initiated",
        description: `You've successfully initiated an investment in ${selectedProject.name}.`
      });
      setIsDialogOpen(false);
    }
  };

  return (
    <section id="projects" className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-space font-bold text-2xl flex items-center">
            <span className="material-icons mr-2 text-primary">business_center</span>
            Investment Projects
          </h2>
          <div className="flex items-center space-x-2">
            {(['All', 'Highest ROI', 'Newest'] as FilterType[]).map(type => (
              <button 
                key={type}
                className={`text-white/70 hover:text-primary transition-colors px-3 py-1 text-sm ${
                  filter === type ? 'rounded-md bg-background/50' : ''
                }`}
                onClick={() => setFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onInvest={handleInvest} 
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="outline" className="bg-background/50 hover:bg-background text-white font-space font-medium px-6 py-3 rounded-lg transition-colors">
            View All Projects
          </Button>
        </div>
        
        {/* Investment Confirmation Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="glassmorphism border-primary/30">
            <DialogHeader>
              <DialogTitle className="text-white font-space">
                Confirm Investment
              </DialogTitle>
              <DialogDescription>
                You are about to invest in {selectedProject?.name}.
              </DialogDescription>
            </DialogHeader>
            
            {selectedProject && (
              <div className="py-4">
                <div className="mb-4">
                  <p className="text-sm text-white/70 mb-1">Project details:</p>
                  <p className="text-sm text-white mb-2">{selectedProject.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-white/50">Location:</p>
                      <p className="text-white">{selectedProject.location}, {selectedProject.country}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Expected IRR:</p>
                      <p className="text-accent font-medium">{selectedProject.irr}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm text-white/70 mb-2">
                    By investing in this project, you'll receive VOD tokens proportional to your investment and future returns based on the project's performance.
                  </p>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmInvestment} className="bg-primary text-background">
                Invest Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectsPage;
