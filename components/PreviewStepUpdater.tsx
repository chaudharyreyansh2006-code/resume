'use client';

import React from 'react';
import { useGeneration } from '@/components/generation-context';

export default function PreviewStepUpdater() {
  const { setStep } = useGeneration();
  
  // Update to generating step when this component mounts
  React.useEffect(() => {
    setStep('generating');
  }, [setStep]);
  
  return null;
}