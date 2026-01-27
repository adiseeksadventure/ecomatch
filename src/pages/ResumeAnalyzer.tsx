import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

// --- Reusable Components ---

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextInput: React.FC<InputProps> = ({ label, className = '', ...props }) => (
  <div className="space-y-2 w-full">
    <label className="block text-[10px] font-black text-nature-sage uppercase tracking-[0.2em] ml-1">
      {label}
    </label>
    <input
      className={`input-field ${className}`}
      {...props}
    />
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, className = '', ...props }) => (
  <div className="space-y-2 w-full">
    <label className="block text-[10px] font-black text-nature-sage uppercase tracking-[0.2em] ml-1">
      {label}
    </label>
    <textarea
      className={`input-field min-h-[160px] resize-none ${className}`}
      {...props}
    />
  </div>
);

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({ onFileSelect, selectedFile, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    if (validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024) {
      onFileSelect(file);
    } else {
      alert('Please upload a valid PDF, PNG or JPG (max 10MB)');
    }
  };

  if (selectedFile) {
    return (
      <div className="w-full p-8 rounded-[2rem] border-2 border-nature-primary/20 bg-nature-accent/20 flex items-center justify-between group animate-in zoom-in-95 duration-500">
        <div className="flex items-center space-x-5">
          <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
            <FileText className="w-8 h-8 text-nature-heading" />
          </div>
          <div>
            <p className="text-sm font-black text-nature-heading">{selectedFile.name}</p>
            <p className="text-[10px] font-bold text-nature-primary uppercase opacity-60">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze</p>
          </div>
        </div>
        <button 
          onClick={onClear}
          className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <label className="block text-[10px] font-black text-nature-sage uppercase tracking-[0.2em] ml-1 mb-3">
        Resume Document
      </label>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative w-full h-64 rounded-[2.5rem] border-4 border-dashed
          flex flex-col items-center justify-center cursor-pointer
          transition-all duration-500 group
          ${isDragging 
            ? 'border-nature-primary bg-nature-primary/5 scale-[1.02]' 
            : 'border-nature-sage/10 hover:border-nature-primary/30 bg-white/50'
          }
        `}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
          accept=".pdf,.png,.jpg,.jpeg"
        />
        <div className={`
          p-5 rounded-3xl bg-white shadow-xl shadow-nature-sage/5 mb-6 transition-all duration-500
          ${isDragging ? 'scale-110 rotate-12 bg-nature-heading text-white' : 'group-hover:scale-110 text-nature-sage'}
        `}>
          <Upload className="w-8 h-8" />
        </div>
        <p className="text-lg font-black text-nature-heading mb-1 tracking-tight">
          Drop your legacy here
        </p>
        <p className="text-[10px] font-bold text-nature-sage uppercase tracking-widest opacity-60">
          PDF, PNG or JPG up to 10MB
        </p>
      </div>
    </div>
  );
};

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className = '', disabled, ...props }) => (
  <button
    className={`
      w-full btn-primary py-5 px-8 text-xs font-black uppercase tracking-[0.2em]
      transition-all duration-500
      ${disabled
        ? 'opacity-50 grayscale cursor-not-allowed shadow-none'
        : 'hover:scale-[1.02] active:scale-[0.98]'
      }
      ${className}
    `}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

// --- Main Page Component ---

const ResumeAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAnalyze = () => {
    // Placeholder for analysis logic
    console.log('Analyzing:', { company, jobTitle, description, file });
    alert('Analysis started! (Demo)');
  };

  return (
    <div className="min-h-screen w-full bg-nature-bg py-20 font-sans selection:bg-nature-accent/30 selection:text-nature-heading">
      
      <main className="container mx-auto px-4 max-w-5xl">
        
        {/* Hero Section */}
        <div className="text-center mb-20 space-y-6 max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="p-5 rounded-[2rem] bg-nature-accent shadow-xl shadow-nature-sage/10 border-4 border-white">
               <FileText className="h-10 w-10 text-nature-heading" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-nature-heading mb-6 tracking-tight leading-tight">
             Align Your <span className="text-nature-primary italic">Nature</span> <br />
             With Your Career
          </h1>
          <p className="text-xl text-nature-primary font-medium opacity-70 max-w-xl mx-auto italic">
            "Your work is a piece of the ecosystem. Ensure it resonates with the values of a regenerative future."
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl shadow-nature-sage/10 rounded-[3rem] border border-nature-sage/10 p-10 md:p-16 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <TextInput 
              label="Organization" 
              placeholder="e.g. Green Peace"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            
            <TextInput 
              label="Role Title" 
              placeholder="e.g. Sustainability Lead"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <TextArea 
            label="Role Purpose & Impact" 
            placeholder="Paste the job description or describe how this role contributes to the planet..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="space-y-12">
            <div className="h-px bg-nature-sage/10"></div>
            
            <UploadBox 
              selectedFile={file}
              onFileSelect={setFile}
              onClear={() => setFile(null)}
            />

            <PrimaryButton 
              disabled={!file || !company || !jobTitle} 
              onClick={handleAnalyze}
            >
              Analyze Career Alignment
            </PrimaryButton>
          </div>

          <div className="pt-8 text-center">
            <p className="text-[10px] font-black text-nature-sage uppercase tracking-[0.2em] flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4 text-nature-primary" />
              Privacy Secured • Eco-Friendly Processing
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeAnalyzer;
