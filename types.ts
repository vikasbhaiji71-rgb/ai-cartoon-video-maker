
export interface Character {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gender?: 'Male' | 'Female';
  ageGroup?: 'Child' | 'Adult';
  style?: 'Simple 2D' | 'Kids Cartoon';
}

export interface Scene {
  sceneNumber: number;
  dialogue: string;
  visualDescription: string;
  imageUrl?: string;
  isGenerating?: boolean;
}

export type AppView = 'home' | 'script' | 'generator' | 'preview' | 'export' | 'video-maker' | 'voice-generator' | 'final-export' | 'about' | 'privacy' | 'terms' | 'contact' | 'blog' | 'admin' | 'login' | 'signup' | 'pricing';

export interface ProjectState {
  script: string;
  language: 'Hindi' | 'English';
  length: '30 sec' | '40 sec';
  style: 'Kids' | 'Story' | 'Motivation';
  character?: Character;
  scenes: Scene[];
}
