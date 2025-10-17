import React, { Suspense } from 'react';
import ResultClient from './ResultClient';
import Spinner from '@/components/common/spinner/Spinner';

export default function ResultPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spinner /></div>}>
      <ResultClient />
    </Suspense>
  );
}