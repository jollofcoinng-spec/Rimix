import React from 'react';
import { PipelineStatus } from '../types';

interface StatusIndicatorProps {
    status: PipelineStatus;
    id: number;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, id }) => {
  const baseClasses = "w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 shrink-0";
  const iconClasses = "w-6 h-6 text-white";

  switch (status) {
    case PipelineStatus.RUNNING:
      return (
        <div className={`${baseClasses} border-blue-500 bg-blue-500/20`}>
          <svg className={`${iconClasses} animate-spin`} xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      );
    case PipelineStatus.COMPLETED:
      return (
        <div className={`${baseClasses} border-green-500 bg-green-500/20`}>
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      );
    case PipelineStatus.FAILED:
      return (
        <div className={`${baseClasses} border-red-500 bg-red-500/20`}>
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
      );
    case PipelineStatus.PENDING:
    default:
      return (
        <div className={`${baseClasses} border-slate-600 bg-slate-700/50`}>
          <span className="text-xl font-bold text-slate-400">{id}</span>
        </div>
      );
  }
};

export default StatusIndicator;
