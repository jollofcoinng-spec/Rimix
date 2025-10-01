import React from 'react';
import { PipelineStageData, PipelineStatus } from '../types';
import StatusIndicator from './StatusIndicator';
import DetailCard from './DetailCard';

interface PipelineStageProps {
  stage: PipelineStageData;
  isExpanded: boolean;
  onToggle: () => void;
}

const PipelineStage: React.FC<PipelineStageProps> = ({ stage, isExpanded, onToggle }) => {
  const statusClasses = {
    [PipelineStatus.PENDING]: 'border-slate-700 hover:border-slate-500',
    [PipelineStatus.RUNNING]: 'border-blue-500 shadow-lg shadow-blue-500/20 animate-pulse',
    [PipelineStatus.COMPLETED]: 'border-green-500',
    [PipelineStatus.FAILED]: 'border-red-500 shadow-lg shadow-red-500/20',
  };

  const InputIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>;
  const ActionIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" /></svg>;
  const OutputIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8H5v-2h10v2z" clipRule="evenodd" /></svg>;
  const ChevronIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div className="relative pl-16 sm:pl-20">
      <div className="absolute left-0 top-0 z-10">
        <StatusIndicator status={stage.status} id={stage.id} />
      </div>

      <div className={`border-2 ${statusClasses[stage.status]} rounded-xl bg-slate-800 transition-all duration-300 overflow-hidden`}>
        <div 
          className="flex flex-col sm:flex-row justify-between sm:items-center p-4 sm:p-6 cursor-pointer"
          onClick={onToggle}
          aria-expanded={isExpanded}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onToggle()}
        >
            <div className="flex-grow">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">{stage.title}</h2>
              <p className="text-md text-slate-400 font-medium">{stage.subtitle}</p>
            </div>
            <div className="sm:ml-4 shrink-0">
                {ChevronIcon}
            </div>
        </div>
        
        <div className={`transition-all duration-500 ease-in-out grid ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                <div className="p-4 sm:p-6 pt-0 flex flex-col lg:flex-row gap-4">
                    <DetailCard title="Input" items={stage.inputs} icon={InputIcon} colorClass="text-purple-400" />
                    <DetailCard title="Action" items={stage.actions} icon={ActionIcon} colorClass="text-blue-400" />
                    <DetailCard title="Output" items={stage.outputs} icon={OutputIcon} colorClass="text-green-400" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineStage;
