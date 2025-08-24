'use client';

import { CustomSpinner } from '@/components/CustomSpinner';
import { useGeneration } from './generation-context';
import { useEffect } from 'react';

const stepMessages = {
  processing: 'Processing your PDF...',
  reading: 'Reading your resume carefully...',
  generating: 'Generating your beautiful website...',
};

interface GenerationProgressProps {
  className?: string;
}

export default function GenerationProgress({ className }: GenerationProgressProps) {
  const { step } = useGeneration();
  
  if (step === 'idle' || step === 'complete') {
    return null;
  }
  
  return (
    <div className={`flex justify-center items-center h-[80vh] flex-col ${className}`}>
      <CustomSpinner className="h-10 w-10 mr-2" />
      <p className="mt-2.5 font-mono max-w-[400px] text-center text-lg">
        {stepMessages[step as keyof typeof stepMessages]}
      </p>
    </div>
  );
}