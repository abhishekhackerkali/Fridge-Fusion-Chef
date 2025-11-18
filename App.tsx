import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { RecipeOptionsSelector } from './components/RecipeOptionsSelector';
import { RecipeDisplay } from './components/RecipeDisplay';
import { Loader } from './components/Loader';
import { identifyIngredientsFromImage, generateRecipe } from './services/geminiService';
import { DietaryPreference, SkillLevel, RecipeOptions } from './types';

const App: React.FC = () => {
  const [ingredientsText, setIngredientsText] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [recipeOptions, setRecipeOptions] = useState<RecipeOptions>({
    dietaryPreference: DietaryPreference.ANY,
    cookingTime: '45 minutes',
    skillLevel: SkillLevel.BEGINNER,
  });
  const [recipeOutput, setRecipeOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleImageChange = (file: File | null) => {
    setUploadedImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleGenerateRecipe = useCallback(async () => {
    if (!uploadedImage && !ingredientsText.trim()) {
      setError('Please upload an image or type in some ingredients to get started.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipeOutput('');

    try {
      let combinedIngredients = ingredientsText.trim();

      if (uploadedImage) {
        const reader = new FileReader();
        reader.readAsDataURL(uploadedImage);
        reader.onloadend = async () => {
          const base64data = (reader.result as string).split(',')[1];
          try {
            const imageIngredients = await identifyIngredientsFromImage(base64data);
            const finalIngredients = [imageIngredients, ingredientsText.trim()].filter(Boolean).join(', ');
            
            if (!finalIngredients) {
              setError("We couldn't identify any ingredients from the image. Please try another one or type them manually.");
              setIsLoading(false);
              return;
            }
            
            const recipe = await generateRecipe(finalIngredients, recipeOptions);
            setRecipeOutput(recipe);
          } catch (e) {
            console.error(e);
            setError('An error occurred while processing the image. Please try again.');
          } finally {
            setIsLoading(false);
          }
        };
        reader.onerror = () => {
            setError("Failed to read the image file.");
            setIsLoading(false);
        }
      } else {
        const recipe = await generateRecipe(combinedIngredients, recipeOptions);
        setRecipeOutput(recipe);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating the recipe. Please check your connection and try again.');
      setIsLoading(false);
    }
  }, [uploadedImage, ingredientsText, recipeOptions]);

  const canGenerate = ingredientsText.trim().length > 0 || uploadedImage !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#1e1b4b] to-slate-900">
      <Header />
      <main className="container mx-auto p-4 md:p-8 lg:px-16 pt-8 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Input Column */}
          <div className="lg:col-span-4 flex flex-col gap-6 self-start">
            
            <div className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden group">
                 {/* Decorative gradient blob */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl group-hover:bg-violet-500/30 transition-colors duration-700"></div>

                <h2 className="text-2xl font-fancy text-white mb-6 relative z-10 flex items-center gap-2">
                    Your Kitchen 
                    <span className="text-violet-400">Counter</span>
                </h2>
                
                <div className="space-y-8 relative z-10">
                    <ImageUploader onImageChange={handleImageChange} imagePreview={imagePreview} />
                    
                    <div className="relative">
                        <label htmlFor="ingredients" className="block text-sm font-medium text-slate-300 mb-3">...or type ingredients</label>
                        <textarea
                            id="ingredients"
                            rows={3}
                            className="w-full p-4 bg-slate-900/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-slate-200 placeholder-slate-500 shadow-inner resize-none"
                            placeholder="e.g., chicken, tomatoes, onions, cheese"
                            value={ingredientsText}
                            onChange={(e) => setIngredientsText(e.target.value)}
                        />
                    </div>

                    <RecipeOptionsSelector options={recipeOptions} setOptions={setRecipeOptions} />
                    
                    <button
                    onClick={handleGenerateRecipe}
                    disabled={isLoading || !canGenerate}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none flex items-center justify-center gap-3 text-lg"
                    >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                    {isLoading ? (
                        <>
                        <Loader />
                        <span className="animate-pulse">Fusing Flavors...</span>
                        </>
                    ) : (
                        <>
                         <span>Cook Up Magic!</span>
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </>
                    )}
                    </button>
                    
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}
                </div>
            </div>
          </div>

          {/* Output Column */}
          <div className="lg:col-span-8">
             <RecipeDisplay recipe={recipeOutput} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;