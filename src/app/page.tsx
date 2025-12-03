'use client';

import React, { useState } from 'react';
import { MOCK_USER_TENSOR } from '@/lib/mockData';
import { AmbientHome } from '@/components/interface/AmbientHome';
import { SplitScreen } from '@/components/interface/SplitScreen';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [view, setView] = useState<'home' | 'writing'>('home');

  return (
    <main className="min-h-screen overflow-hidden selection:bg-[rgb(var(--accent-rgb))]/30 selection:text-white">
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <AmbientHome key="home" tensor={MOCK_USER_TENSOR} onStart={() => setView('writing')} />
        ) : (
          <SplitScreen key="writing" tensor={MOCK_USER_TENSOR} />
        )}
      </AnimatePresence>
    </main>
  );
}
