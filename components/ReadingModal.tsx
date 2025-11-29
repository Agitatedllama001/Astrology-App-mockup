import React from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Sparkles, Share2 } from 'lucide-react';
import { ReadingType } from '../types';

interface ReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReadingType | null;
  content: string;
  loading: boolean;
}

export const ReadingModal: React.FC<ReadingModalProps> = ({ isOpen, onClose, title, content, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-mystic-gold/30 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-float">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-mystic-purple to-mystic-dark">
          <div className="flex items-center gap-3">
            <Sparkles className="text-mystic-gold" size={20} />
            <h3 className="text-2xl font-serif text-white tracking-wider">{title} Reading</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-black/20">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-16 h-16 border-4 border-mystic-teal border-t-transparent rounded-full animate-spin"></div>
              <p className="text-mystic-teal animate-pulse font-serif">Consulting the stars...</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-p:font-sans prose-headings:font-serif prose-headings:text-mystic-gold prose-strong:text-mystic-teal max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0f172a] flex justify-end">
           <button 
             className="flex items-center gap-2 px-4 py-2 text-sm text-mystic-teal hover:text-mystic-gold transition-colors"
             onClick={() => {
                navigator.clipboard.writeText(content);
                // Ideally show a toast here
             }}
           >
             <Share2 size={16} /> Copy Reading
           </button>
        </div>
      </div>
    </div>
  );
};