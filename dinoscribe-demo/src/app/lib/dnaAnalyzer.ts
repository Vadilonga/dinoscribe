// DNA Analyzer Module
// This module contains functions to analyze DNA sequences and generate creature traits

// Define trait types
export interface Trait {
  name: string;
  description: string;
  category: 'size' | 'limbs' | 'diet' | 'skin' | 'habitat' | 'intelligence' | 'special';
}

export interface CreatureProfile {
  traits: Trait[];
  viabilityScore: number;
  description: string;
}

// DNA segment to trait mapping
const DNA_TRAIT_MAPPING: Record<string, Trait> = {
  // Size traits
  'AAA': { name: 'Microscopic', description: 'Barely visible to the naked eye', category: 'size' },
  'AAT': { name: 'Tiny', description: 'Size of a mouse', category: 'size' },
  'AAG': { name: 'Small', description: 'Size of a house cat', category: 'size' },
  'AAC': { name: 'Medium', description: 'Size of a wolf', category: 'size' },
  'ATA': { name: 'Large', description: 'Size of a horse', category: 'size' },
  'ATT': { name: 'Huge', description: 'Size of an elephant', category: 'size' },
  'ATG': { name: 'Gigantic', description: 'Size of a dinosaur', category: 'size' },
  'ATC': { name: 'Colossal', description: 'Size of a blue whale', category: 'size' },
  
  // Limb traits
  'TAA': { name: 'No limbs', description: 'Moves by slithering or undulating', category: 'limbs' },
  'TAT': { name: 'Two limbs', description: 'Bipedal movement', category: 'limbs' },
  'TAG': { name: 'Four limbs', description: 'Quadrupedal movement', category: 'limbs' },
  'TAC': { name: 'Six limbs', description: 'Insect-like movement', category: 'limbs' },
  'TTA': { name: 'Eight limbs', description: 'Arachnid-like movement', category: 'limbs' },
  'TTT': { name: 'Many limbs', description: 'Centipede-like movement', category: 'limbs' },
  'TTG': { name: 'Tentacles', description: 'Moves using flexible appendages', category: 'limbs' },
  'TTC': { name: 'Wings', description: 'Capable of flight', category: 'limbs' },
  
  // Diet traits
  'GAA': { name: 'Herbivore', description: 'Eats only plant matter', category: 'diet' },
  'GAT': { name: 'Carnivore', description: 'Eats only meat', category: 'diet' },
  'GAG': { name: 'Omnivore', description: 'Eats both plants and meat', category: 'diet' },
  'GAC': { name: 'Filter feeder', description: 'Filters nutrients from water', category: 'diet' },
  'GTA': { name: 'Photosynthetic', description: 'Creates energy from sunlight', category: 'diet' },
  'GTT': { name: 'Chemosynthetic', description: 'Creates energy from chemicals', category: 'diet' },
  'GTG': { name: 'Parasitic', description: 'Feeds off other organisms', category: 'diet' },
  'GTC': { name: 'Decomposer', description: 'Consumes dead matter', category: 'diet' },
  
  // Skin traits
  'CAA': { name: 'Smooth skin', description: 'Slick, hairless skin', category: 'skin' },
  'CAT': { name: 'Fur', description: 'Covered in fur or hair', category: 'skin' },
  'CAG': { name: 'Scales', description: 'Covered in reptilian scales', category: 'skin' },
  'CAC': { name: 'Feathers', description: 'Covered in feathers', category: 'skin' },
  'CTA': { name: 'Exoskeleton', description: 'Hard outer shell', category: 'skin' },
  'CTT': { name: 'Slime', description: 'Covered in mucus or slime', category: 'skin' },
  'CTG': { name: 'Spines', description: 'Covered in spikes or spines', category: 'skin' },
  'CTC': { name: 'Armored plates', description: 'Protected by bony plates', category: 'skin' },
  
  // Habitat traits
  'AGA': { name: 'Terrestrial', description: 'Lives on land', category: 'habitat' },
  'AGT': { name: 'Aquatic', description: 'Lives in water', category: 'habitat' },
  'AGG': { name: 'Arboreal', description: 'Lives in trees', category: 'habitat' },
  'AGC': { name: 'Subterranean', description: 'Lives underground', category: 'habitat' },
  'ACA': { name: 'Aerial', description: 'Lives primarily in the air', category: 'habitat' },
  'ACT': { name: 'Amphibious', description: 'Lives both on land and in water', category: 'habitat' },
  'ACG': { name: 'Desert', description: 'Adapted to arid environments', category: 'habitat' },
  'ACC': { name: 'Polar', description: 'Adapted to extreme cold', category: 'habitat' },
  
  // Intelligence traits
  'TGA': { name: 'Instinctual', description: 'Acts purely on instinct', category: 'intelligence' },
  'TGT': { name: 'Basic intelligence', description: 'Simple problem-solving abilities', category: 'intelligence' },
  'TGG': { name: 'Advanced intelligence', description: 'Complex problem-solving and tool use', category: 'intelligence' },
  'TGC': { name: 'Sapient', description: 'Self-aware with language capabilities', category: 'intelligence' },
  'TCA': { name: 'Hive mind', description: 'Collective intelligence', category: 'intelligence' },
  'TCT': { name: 'Telepathic', description: 'Can communicate through thoughts', category: 'intelligence' },
  'TCG': { name: 'Precognitive', description: 'Can sense future events', category: 'intelligence' },
  'TCC': { name: 'Empathic', description: 'Can sense emotions of others', category: 'intelligence' },
  
  // Special traits
  'GGA': { name: 'Bioluminescent', description: 'Produces light', category: 'special' },
  'GGT': { name: 'Regenerative', description: 'Can regrow lost body parts', category: 'special' },
  'GGG': { name: 'Venomous', description: 'Produces toxins', category: 'special' },
  'GGC': { name: 'Camouflage', description: 'Can blend into surroundings', category: 'special' },
  'GCA': { name: 'Electric', description: 'Can generate electricity', category: 'special' },
  'GCT': { name: 'Sonic', description: 'Can produce powerful sound waves', category: 'special' },
  'GCG': { name: 'Metamorphic', description: 'Can change form', category: 'special' },
  'GCC': { name: 'Symbiotic', description: 'Lives in mutual relationship with other organisms', category: 'special' },
};

