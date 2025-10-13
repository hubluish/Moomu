import React, { Suspense } from 'react';
import SaveClient from './SaveClient';
import Spinner from '@/components/common/spinner/Spinner';

export default function SavePage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spinner /></div>}>
      <SaveClient />
    </Suspense>
  );
}
