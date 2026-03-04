export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Legacy';

export interface Achievement {
  id: string;
  name: {
    en: string;
    pt: string;
  };
  description: {
    en: string;
    pt: string;
  };
  howToGet: {
    en: string;
    pt: string;
  };
  difficulty: Difficulty;
  image: string;
  isLegacy: boolean;
  order: number;
}