/**
 * Parses a DNA sequence and extracts trait segments
 * @param dnaSequence The DNA sequence to analyze
 * @returns An array of DNA segments (3-letter codons)
 */
export function parseDnaSequence(dnaSequence: string): string[] {
  // Clean the input - remove any non-DNA characters and convert to uppercase
  const cleanDna = dnaSequence.toUpperCase().replace(/[^ATCG]/g, '');
  
  // Extract 3-letter segments (codons)
  const segments: string[] = [];
  for (let i = 0; i < cleanDna.length; i += 3) {
    if (i + 3 <= cleanDna.length) {
      segments.push(cleanDna.substring(i, i + 3));
    }
  }
  
  return segments;
}

/**
 * Maps DNA segments to creature traits
 * @param segments Array of DNA segments (codons)
 * @returns Array of traits
 */
export function mapDnaToTraits(segments: string[]): Trait[] {
  const traits: Trait[] = [];
  
  // Map each segment to a trait if it exists in our mapping
  segments.forEach(segment => {
    if (DNA_TRAIT_MAPPING[segment]) {
      traits.push(DNA_TRAIT_MAPPING[segment]);
    }
  });
  
  // Deduplicate traits by category (only keep the last trait for each category)
  const uniqueTraits: Trait[] = [];
  const categoryMap: Record<string, boolean> = {};
  
  // Process traits in reverse to keep the last occurrence of each category
  for (let i = traits.length - 1; i >= 0; i--) {
    const trait = traits[i];
    if (!categoryMap[trait.category]) {
      uniqueTraits.unshift(trait); // Add to the beginning to maintain original order
      categoryMap[trait.category] = true;
    }
  }
  
  return uniqueTraits;
}

/**
 * Calculates a viability score for a set of traits
 * @param traits Array of traits
 * @returns A score from 0 to 100
 */
