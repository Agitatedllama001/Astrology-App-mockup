import React, { useState } from 'react';
import { Star, Sun, StickyNote, Binary, Scroll, ShoppingCart } from 'lucide-react';

import { UserData, ReadingType, TileConfig } from './types';
import { StarBackground, ZodiacWheel, FloatingZodiacSigns } from './components/BackgroundEffects';
import { InputForm } from './components/InputForm';
import { ReadingTile } from './components/ReadingTile';
import { AstrologyView, VedicView, TarotView, NumerologyView, ChineseView, ShopView } from './components/Views';

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    dob: '',
    birthPlace: '',
  });

  const [selectedType, setSelectedType] = useState<ReadingType | null>(null);
  const [currentView, setCurrentView] = useState<'home' | ReadingType>('home');

  const isFormValid = userData.name.trim() !== '' && userData.dob !== '' && userData.birthPlace.trim() !== '';

  const tiles: TileConfig[] = [
    { type: ReadingType.Astrology, icon: Star, description: "Western Birth Chart", color: "text-blue-400" },
    { type: ReadingType.Vedic, icon: Sun, description: "Vedic Wisdom & Doshas", color: "text-orange-400" },
    { type: ReadingType.Tarot, icon: StickyNote, description: "3-Card Reading", color: "text-purple-400" },
    { type: ReadingType.Numerology, icon: Binary, description: "Life Path & Destiny", color: "text-green-400" },
    { type: ReadingType.Chinese, icon: Scroll, description: "Zodiac Animals", color: "text-red-400" },
    { type: ReadingType.Shop, icon: ShoppingCart, description: "Remedies & Gems", color: "text-yellow-400" },
  ];

  const handleTileClick = (type: ReadingType) => {
    if (!isFormValid) return;
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      setCurrentView(selectedType);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    setCurrentView('home');
    setSelectedType(null);
  };

  const renderView = () => {
    switch (currentView) {
      case ReadingType.Astrology:
        return <AstrologyView userData={userData} onBack={goBack} />;
      case ReadingType.Vedic:
        return <VedicView userData={userData} onBack={goBack} onShop={() => setCurrentView(ReadingType.Shop)} />;
      case ReadingType.Tarot:
        return <TarotView userData={userData} onBack={goBack} />;
      case ReadingType.Numerology:
        return <NumerologyView userData={userData} onBack={goBack} />;
      case ReadingType.Chinese:
        return <ChineseView userData={userData} onBack={goBack} />;
      case ReadingType.Shop:
        return <ShopView onBack={goBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen text-gray-100 font-sans selection:bg-mystic-teal selection:text-black pb-20">
      <StarBackground />
      <ZodiacWheel />
      <FloatingZodiacSigns />

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex flex-col items-center gap-8">
        
        {/* Header */}
        <header className="text-center space-y-2 mb-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystic-teal to-mystic-gold drop-shadow-sm">
            Mystic Oracle
          </h1>
          <p className="text-sm md:text-lg text-mystic-teal/80 font-serif tracking-widest uppercase">
            Unlock the secrets of the cosmos
          </p>
        </header>

        {currentView === 'home' ? (
          <>
            {/* Input Form */}
            <InputForm userData={userData} setUserData={setUserData} />

            {/* Instruction */}
            <div className="w-full text-center">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-mystic-gold to-transparent mx-auto mb-4 opacity-50"></div>
                <p className="text-mystic-teal font-serif text-lg animate-pulse">
                    {isFormValid 
                      ? "Select a card below" 
                      : "Enter your details above"}
                </p>
            </div>

            {/* Tiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
              {tiles.map((tile) => (
                <ReadingTile
                  key={tile.type}
                  type={tile.type}
                  icon={tile.icon}
                  color={tile.color}
                  onClick={() => handleTileClick(tile.type)}
                  disabled={!isFormValid}
                  isSelected={selectedType === tile.type}
                />
              ))}
            </div>

            {/* Continue Button */}
            {isFormValid && selectedType && (
              <div className="fixed bottom-8 z-50 animate-float">
                <button
                  onClick={handleContinue}
                  className="px-12 py-4 bg-mystic-purple border border-mystic-gold text-mystic-gold font-serif text-xl rounded-full shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:scale-110 transition-transform tracking-widest uppercase backdrop-blur-md"
                >
                  Continue
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="w-full animate-fade-in">
             {renderView()}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-500 text-sm font-serif">
        <p>&copy; {new Date().getFullYear()} Mystic Oracle. The stars guide us, but we choose our path.</p>
      </footer>
    </div>
  );
};

export default App;
