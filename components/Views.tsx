import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RefreshCw, Mic, Volume2, ShoppingBag } from 'lucide-react';
import { UserData, AstrologyReading, VedicReading, TarotReading, NumerologyReading, ChineseReading, ReadingType } from '../types';
import { generateReading } from '../services/geminiService';

// --- Shared Components ---

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
    <div className="w-20 h-20 border-4 border-mystic-gold border-t-transparent rounded-full animate-spin"></div>
    <p className="text-mystic-gold text-xl font-serif animate-pulse">Consulting the Stars...</p>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string | undefined }) => (
  <div className="flex flex-col md:flex-row md:items-baseline justify-between py-2 border-b border-white/10">
    <span className="text-mystic-teal font-serif text-lg">{label}</span>
    <span className="text-white font-sans text-right">{value || '...'}</span>
  </div>
);

const SummaryBox = ({ title, content }: { title: string; content: string }) => (
  <div className="mt-6 bg-white/5 p-6 rounded-xl border border-white/10">
    <h3 className="text-xl text-mystic-gold font-serif mb-3">{title}</h3>
    <p className="text-gray-300 leading-relaxed font-sans">{content}</p>
  </div>
);

// --- View Components ---

// 1. Astrology View
export const AstrologyView: React.FC<{ userData: UserData; onBack: () => void }> = ({ userData, onBack }) => {
  const [data, setData] = useState<AstrologyReading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateReading(userData, ReadingType.Astrology).then(res => {
        setData(res as AstrologyReading);
        setLoading(false);
    }).catch(() => setLoading(false));
  }, [userData]);

  if (loading) return <LoadingScreen />;
  if (!data) return <div className="text-center text-red-400">Error loading reading.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-float">
      <h2 className="text-4xl font-serif text-mystic-gold text-center border-b border-white/20 pb-4">Western Birth Chart</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
            <DetailRow label="Sun Sign" value={data.sunSign} />
            <DetailRow label="Moon Sign" value={data.moonSign} />
            <DetailRow label="Lucky Color" value={data.luckyColor} />
        </div>
        <div className="space-y-2">
            <DetailRow label="Lucky Number" value={data.luckyNumber} />
            <DetailRow label="Gemstone" value={data.luckyGemstone} />
            <DetailRow label="Compatible With" value={data.compatibleSigns?.join(', ')} />
        </div>
      </div>

      <SummaryBox title="Planetary Insight" content={data.summary} />

      <button onClick={onBack} className="w-full py-3 mt-8 border border-mystic-teal text-mystic-teal hover:bg-mystic-teal hover:text-black transition-colors rounded-lg font-serif">
        Main Menu
      </button>
    </div>
  );
};

