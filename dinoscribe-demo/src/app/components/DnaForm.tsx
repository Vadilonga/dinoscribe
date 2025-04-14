'use client';

import { useState } from 'react';
import { analyzeDna } from '../lib/dnaAnalyzer';

interface DnaFormProps {
  onAnalysisComplete: (result: any) => void;
}

export default function DnaForm({ onAnalysisComplete }: DnaFormProps) {
  const [dnaSequence, setDnaSequence] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate input
    if (!dnaSequence.trim()) {
      setError('Please enter a DNA sequence');
      return;
    }
    
    // Check if the sequence contains valid DNA characters
    const validDna = /^[ATCGatcg\s]+$/.test(dnaSequence);
    if (!validDna) {
      setError('DNA sequence should only contain A, T, C, G characters');
      return;
    }
    
    // Process the DNA sequence
    setIsLoading(true);
    try {
      const result = analyzeDna(dnaSequence);
      onAnalysisComplete(result);
    } catch (err) {
      setError('An error occurred during analysis');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateRandom = () => {
    const bases = ['A', 'T', 'C', 'G'];
    let randomDna = '';
    
    // Generate a random DNA sequence of 30 codons (90 bases)
    for (let i = 0; i < 90; i++) {
      randomDna += bases[Math.floor(Math.random() * bases.length)];
    }
    
    setDnaSequence(randomDna);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">DNA Sequence Analyzer</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="dnaSequence" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enter DNA Sequence (A, T, C, G characters only)
          </label>
          <textarea
            id="dnaSequence"
            value={dnaSequence}
            onChange={(e) => setDnaSequence(e.target.value)}
            placeholder="e.g., ATCGTAGCATCGATCGATCG..."
            className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            spellCheck="false"
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Analyze DNA'}
          </button>
          
          <button
            type="button"
            onClick={handleGenerateRandom}
            className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-md shadow transition-colors"
          >
            Generate Random DNA
          </button>
        </div>
      </form>
    </div>
  );
}
