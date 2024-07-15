'use client';
import Count from '@/components/Count';
import RnMList from '@/components/RnMList';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <h1>Next js yaay</h1>
        <Count />
        <Suspense fallback={<p>Characters loading...</p>}></Suspense>
        <RnMList />
      </div>
    </main>
  );
}