export function calculateViabilityScore(traits: Trait[]): number {
  // Start with a base score
  let score = 50;
  
  // Get traits by category for easier reference
  const traitsByCategory: Record<string, Trait | undefined> = {};
  traits.forEach(trait => {
    traitsByCategory[trait.category] = trait;
  });
  
  // Check for basic requirements (size, limbs, diet)
  if (!traitsByCategory['size']) score -= 15;
  if (!traitsByCategory['limbs']) score -= 15;
  if (!traitsByCategory['diet']) score -= 15;
  
  // Check for biological coherence
  
  // 1. Size vs Limbs compatibility
  if (traitsByCategory['size'] && traitsByCategory['limbs']) {
    const size = traitsByCategory['size'].name;
    const limbs = traitsByCategory['limbs'].name;
    
    // Microscopic creatures shouldn't have many limbs
    if (size === 'Microscopic' && 
        ['Four limbs', 'Six limbs', 'Eight limbs', 'Many limbs'].includes(limbs)) {
      score -= 10;
    }
    
    // Colossal creatures with too many limbs are structurally unsound
    if (size === 'Colossal' && 
        ['Many limbs', 'Eight limbs'].includes(limbs)) {
      score -= 10;
    }
  }
  
  // 2. Diet vs Habitat compatibility
  if (traitsByCategory['diet'] && traitsByCategory['habitat']) {
    const diet = traitsByCategory['diet'].name;
    const habitat = traitsByCategory['habitat'].name;
    
    // Photosynthetic creatures need access to light
    if (diet === 'Photosynthetic' && 
        ['Subterranean', 'Deep sea'].includes(habitat)) {
      score -= 15;
    }
    
    // Filter feeders need water
    if (diet === 'Filter feeder' && 
        ['Terrestrial', 'Arboreal', 'Desert', 'Aerial'].includes(habitat)) {
      score -= 15;
    }
  }
  
  // 3. Skin vs Habitat compatibility
  if (traitsByCategory['skin'] && traitsByCategory['habitat']) {
    const skin = traitsByCategory['skin'].name;
    const habitat = traitsByCategory['habitat'].name;
    
    // Fur in aquatic environments is less viable
    if (skin === 'Fur' && 
        ['Aquatic'].includes(habitat)) {
      score -= 10;
    }
    
    // Slime in desert environments is less viable
    if (skin === 'Slime' && 
        ['Desert'].includes(habitat)) {
      score -= 10;
    }
  }
  
  // 4. Limbs vs Habitat compatibility
  if (traitsByCategory['limbs'] && traitsByCategory['habitat']) {
    const limbs = traitsByCategory['limbs'].name;
    const habitat = traitsByCategory['habitat'].name;
    
    // No limbs is problematic for arboreal creatures
    if (limbs === 'No limbs' && 
        ['Arboreal'].includes(habitat)) {
      score -= 10;
    }
    
    // Wings are beneficial for aerial creatures
    if (limbs === 'Wings' && 
        ['Aerial'].includes(habitat)) {
      score += 10;
    }
  }
  
  // Bonus for complete trait sets
  const categoryCount = Object.keys(traitsByCategory).length;
  score += Math.min(categoryCount * 3, 20); // Up to 20 points for having all categories
  
  // Ensure score is within 0-100 range
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Generates a textual description of a creature based on its traits
 * @param traits Array of traits
 * @returns A descriptive paragraph
 */
export function generateCreatureDescription(traits: Trait[]): string {
  // Get traits by category for easier reference
  const traitsByCategory: Record<string, Trait | undefined> = {};
  traits.forEach(trait => {
    traitsByCategory[trait.category] = trait;
  });
  
  // Start building the description
  let description = "This creature ";
  
  // Add size description
  if (traitsByCategory['size']) {
    description += `is ${traitsByCategory['size'].name.toLowerCase()}, `;
  } else {
    description += "is of indeterminate size, ";
  }
  
  // Add skin description
  if (traitsByCategory['skin']) {
    description += `with ${traitsByCategory['skin'].description.toLowerCase()}. `;
  } else {
    description += "with unknown skin characteristics. ";
  }
  
  // Add limb description
  if (traitsByCategory['limbs']) {
    description += `It has ${traitsByCategory['limbs'].description.toLowerCase()}. `;
  }
  
  // Add diet description
  if (traitsByCategory['diet']) {
    description += `The creature is ${traitsByCategory['diet'].description.toLowerCase()}. `;
  }
  
  // Add habitat description
  if (traitsByCategory['habitat']) {
    description += `It typically ${traitsByCategory['habitat'].description.toLowerCase()}. `;
  }
  
  // Add intelligence description
  if (traitsByCategory['intelligence']) {
    description += `This species is ${traitsByCategory['intelligence'].description.toLowerCase()}. `;
  }
  
  // Add special trait description
  if (traitsByCategory['special']) {
    description += `Notably, it ${traitsByCategory['special'].description.toLowerCase()}.`;
  }
  
  return description;
}

/**
 * Analyzes a DNA sequence and generates a complete creature profile
 * @param dnaSequence The DNA sequence to analyze
 * @returns A creature profile with traits, viability score, and description
 */
export function analyzeDna(dnaSequence: string): CreatureProfile {
  const segments = parseDnaSequence(dnaSequence);
  const traits = mapDnaToTraits(segments);
  const viabilityScore = calculateViabilityScore(traits);
  const description = generateCreatureDescription(traits);
  
  return {
    traits,
    viabilityScore,
    description
  };
}
