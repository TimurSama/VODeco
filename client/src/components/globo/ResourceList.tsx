import React, { useState } from 'react';
import { WaterResource, ResourceStatus } from '@/types';

interface ResourceListProps {
  resources: WaterResource[];
  onResourceSelect: (resource: WaterResource) => void;
  selectedResource?: WaterResource;
}

type FilterType = 'All' | 'Critical' | 'Needs Attention' | 'Stable';

const ResourceList: React.FC<ResourceListProps> = ({ 
  resources, 
  onResourceSelect,
  selectedResource 
}) => {
  const [filter, setFilter] = useState<FilterType>('All');

  // Filter resources based on the selected filter
  const filteredResources = filter === 'All' 
    ? resources 
    : resources.filter(resource => {
        if (filter === 'Critical') return resource.status === ResourceStatus.CRITICAL;
        if (filter === 'Needs Attention') return resource.status === ResourceStatus.NEEDS_ATTENTION;
        if (filter === 'Stable') return resource.status === ResourceStatus.STABLE;
        return true;
      });

  const getBorderColorClass = (status: ResourceStatus): string => {
    switch (status) {
      case ResourceStatus.CRITICAL:
        return 'border-accent';
      case ResourceStatus.NEEDS_ATTENTION:
        return 'border-yellow-400';
      case ResourceStatus.STABLE:
        return 'border-primary';
      default:
        return 'border-primary';
    }
  };

  const getStatusBgClass = (status: ResourceStatus): string => {
    switch (status) {
      case ResourceStatus.CRITICAL:
        return 'bg-accent/20 text-accent';
      case ResourceStatus.NEEDS_ATTENTION:
        return 'bg-yellow-400/20 text-yellow-400';
      case ResourceStatus.STABLE:
        return 'bg-primary/20 text-primary';
      default:
        return 'bg-primary/20 text-primary';
    }
  };

  const getQualityTextClass = (qualityIndex: number): string => {
    if (qualityIndex < 65) return 'text-accent';
    if (qualityIndex < 80) return 'text-yellow-400';
    return 'text-primary';
  };

  return (
    <div className="lg:w-5/12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-space font-medium text-lg text-white">Water Resources</h3>
        <div className="flex items-center space-x-2">
          {(['All', 'Critical', 'Stable'] as FilterType[]).map(type => (
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
      
      <div className="space-y-4 h-80 overflow-y-auto pr-2">
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <div 
              key={resource.id}
              className={`bg-background/50 rounded-lg p-4 border-l-4 ${getBorderColorClass(resource.status)} cursor-pointer ${
                selectedResource?.id === resource.id ? 'ring-1 ring-primary' : ''
              }`}
              onClick={() => onResourceSelect(resource)}
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-space font-medium text-white">{resource.name}</h4>
                <span className={`${getStatusBgClass(resource.status)} text-xs px-2 py-1 rounded-md`}>
                  {resource.status}
                </span>
              </div>
              <p className="text-white/70 text-sm mb-3">{resource.region}, {resource.country}</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-white/50">Quality Index</p>
                  <p className={`${getQualityTextClass(resource.qualityIndex)} font-medium`}>
                    {resource.qualityIndex}/100
                  </p>
                </div>
                <div>
                  <p className="text-white/50">Flow Rate</p>
                  <p className="text-white font-medium">{resource.flowRate} m³/h</p>
                </div>
                <div>
                  <p className="text-white/50">Status</p>
                  <p className="text-white font-medium">{resource.isActive ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
              <button className="mt-3 text-primary hover:text-accent transition-colors text-xs flex items-center">
                <span className="material-icons text-xs mr-1">visibility</span>
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/50">
            <span className="material-icons text-4xl mb-2">water_drop</span>
            <p>No resources match the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceList;
