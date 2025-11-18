import React from 'react';
import { DietaryPreference, SkillLevel, RecipeOptions } from '../types';

interface RecipeOptionsSelectorProps {
  options: RecipeOptions;
  setOptions: React.Dispatch<React.SetStateAction<RecipeOptions>>;
}

export const RecipeOptionsSelector: React.FC<RecipeOptionsSelectorProps> = ({ options, setOptions }) => {
  const handleOptionChange = <K extends keyof RecipeOptions,>(key: K, value: RecipeOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };
  
  const cookingTimes = ['< 15 mins', '30 mins', '45 mins', '1 hour', '> 1 hour'];

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase">Preferences</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
       </div>
       
       <div className="space-y-5">
        <div>
            <label className="block text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">Dietary Choice</label>
            <div className="flex flex-wrap gap-2">
                {Object.values(DietaryPreference).map(pref => (
                  <button 
                    key={pref} 
                    onClick={() => handleOptionChange('dietaryPreference', pref)}
                    className={`px-4 py-2 text-sm rounded-full transition-all duration-300 border ${
                        options.dietaryPreference === pref 
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 border-transparent text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] scale-105' 
                        : 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-800 hover:border-white/20 hover:text-slate-200'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
            </div>
        </div>
        <div>
            <label className="block text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">Cooking Skill</label>
            <div className="flex flex-wrap gap-2">
                {Object.values(SkillLevel).map(level => (
                  <button 
                    key={level} 
                    onClick={() => handleOptionChange('skillLevel', level)}
                    className={`px-4 py-2 text-sm rounded-full transition-all duration-300 border ${
                        options.skillLevel === level 
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 border-transparent text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-105' 
                        : 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-800 hover:border-white/20 hover:text-slate-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
            </div>
        </div>
        <div>
          <label htmlFor="cooking-time" className="block text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">Max Cooking Time</label>
          <div className="relative">
              <select 
                  id="cooking-time"
                  value={options.cookingTime}
                  onChange={(e) => handleOptionChange('cookingTime', e.target.value)}
                  className="appearance-none block w-full pl-4 pr-10 py-3 text-base bg-slate-900/50 border border-white/10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent sm:text-sm rounded-xl transition-shadow shadow-inner"
              >
                {cookingTimes.map(time => <option key={time} value={time} className="bg-slate-800 text-slate-200">{time}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};