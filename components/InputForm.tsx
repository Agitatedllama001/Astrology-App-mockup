import React from 'react';
import { UserData } from '../types';

interface InputFormProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export const InputForm: React.FC<InputFormProps> = ({ userData, setUserData }) => {
  const handleChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto p-6 md:p-10 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
      <h2 className="text-xl md:text-2xl text-mystic-gold font-serif text-center mb-8 opacity-90 tracking-widest uppercase">
        Begin Your Journey
      </h2>
      
      <div className="font-serif text-lg md:text-2xl leading-loose text-center text-gray-200">
        <span>My name is </span>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Your Full Name"
          className="bg-transparent border-b-2 border-mystic-teal text-mystic-teal placeholder-gray-500 focus:outline-none focus:border-mystic-gold transition-colors px-2 py-1 w-full md:w-auto text-center"
        />
        <span> and I was born on </span>
        <input
          type="date"
          value={userData.dob}
          onChange={(e) => handleChange('dob', e.target.value)}
          className="bg-transparent border-b-2 border-mystic-teal text-mystic-teal placeholder-gray-500 focus:outline-none focus:border-mystic-gold transition-colors px-2 py-1 w-full md:w-auto text-center cursor-pointer"
        />
        <span>, in </span>
        <input
          type="text"
          value={userData.birthPlace}
          onChange={(e) => handleChange('birthPlace', e.target.value)}
          placeholder="City, Country"
          className="bg-transparent border-b-2 border-mystic-teal text-mystic-teal placeholder-gray-500 focus:outline-none focus:border-mystic-gold transition-colors px-2 py-1 w-full md:w-auto text-center"
        />
        <span>.</span>
      </div>
      
      <p className="mt-6 text-center text-sm text-gray-400 font-sans italic">
        (Please fill in all details above to unlock the cards below)
      </p>
    </div>
  );
};