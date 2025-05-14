import React, { useState, useEffect } from 'react';
import GlobeVisualization from '@/components/globo/GlobeVisualization';
import ResourceList from '@/components/globo/ResourceList';
import { WaterResource, ResourceStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';

const GloboPage: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<WaterResource | undefined>();
  const { toast } = useToast();
  
  // Загрузка данных с помощью React Query
  const { data: resources = [], isLoading, error } = useQuery({
    queryKey: ['/api/water-resources'],
    queryFn: getQueryFn<WaterResource[]>({ on401: 'throw' }),
  });

  // Показываем ошибку, если не удалось загрузить данные
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error loading resources',
        description: 'Unable to load water resources data.',
        variant: 'destructive'
      });
    }
  }, [error, toast]);

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
