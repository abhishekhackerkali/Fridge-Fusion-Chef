import React from 'react';

// An icon to represent culinary inspiration.
const ChefIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45.385c-.345.675-.5 1.425-.5 2.182V6.5a1 1 0 001 1h1.5a1 1 0 001-1v-1.764c0-.636.136-1.266.37-1.861a1 1 0 00-1.631-1.262l-1.42 2.13a1 1 0 001.762 1.042l1.58-2.37a1 1 0 00-1.23-1.63z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662A3.503 3.503 0 005 9.5v.5a2.5 2.5 0 005 0v-.5a3.503 3.503 0 00-1.324-2.754A4.535 4.535 0 0011 5.092V5z" clipRule="evenodd" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center gap-3">
        <div className="p-2 bg-white/5 rounded-xl ring-1 ring-white/10 shadow-lg">
            <ChefIcon />
        </div>
        <h1 className="text-2xl md:text-3xl font-fancy font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-pink-200 to-white drop-shadow-sm">
            The Fridge Fusion Chef
        </h1>
      </div>
    </header>
  );
};