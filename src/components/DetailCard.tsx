import React from 'react';
import { DetailItem } from '../types';

interface DetailCardProps {
    title: string;
    items: DetailItem[];
    icon: React.ReactElement;
    colorClass: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, items, icon, colorClass }) => (
    <div className="bg-slate-800/50 p-4 rounded-lg flex-1 min-w-[200px]">
        <h4 className={`font-semibold text-md mb-3 flex items-center ${colorClass}`}>
            {icon}
            <span className="ml-2">{title}</span>
        </h4>
        <ul className="space-y-2 text-sm">
            {items.map((item, index) => (
                <li key={index} className="text-slate-400">
                    <strong className="text-slate-200 block">{item.title}</strong>
                    <span>{item.description}</span>
                    {item.service && <span className="block text-xs font-mono bg-slate-700 text-cyan-300 px-2 py-0.5 rounded-full mt-1 inline-block">{item.service}</span>}
                </li>
            ))}
        </ul>
    </div>
);

export default DetailCard;
