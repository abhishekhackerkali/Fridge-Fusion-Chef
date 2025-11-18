import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  imagePreview: string | null;
}

const CameraIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400 group-hover:text-violet-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, imagePreview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onImageChange(file || null);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    onImageChange(file || null);
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-3">Upload a photo of your ingredients</label>
      <div 
        className="group mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-slate-700 border-dashed rounded-2xl cursor-pointer hover:border-violet-500/50 hover:bg-slate-800/50 transition-all duration-300 bg-slate-900/30"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="space-y-2 text-center">
          {imagePreview ? (
            <div className="relative inline-block">
                <img src={imagePreview} alt="Ingredients preview" className="mx-auto h-48 w-auto rounded-lg object-cover shadow-lg ring-2 ring-white/10" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                 <div className="p-3 bg-slate-800 rounded-full ring-1 ring-white/5 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <CameraIcon />
                 </div>
              </div>
              <div className="flex text-sm text-slate-400 justify-center">
                <p className="font-medium text-violet-400 hover:text-violet-300">Click to upload</p>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-slate-500">PNG, JPG up to 10MB</p>
            </>
          )}
          <input 
            ref={fileInputRef}
            id="file-upload" 
            name="file-upload" 
            type="file" 
            className="sr-only" 
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
        </div>
      </div>
      {imagePreview && (
          <div className="flex justify-center mt-3">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onImageChange(null);
                    if(fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="text-xs font-medium text-red-400 hover:text-red-300 px-3 py-1 rounded-full bg-red-400/10 hover:bg-red-400/20 transition-colors"
            >
                Remove image
            </button>
          </div>
      )}
    </div>
  );
};