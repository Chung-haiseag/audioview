export interface Movie {
  id: string;
  title: string;
  year: number;
  country: string;
  duration: number; // minutes
  genres: string[];
  description?: string;
  posterUrl: string;
  hasAD: boolean; // Audio Description
  hasCC: boolean; // Closed Caption
  hasMultiLang: boolean; // Multi-language subtitles
}

export interface Category {
  id: string;
  name: string;
  count: number;
  imageUrl: string;
}

export enum ViewState {
  HOME = 'HOME',
  CATEGORIES = 'CATEGORIES',
  DOWNLOADS = 'DOWNLOADS',
  SETTINGS = 'SETTINGS',
  PLAYER = 'PLAYER'
}