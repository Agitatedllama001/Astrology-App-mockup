import React from 'react';

export const StarBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-mystic-purple via-mystic-dark to-mystic-blue opacity-90"></div>
      
      {/* Stars - static for performance */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
      
      {/* Dynamic glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mystic-teal rounded-full blur-[128px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mystic-gold rounded-full blur-[128px] opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export const ZodiacWheel: React.FC = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5 pointer-events-none z-0 animate-spin-slow">
       <svg viewBox="0 0 100 100" className="w-full h-full text-mystic-teal fill-current">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {[...Array(12)].map((_, i) => (
            <line 
              key={i}
              x1="50" y1="50"
              x2={50 + 48 * Math.cos((i * 30 * Math.PI) / 180)}
              y2={50 + 48 * Math.sin((i * 30 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="0.2"
            />
          ))}
       </svg>
    </div>
  );
};

export const FloatingZodiacSigns: React.FC = () => {
  // Simple SVG paths for a few zodiac signs (Aries, Taurus, Gemini, Cancer, Leo, Virgo)
  const signs = [
    "M12 5a7 7 0 0 1 7 7v4a4 4 0 0 0 4 4 M12 5a7 7 0 0 0-7 7v4a4 4 0 0 1-4 4 M12 5v19", // Aries
    "M6 8a6 6 0 0 1 12 0 M12 8v12 M12 20a4 4 0 1 0 0-8 4 4 0 1 0 0 8", // Taurus (simplified)
    "M8 4v16 M16 4v16 M8 4h8 M8 20h8", // Gemini
    "M6 12a6 6 0 1 1 12 0 M18 12a6 6 0 1 0-12 0", // Cancer (simplified loops)
    "M12 4a4 4 0 1 0-4 4c0 4 4 8 4 12", // Leo (simplified)
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {signs.map((path, i) => (
        <div 
          key={i} 
          className="absolute text-mystic-gold/20 animate-float"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            animationDelay: `${i * 1.5}s`,
            transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`
          }}
        >
           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
             <path d={path} strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </div>
      ))}
    </div>
  );
};
