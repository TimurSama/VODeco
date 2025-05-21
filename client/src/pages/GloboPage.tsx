import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GlobeVisualization from '@/components/globo/GlobeVisualization';
import SimpleGlobe from '@/components/globo/SimpleGlobe';
import ResourceList from '@/components/globo/ResourceList';
import { WaterResource, ResourceStatus, ResourceCategory } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';

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
      console.error("Error loading water resources:", error);
      toast({
        title: 'Error loading resources',
        description: 'Unable to load water resources data.',
        variant: 'destructive'
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (resources && resources.length > 0) {
      console.log("Resources loaded:", resources.length);
      console.log("Sample resource:", resources[0]);
      
      // Проверяем распределение категорий
      const investmentCount = resources.filter(r => r.category === ResourceCategory.INVESTMENT).length;
      const pathCount = resources.filter(r => r.category === ResourceCategory.PATH).length;
      console.log(`Loaded ${investmentCount} investment resources and ${pathCount} path resources`);
    }
  }, [resources]);

  const handleResourceSelect = (resource: WaterResource) => {
    console.log("Resource selected:", resource);
    setSelectedResource(resource);
    toast({
      title: resource.name,
      description: `Selected ${resource.category === ResourceCategory.INVESTMENT ? 'investment' : 'path'} resource in ${resource.region}`
    });
  };

  return (
    <section id="globo" className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl mb-6 flex items-center text-primary">
          Global Water Resources
        </h2>
        
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-xl mb-4">Loading resources data...</p>
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-xl mb-4 text-red-500">Error loading resources</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : (
          <div className="glassmorphism rounded-xl p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* 3D Globe Visualization */}
              <div className="lg:w-2/3">
                <SimpleGlobe 
                  resources={resources}
                  onResourceSelect={handleResourceSelect} 
                />
              </div>
              
              {/* Resource Information Panel */}
              <div className="lg:w-1/3">
                <ResourceList 
                  resources={resources} 
                  onResourceSelect={handleResourceSelect}
                  selectedResource={selectedResource} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GloboPage;
