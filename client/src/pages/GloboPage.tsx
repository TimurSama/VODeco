import React, { useState, useEffect } from 'react';
import GlobeVisualization from '@/components/globo/GlobeVisualization';
import ResourceList from '@/components/globo/ResourceList';
import { WaterResource, ResourceStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Mock water resources data
const mockResources: WaterResource[] = [
  {
    id: 1,
    name: 'Amu-Bukhara-1 Pumping Station',
    region: 'Bukhara region',
    country: 'Republic of Uzbekistan',
    status: ResourceStatus.CRITICAL,
    qualityIndex: 62,
    flowRate: 145,
    isActive: true,
    coordinates: [39.775, 64.421], // Bukhara coordinates
    description: 'A primary pumping station in the Bukhara region of Uzbekistan that serves water to local agriculture operations.',
    imageUrl: 'https://pixabay.com/get/g1ff0316103990c1c812c2f03f4f379ea2d6602fbe572acb80eb0863971c98b3a04b2589e9a4a163273a5971363343c567999bc8ce43ec83ecc85c76bbe9842fc_1280.jpg'
  },
  {
    id: 2,
    name: 'Kuyumazar Pumping Station',
    region: 'Bukhara region',
    country: 'Republic of Uzbekistan',
    status: ResourceStatus.NEEDS_ATTENTION,
    qualityIndex: 74,
    flowRate: 112,
    isActive: true,
    coordinates: [39.8, 64.45], // Near Bukhara
    description: 'Major pumping station serving the Kuyumazar area with water distribution to agricultural lands and local communities.',
    imageUrl: 'https://pixabay.com/get/g530132d3a9e2adcbf471f47796582f2966700eeb045765710acb676acc24e649da0c40359c23a772d4f0f5ce6bb422e19a8889839e9074caa0a7fb8b20ef1bc5_1280.jpg'
  },
  {
    id: 3,
    name: 'Korovulbozor Pumping Station',
    region: 'Bukhara region',
    country: 'Republic of Uzbekistan',
    status: ResourceStatus.STABLE,
    qualityIndex: 86,
    flowRate: 98,
    isActive: true,
    coordinates: [39.5, 64.8], // Near Korovulbozor
    description: 'A stable water resource providing consistent water quality to the surrounding areas.',
    imageUrl: 'https://pixabay.com/get/g4fa2d45f26fff7348695891c87fc3605bcf6e3924747b8b7dd2da58b7e86991357bb8784795bf80d9385979c7c21dba14536f790a4b3cce77a1a9f45da31ef92_1280.jpg'
  },
  {
    id: 4,
    name: 'Pumping Station No. 2',
    region: 'Jizzakh region',
    country: 'Republic of Uzbekistan',
    status: ResourceStatus.STABLE,
    qualityIndex: 91,
    flowRate: 132,
    isActive: true,
    coordinates: [40.1, 67.8], // Jizzakh coordinates
    description: 'One of the most efficient pumping stations in the network with excellent water quality metrics.',
    imageUrl: 'https://pixabay.com/get/g4fa2d45f26fff7348695891c87fc3605bcf6e3924747b8b7dd2da58b7e86991357bb8784795bf80d9385979c7c21dba14536f790a4b3cce77a1a9f45da31ef92_1280.jpg'
  }
];

const GloboPage: React.FC = () => {
  const [resources, setResources] = useState<WaterResource[]>([]);
  const [selectedResource, setSelectedResource] = useState<WaterResource | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    // In a real implementation, this would fetch from API
    setResources(mockResources);
  }, []);

  const handleResourceSelect = (resource: WaterResource) => {
    setSelectedResource(resource);
    toast({
      title: resource.name,
      description: `Selected water resource in ${resource.region}`
    });
  };

  return (
    <section id="globo" className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="font-space font-bold text-2xl mb-6 flex items-center">
          <span className="material-icons mr-2 text-primary">public</span>
          Global Water Resources
        </h2>
        
        <div className="glassmorphism rounded-xl p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 3D Globe Visualization */}
            <GlobeVisualization 
              resources={resources}
              onResourceSelect={handleResourceSelect} 
            />
            
            {/* Resource Information Panel */}
            <ResourceList 
              resources={resources} 
              onResourceSelect={handleResourceSelect}
              selectedResource={selectedResource} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GloboPage;
