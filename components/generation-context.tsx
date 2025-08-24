'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type GenerationStep = 'idle' | 'processing' | 'reading' | 'generating' | 'complete';

interface GenerationContextType {
  step: GenerationStep;
  setStep: (step: GenerationStep) => void;
  isGenerating: boolean;
}

const GenerationContext = createContext<GenerationContextType | undefined>(undefined);

export function GenerationProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<GenerationStep>('idle');
  
  return (
    <GenerationContext.Provider value={{
      step,
      setStep,
      isGenerating: step !== 'idle' && step !== 'complete'
    }}>
      {children}
    </GenerationContext.Provider>
  );
}

export function useGeneration() {
  const context = useContext(GenerationContext);
  if (!context) {
    throw new Error('useGeneration must be used within GenerationProvider');
  }
  return context;
}