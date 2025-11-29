import React from 'react';

export interface UserData {
  name: string;
  dob: string;
  birthPlace: string;
}

export enum ReadingType {
  Astrology = 'Western Astrology',
  Vedic = 'Vedic Astrology',
  Tarot = 'Tarot Reading',
  Numerology = 'Numerology',
  Chinese = 'Chinese Astrology',
  Shop = 'Mystic Shop'
}

export interface BaseReading {
  summary: string;
}

export interface AstrologyReading extends BaseReading {
  sunSign: string;
  moonSign: string;
  luckyColor: string;
  luckyNumber: string;
  compatibleSigns: string[];
  luckyGemstone: string;
}

export interface DashaPeriod {
  name: string;
  period: string;
}

export interface Dosha {
  name: string;
  description: string;
  remedy: string;
}

export interface VedicReading extends BaseReading {
  lagna: string;
  moonSign: string;
  ascendant: string;
  currentDasha: string;
  pastDasha: string;
  futureDasha: string; // Simplified for display
  luckyColor: string;
  luckyNumber: string;
  compatibleSigns: string[];
  luckyGemstone: string;
  doshas: Dosha[];
}

export interface TarotCard {
  name: string;
  description: string;
  meaning: string;
}

export interface TarotReading extends BaseReading {
  cards: TarotCard[];
}

export interface NumerologyReading extends BaseReading {
  lifePathNumber: string;
  destinyNumber: string;
}

export interface ChineseReading extends BaseReading {
  zodiacAnimal: string;
  element: string;
  yearOutlook: string;
}

export type ReadingData = AstrologyReading | VedicReading | TarotReading | NumerologyReading | ChineseReading | null;

export interface TileConfig {
  type: ReadingType;
  icon: React.ComponentType<any>;
  description: string;
  color: string;
}
