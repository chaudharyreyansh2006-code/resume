'use client';

import React from 'react';
import { useGeneration } from '@/components/generation-context';

export default function PdfStepUpdater() {
  const { setStep } = useGeneration();
  
  // Update to reading step when this component mounts
  React.useEffect(() => {
    setStep('reading');
  }, [setStep]);
  
  return null;
}