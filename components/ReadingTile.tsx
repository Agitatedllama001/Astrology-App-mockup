import React from 'react';
import { ReadingType } from '../types';

interface ReadingTileProps {
  type: ReadingType;
  icon: React.ComponentType<any>;
  onClick: () => void;
  disabled: boolean;
  color: string;
  isSelected: boolean;
}

export const ReadingTile: React.FC<ReadingTileProps> = ({ type, icon: Icon, onClick, disabled, color, isSelected }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative w-full h-48 md:h-56 perspective-1000 transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isSelected ? 'scale-105 z-20' : 'hover:scale-105'}
      `}
    >
      <div className={`
        relative w-full h-full transform-style-3d 
        ${isSelected ? 'rotate-x-12' : 'group-hover:rotate-x-12'}
        transition-transform duration-500
      `}>
        
        {/* Card Face */}
        <div className={`
          absolute inset-0 rounded-xl backdrop-blur-sm
          bg-gradient-to-br from-white/10 to-transparent shadow-xl
          flex flex-col items-center justify-center p-4
          transition-all duration-300
          ${isSelected 
            ? 'border-2 border-mystic-gold shadow-[0_0_30px_rgba(251,191,36,0.3)]' 
            : 'border border-white/10 hover:border-mystic-gold/50 hover:shadow-mystic-gold/20'}
        `}>
          
          {/* Decorative Corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-mystic-teal/50"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-mystic-teal/50"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-mystic-teal/50"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-mystic-teal/50"></div>

          {/* Icon */}
          <div className={`
            p-4 rounded-full bg-black/20 mb-4 transition-transform duration-500
            ${color}
            ${isSelected ? 'scale-110' : 'group-hover:scale-110'}
          `}>
            <Icon size={32} />
          </div>

          {/* Title */}
          <h3 className={`
            text-lg md:text-xl font-serif tracking-wide text-center transition-colors
            ${isSelected ? 'text-mystic-gold' : 'text-white group-hover:text-mystic-gold'}
          `}>
            {type}
          </h3>
          
          {/* Mystic Glow Effect on Hover/Select */}
          {!disabled && (
            <div className={`absolute inset-0 bg-mystic-gold/5 transition-opacity rounded-xl ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
          )}
        </div>
        
        {/* 3D Depth Shadow/Edge */}
        <div className="absolute inset-0 rounded-xl bg-black/50 transform translate-z-[-10px] translate-y-2 blur-md z-[-1]"></div>
      </div>
    </button>
  );
};
