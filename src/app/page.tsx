'use client';
import Count from '@/components/Count';
import RnMList from '@/components/RnMList';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>This is the homepage</h1>
      <Count />
    </main>
  );
}