// 2. Vedic View
export const VedicView: React.FC<{ userData: UserData; onBack: () => void; onShop: () => void }> = ({ userData, onBack, onShop }) => {
  const [data, setData] = useState<VedicReading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateReading(userData, ReadingType.Vedic).then(res => {
        setData(res as VedicReading);
        setLoading(false);
    }).catch(() => setLoading(false));
  }, [userData]);

  if (loading) return <LoadingScreen />;
  if (!data) return <div className="text-center text-red-400">Error loading reading.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-4xl font-serif text-mystic-gold text-center border-b border-white/20 pb-4">Vedic Chart</h2>

      <div className="grid md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-xl">
         <DetailRow label="Lagna (Ascendant)" value={data.lagna} />
         <DetailRow label="Moon Sign (Rashi)" value={data.moonSign} />
         <DetailRow label="Nakshatra/Ascendant" value={data.ascendant} />
         <DetailRow label="Lucky Gemstone" value={data.luckyGemstone} />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl text-mystic-teal font-serif">Dasha Periods</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-gray-400 text-sm">Past</div>
                <div className="text-mystic-gold font-serif">{data.pastDasha}</div>
            </div>
            <div className="p-4 border border-mystic-gold rounded-lg bg-mystic-gold/10">
                <div className="text-gray-400 text-sm">Current</div>
                <div className="text-mystic-gold font-bold font-serif">{data.currentDasha}</div>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-gray-400 text-sm">Future</div>
                <div className="text-mystic-gold font-serif">{data.futureDasha}</div>
            </div>
        </div>
      </div>

      {/* Doshas */}
      <div className="space-y-4">
          <h3 className="text-2xl text-red-300 font-serif">Dosha Analysis</h3>
          {data.doshas && data.doshas.length > 0 ? (
              data.doshas.map((dosha, idx) => (
                  <div key={idx} className="bg-red-900/20 p-4 rounded-lg border border-red-900/50">
                      <h4 className="text-lg text-red-200 font-bold">{dosha.name}</h4>
                      <p className="text-gray-300 text-sm mt-1">{dosha.description}</p>
                      <p className="text-mystic-teal text-sm mt-2"><strong className="text-white">Remedy:</strong> {dosha.remedy}</p>
                  </div>
              ))
          ) : <p className="text-gray-400 italic">No major doshas detected.</p>}
      </div>

      <div 
        onClick={onShop}
        className="cursor-pointer bg-gradient-to-r from-mystic-purple to-mystic-blue p-6 rounded-xl border border-mystic-gold/30 hover:border-mystic-gold transition-all hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] text-center group"
      >
          <h3 className="text-xl font-serif text-mystic-gold mb-2 group-hover:scale-105 transition-transform">Suggested Online Puja & Remedies</h3>
          <p className="text-sm text-gray-300">Click here to explore remedies for your chart</p>
      </div>

      <button onClick={onBack} className="w-full py-3 border border-mystic-teal text-mystic-teal hover:bg-mystic-teal hover:text-black transition-colors rounded-lg font-serif">
        Main Menu
      </button>
    </div>
  );
};

