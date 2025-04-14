'use client';

import { useState } from 'react';
import Image from 'next/image';
import DnaForm from './components/DnaForm';
import CreatureProfile from './components/CreatureProfile';
import { CreatureProfile as CreatureProfileType } from './lib/dnaAnalyzer';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<CreatureProfileType | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src="/logo.svg" alt="DinoScribe Logo" width={40} height={40} />
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">DinoScribe</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Analyze DNA sequences and discover fictional creatures
          </p>
        </header>

        <DnaForm onAnalysisComplete={setAnalysisResult} />
        
        {analysisResult && <CreatureProfile profile={analysisResult} />}
        
        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>DinoScribe - Fictional DNA Analysis Tool</p>
          <p className="mt-1">Built with Next.js - For demonstration purposes only</p>
        </footer>
      </div>
    </div>
  );
}
