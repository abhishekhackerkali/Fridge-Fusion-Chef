import React from 'react';

interface RecipeDisplayProps {
  recipe: string;
  isLoading: boolean;
}

const Placeholder: React.FC = () => (
    <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full bg-white/[0.02] border-2 border-dashed border-white/10 rounded-3xl p-12 min-h-[500px]">
        <div className="p-6 bg-slate-800/50 rounded-full mb-6 ring-1 ring-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-9-5.747h18" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 3.753a9 9 0 015 0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 1.127a13.92 13.92 0 01-8 0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5a8.963 8.963 0 01-16.5 0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12a8.963 8.963 0 0116.5 0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25a8.963 8.963 0 01-8.25-5.632m16.5 0A8.963 8.963 0 0112 20.25" />
            </svg>
        </div>
        <h3 className="text-2xl font-fancy text-slate-300 mb-2">Your Culinary Creation Awaits</h3>
        <p className="max-w-xs mx-auto text-sm text-slate-500">Provide ingredients on the left to start the magic.</p>
    </div>
);

const LoadingSkeleton: React.FC = () => (
    <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full bg-white/[0.02] border border-white/10 rounded-3xl p-12 min-h-[500px] backdrop-blur-sm">
        <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-violet-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-transparent border-violet-500 rounded-full animate-spin shadow-[0_0_15px_rgba(139,92,246,0.3)]"></div>
        </div>
        <h3 className="text-2xl font-fancy bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-pink-200 animate-pulse">Simmering your suggestions...</h3>
        <p className="max-w-xs mx-auto mt-3 text-slate-400">Our AI Chef is crafting a masterpiece.</p>
    </div>
);

const InfoPill: React.FC<{ icon: React.ReactElement<{ className?: string }>; text: string }> = ({ icon, text }) => (
    <div className="flex items-center gap-2 bg-slate-800/80 border border-white/10 text-violet-200 px-4 py-2 rounded-full text-sm shadow-sm backdrop-blur-md">
        {React.cloneElement(icon, { className: "h-4 w-4 text-violet-400" })}
        <span className="font-medium tracking-wide">{text}</span>
    </div>
);

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, isLoading }) => {
    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (!recipe) {
        return <Placeholder />;
    }

    const parseSection = (marker: string) => {
        const regex = new RegExp(`_START_${marker}_([\\s\\S]*?)_END_${marker}_`, 'm');
        const match = recipe.match(regex);
        return match ? match[1].trim() : '';
    };

    const recipeName = parseSection('RECIPE_NAME');
    const servingSize = parseSection('SERVING_SIZE');
    const totalTime = parseSection('TOTAL_TIME');
    const ingredients = parseSection('INGREDIENTS').split('\n').filter(Boolean);
    const instructions = parseSection('INSTRUCTIONS').split('\n').filter(Boolean);
    const summary = parseSection('INGREDIENT_SUMMARY');

    const TimeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    const PeopleIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

    return (
        <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6 md:p-10">
            {/* Ambient background glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-fancy font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                    {recipeName || 'Your Delicious Recipe'}
                </h2>
                
                <div className="flex flex-wrap gap-3 mb-8">
                    {totalTime && <InfoPill icon={<TimeIcon />} text={totalTime} />}
                    {servingSize && <InfoPill icon={<PeopleIcon />} text={servingSize} />}
                </div>

                <div className="p-5 bg-gradient-to-r from-violet-900/30 to-transparent border-l-4 border-violet-500 rounded-r-xl mb-10">
                    <p className="text-slate-300 italic text-lg leading-relaxed">"{summary}"</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-1 space-y-6">
                        <h3 className="text-xl font-fancy text-white border-b border-white/10 pb-2">Ingredients</h3>
                        <ul className="space-y-3">
                            {ingredients.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-slate-300">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)] flex-shrink-0"></div>
                                    <span className="text-sm md:text-base">{item.replace(/^- /, '')}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <h3 className="text-xl font-fancy text-white border-b border-white/10 pb-2">Instructions</h3>
                        <div className="space-y-6">
                            {instructions.map((step, index) => (
                                <div key={index} className="group flex gap-5">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-sm font-bold text-violet-300 group-hover:border-violet-500/50 group-hover:text-violet-200 transition-colors shadow-sm">
                                        {index + 1}
                                    </div>
                                    <p className="text-slate-300 leading-relaxed pt-1 text-sm md:text-base group-hover:text-slate-100 transition-colors">
                                        {step.replace(/^\d+\.\s*/, '')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};