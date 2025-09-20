'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Mypage() {
  useEffect(() => {
    redirect('/mypage/moodboard');
  }, []);

  return null;
} 