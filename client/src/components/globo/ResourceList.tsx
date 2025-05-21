import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterType>('All');
  const [showDetail, setShowDetail] = useState<number | null>(null);

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

  // Форматирование суммы с разделителями тысяч
  const formatCurrency = (amount?: number): string => {
    if (amount === undefined) return 'N/A';
    return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  // Получить процент выполнения финансирования
  const getFundingPercent = (resource: WaterResource): number => {
    if (!resource.totalFunding || !resource.fundingProgress) return 0;
    return Math.min(100, Math.round((resource.fundingProgress / resource.totalFunding) * 100));
  };

  return (
    <div className="lg:w-5/12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-space font-medium text-lg text-white">{t('globo.resourceList.investmentObjects', 'Инвестиционные объекты')}</h3>
        <div className="flex items-center space-x-2">
          {(['All', 'Critical', 'Needs Attention', 'Stable'] as FilterType[]).map(type => (
            <button 
              key={type}
              className={`text-white/70 hover:text-primary transition-colors px-3 py-1 text-sm ${
                filter === type ? 'rounded-md bg-background/50' : ''
              }`}
              onClick={() => setFilter(type)}
            >
              {t(`globo.resourceList.filters.${type.toLowerCase().replace(' ', '_')}`, type)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4 h-[430px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <div 
              key={resource.id}
              className={`bg-background/50 backdrop-blur-sm rounded-lg p-4 border-l-4 ${getBorderColorClass(resource.status)} cursor-pointer transition-all duration-300 hover:bg-background/70 ${
                selectedResource?.id === resource.id ? 'ring-1 ring-primary' : ''
              }`}
              onClick={() => {
                onResourceSelect(resource);
                if (showDetail !== resource.id) {
                  setShowDetail(resource.id);
                }
              }}
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-space font-medium text-white">{resource.name}</h4>
                <span className={`${getStatusBgClass(resource.status)} text-xs px-2 py-1 rounded-md`}>
                  {t(`globo.resourceList.statuses.${resource.status.toLowerCase().replace(/\s+/g, '_')}`, resource.status)}
                </span>
              </div>
              <p className="text-white/70 text-sm mb-3">{resource.region}, {resource.country}</p>
              
              {/* Базовая информация всегда видна */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-white/50">{t('globo.resourceList.qualityIndex', 'Индекс качества')}</p>
                  <p className={`${getQualityTextClass(resource.qualityIndex)} font-medium`}>
                    {resource.qualityIndex}/100
                  </p>
                </div>
                <div>
                  <p className="text-white/50">{t('globo.resourceList.flowRate', 'Расход')}</p>
                  <p className="text-white font-medium">{resource.flowRate} m³/h</p>
                </div>
                <div>
                  <p className="text-white/50">{t('globo.resourceList.type', 'Тип')}</p>
                  <p className="text-white font-medium">{t(`globo.resourceList.projectTypes.${resource.projectType?.toLowerCase().replace(/\s+/g, '_')}`, resource.projectType || 'Водный ресурс')}</p>
                </div>
              </div>
              
              {/* Инвестиционные данные (отображаются, если ресурс выбран) */}
              {showDetail === resource.id && resource.totalFunding && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                    <div>
                      <p className="text-white/50">{t('globo.resourceList.totalFunding', 'Общее финансирование')}</p>
                      <p className="text-white font-medium">{formatCurrency(resource.totalFunding)}</p>
                    </div>
                    <div>
                      <p className="text-white/50">{t('globo.resourceList.availableForDAO', 'Доступно для DAO')}</p>
                      <p className="text-white font-medium">{formatCurrency(resource.availableForDAO)}</p>
                    </div>
                    <div>
                      <p className="text-white/50">{t('globo.resourceList.expectedReturn', 'Ожидаемая доходность (IRR)')}</p>
                      <p className="text-primary font-medium">{resource.irr}%</p>
                    </div>
                    <div>
                      <p className="text-white/50">{t('globo.resourceList.participants', 'Участники')}</p>
                      <p className="text-white font-medium">{resource.participantsCount || 0}</p>
                    </div>
                  </div>
                  
                  {/* Прогресс финансирования */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">{t('globo.resourceList.fundingProgress', 'Прогресс финансирования')}</span>
                      <span className="text-primary font-medium">{getFundingPercent(resource)}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${getFundingPercent(resource)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Кнопка инвестирования */}
                  <button className="mt-4 bg-primary hover:bg-primary/80 text-black font-medium rounded-md py-2 w-full text-sm transition-colors flex items-center justify-center">
                    <span className="material-icons mr-1 text-sm">account_balance_wallet</span>
                    {t('globo.resourceList.investInProject', 'Инвестировать в проект')}
                  </button>
                </div>
              )}
              
              {showDetail !== resource.id && (
                <button 
                  className="mt-3 text-primary hover:text-accent transition-colors text-xs flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetail(resource.id);
                    onResourceSelect(resource);
                  }}
                >
                  <span className="material-icons text-xs mr-1">visibility</span>
                  {t('globo.resourceList.viewInvestmentDetails', 'Просмотр деталей инвестиции')}
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/50">
            <span className="material-icons text-4xl mb-2">water_drop</span>
            <p>{t('globo.resourceList.noResourcesMatch', 'Нет ресурсов, соответствующих выбранному фильтру.')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceList;
