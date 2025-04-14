'use client';

import { CreatureProfile as CreatureProfileType } from '../lib/dnaAnalyzer';

interface CreatureProfileProps {
  profile: CreatureProfileType;
}

export default function CreatureProfile({ profile }: CreatureProfileProps) {
  const { traits, viabilityScore, description } = profile;

  // Group traits by category
  const traitsByCategory: Record<string, typeof traits> = {};
  traits.forEach(trait => {
    if (!traitsByCategory[trait.category]) {
      traitsByCategory[trait.category] = [];
    }
    traitsByCategory[trait.category].push(trait);
  });

  // Determine viability score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    if (score >= 20) return 'text-orange-600';
    return 'text-red-600';
  };

  // Determine viability label
  const getViabilityLabel = (score: number) => {
    if (score >= 80) return 'Highly Viable';
    if (score >= 60) return 'Viable';
    if (score >= 40) return 'Questionable';
    if (score >= 20) return 'Unlikely';
    return 'Non-viable';
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Creature Profile</h2>
      
      {/* Viability Score */}
      <div className="mb-6 text-center">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Viability Score</h3>
        <div className="flex items-center justify-center">
          <div className={`text-4xl font-bold ${getScoreColor(viabilityScore)}`}>
            {viabilityScore}
          </div>
          <div className="ml-3 text-lg font-medium text-gray-600 dark:text-gray-400">
            / 100 ({getViabilityLabel(viabilityScore)})
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Traits */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Traits</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(traitsByCategory).map(([category, categoryTraits]) => (
            <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
              <h4 className="font-medium text-gray-800 dark:text-white capitalize mb-2">
                {category}
              </h4>
              <ul className="space-y-1">
                {categoryTraits.map(trait => (
                  <li key={trait.name} className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{trait.name}:</span> {trait.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