// 3. Tarot View
export const TarotView: React.FC<{ userData: UserData; onBack: () => void }> = ({ userData, onBack }) => {
    const [step, setStep] = useState<'input' | 'shuffling' | 'result'>('input');
    const [question, setQuestion] = useState('');
    const [mood, setMood] = useState('');
    const [reading, setReading] = useState<TarotReading | null>(null);

    const moods = ['🤩 Excited', '😊 Happy', '😐 Neutral', '😔 Sad', '😭 Crying'];

    // Audio input stub
    const handleMicClick = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.start();
            recognition.onresult = (event: any) => {
                setQuestion(event.results[0][0].transcript);
            };
        } else {
            alert("Speech recognition not supported in this browser.");
        }
    };

    const startReading = async () => {
        setStep('shuffling');
        // Start API call early
        const promise = generateReading(userData, ReadingType.Tarot, `Question: ${question}, Mood: ${mood}`);
        
        // Wait at least 5 seconds for animation
        setTimeout(async () => {
            try {
                const res = await promise;
                setReading(res as TarotReading);
                setStep('result');
            } catch (e) {
                setStep('input'); // fallback
            }
        }, 5000);
    };

    if (step === 'input') {
        return (
            <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">
                <h2 className="text-3xl font-serif text-mystic-gold text-center">Ask the Cards</h2>
                
                <div className="relative">
                    <textarea 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="What seeks an answer?"
                        className="w-full h-32 bg-black/30 border border-mystic-teal/30 rounded-lg p-4 text-white placeholder-gray-500 focus:border-mystic-gold outline-none"
                    />
                    <button onClick={handleMicClick} className="absolute bottom-4 right-4 text-mystic-teal hover:text-white">
                        <Mic size={20} />
                    </button>
                </div>

                <div className="space-y-3">
                    <p className="text-center text-gray-400 font-serif">Select your current mood</p>
                    <div className="flex justify-between gap-2">
                        {moods.map(m => (
                            <button 
                                key={m} 
                                onClick={() => setMood(m)}
                                className={`px-2 py-2 rounded-lg text-sm md:text-base transition-all ${mood === m ? 'bg-mystic-teal text-black scale-110' : 'bg-white/5 hover:bg-white/10'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    disabled={!question || !mood}
                    onClick={startReading}
                    className="w-full py-3 bg-mystic-gold/20 hover:bg-mystic-gold/30 text-mystic-gold border border-mystic-gold rounded-lg font-serif tracking-widest uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
                
                <button onClick={onBack} className="w-full py-2 text-gray-500 text-sm hover:text-white">Back to Main Menu</button>
            </div>
        );
    }

    if (step === 'shuffling') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                {/* CSS Animation for shuffling would go here - simplified visually */}
                <div className="relative w-40 h-64">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620066228678-569055740449?auto=format&fit=crop&w=300')] bg-cover rounded-xl border-2 border-mystic-gold shadow-2xl animate-[spin_1s_ease-in-out_infinite]"></div>
                    <div className="absolute inset-0 bg-mystic-purple rounded-xl transform rotate-6 animate-pulse"></div>
                </div>
                <p className="mt-8 text-2xl font-serif text-mystic-gold animate-bounce">Shuffling Destiny...</p>
            </div>
        );
    }

    // Result View
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-3xl font-serif text-mystic-gold text-center">Your Guidance</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
                {reading?.cards.map((card, i) => (
                    <div key={i} className="bg-black/40 border border-mystic-gold/30 p-6 rounded-xl flex flex-col items-center text-center hover:border-mystic-gold transition-colors">
                        <div className="w-full h-48 bg-gradient-to-b from-mystic-purple to-black mb-4 rounded-lg flex items-center justify-center border border-white/5">
                            {/* Placeholder for card image */}
                            <span className="font-serif text-4xl text-mystic-teal opacity-50">{i + 1}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 font-serif">{card.name}</h3>
                        <p className="text-xs text-mystic-teal mb-3 italic">{card.description}</p>
                        <p className="text-sm text-gray-300">{card.meaning}</p>
                    </div>
                ))}
            </div>

            <SummaryBox title="Reading Summary" content={reading?.summary || ''} />

            <div className="flex gap-4">
                <button onClick={startReading} className="flex-1 py-3 border border-mystic-gold text-mystic-gold hover:bg-mystic-gold hover:text-black transition-colors rounded-lg font-serif flex items-center justify-center gap-2">
                   <RefreshCw size={18} /> Reshuffle
                </button>
                <button onClick={onBack} className="flex-1 py-3 border border-mystic-teal text-mystic-teal hover:bg-mystic-teal hover:text-black transition-colors rounded-lg font-serif">
                   Main Menu
                </button>
            </div>
        </div>
    );
};

// 4. Numerology View
export const NumerologyView: React.FC<{ userData: UserData; onBack: () => void }> = ({ userData, onBack }) => {
    const [data, setData] = useState<NumerologyReading | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      generateReading(userData, ReadingType.Numerology).then(res => {
          setData(res as NumerologyReading);
          setLoading(false);
      }).catch(() => setLoading(false));
    }, [userData]);
  
    if (loading) return <LoadingScreen />;
    if (!data) return <div className="text-center text-red-400">Error loading reading.</div>;

    return (
        <div className="max-w-3xl mx-auto text-center space-y-10">
            <h2 className="text-4xl font-serif text-mystic-gold">Numerological Blueprint</h2>
            
            <div className="flex flex-col md:flex-row gap-8 justify-center">
                <div className="bg-white/5 p-8 rounded-full w-64 h-64 flex flex-col items-center justify-center border-2 border-mystic-teal mx-auto">
                    <span className="text-6xl font-bold text-white mb-2">{data.lifePathNumber}</span>
                    <span className="text-sm text-mystic-teal uppercase tracking-widest">Life Path</span>
                </div>
                <div className="bg-white/5 p-8 rounded-full w-64 h-64 flex flex-col items-center justify-center border-2 border-mystic-gold mx-auto">
                    <span className="text-6xl font-bold text-white mb-2">{data.destinyNumber}</span>
                    <span className="text-sm text-mystic-gold uppercase tracking-widest">Destiny Number</span>
                </div>
            </div>

            <SummaryBox title="The Numbers Speak" content={data.summary} />

            <button onClick={onBack} className="w-full py-3 border border-mystic-teal text-mystic-teal hover:bg-mystic-teal hover:text-black transition-colors rounded-lg font-serif">
             Main Menu
            </button>
        </div>
    );
};

// 5. Chinese View
export const ChineseView: React.FC<{ userData: UserData; onBack: () => void }> = ({ userData, onBack }) => {
    const [data, setData] = useState<ChineseReading | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      generateReading(userData, ReadingType.Chinese).then(res => {
          setData(res as ChineseReading);
          setLoading(false);
      }).catch(() => setLoading(false));
    }, [userData]);
  
    if (loading) return <LoadingScreen />;
    if (!data) return <div className="text-center text-red-400">Error loading reading.</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-serif text-mystic-gold text-center">Chinese Zodiac</h2>
            
            <div className="bg-gradient-to-br from-red-900/40 to-black p-8 rounded-2xl border border-red-500/30 text-center">
                <div className="text-red-400 font-serif text-xl mb-2">Your Sign</div>
                <div className="text-6xl font-bold text-white mb-4">{data.zodiacAnimal}</div>
                <div className="text-xl text-gray-300">Element: <span className="text-mystic-gold">{data.element}</span></div>
            </div>

            <SummaryBox title="Year Outlook" content={data.yearOutlook} />
            <SummaryBox title="Characteristics" content={data.summary} />

            <button onClick={onBack} className="w-full py-3 border border-mystic-teal text-mystic-teal hover:bg-mystic-teal hover:text-black transition-colors rounded-lg font-serif">
             Main Menu
            </button>
        </div>
    );
};

// 6. Shop View
export const ShopView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [category, setCategory] = useState<string | null>(null);

    const categories = [
        "Gems", "Rudrakshyas", "Crystals", "Online Puja", "Yantras", "Amulets"
    ];

    const products: Record<string, string[]> = {
        "Gems": ["Blue Sapphire (Neelam)", "Ruby (Manik)", "Emerald (Panna)", "Yellow Sapphire"],
        "Rudrakshyas": ["1 Mukhi Rudraksha", "5 Mukhi Rudraksha Mala", "Gauri Shankar"],
        "Crystals": ["Amethyst Cluster", "Rose Quartz Tower", "Clear Quartz Sphere"],
        "Online Puja": ["Navagraha Shanti", "Kaal Sarpa Dosha Nivaran", "Maha Mrityunjaya"],
        "Yantras": ["Sri Yantra", "Kuber Yantra", "Mahalakshmi Yantra"],
        "Amulets": ["Evil Eye Protection", "Wealth Attractor", "Health Talisman"]
    };

    if (category) {
        return (
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => setCategory(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft />
                    </button>
                    <h2 className="text-3xl font-serif text-mystic-gold">{category}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {products[category]?.map((prod, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center group hover:bg-white/10 transition-colors cursor-pointer">
                            <span className="font-serif text-lg">{prod}</span>
                            <span className="text-mystic-teal group-hover:translate-x-1 transition-transform">View &rarr;</span>
                        </div>
                    ))}
                </div>
                 <button onClick={onBack} className="w-full py-3 border border-mystic-teal text-mystic-teal hover:bg-mystic-teal hover:text-black transition-colors rounded-lg font-serif mt-8">
                    Main Menu
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-4xl font-serif text-mystic-gold text-center mb-12">Mystic Shop</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((cat, i) => (
                    <button 
                        key={i} 
                        onClick={() => setCategory(cat)}
                        className="aspect-square bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-xl hover:border-mystic-gold hover:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all flex flex-col items-center justify-center gap-4 group"
                    >
                        <ShoppingBag size={32} className="text-mystic-teal group-hover:text-mystic-gold transition-colors" />
                        <span className="font-serif text-xl tracking-wide">{cat}</span>
                    </button>
                ))}
            </div>
            <button onClick={onBack} className="w-full py-3 border border-mystic-teal text-mystic-teal hover:bg-mystic-teal hover:text-black transition-colors rounded-lg font-serif mt-8">
             Main Menu
            </button>
        </div>
    );
};
