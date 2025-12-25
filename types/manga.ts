// Type for manga status - kan kun være en av disse tre verdiene
export type MangaStatus = 'Reading' | 'Completed' | 'Dropped';

// Type for filter tabs - enten "All" eller en av manga statusene
export type FilterTab = 'All' | MangaStatus;

// Interface for manga data som lagres i AsyncStorage
export interface MangaData {
  current_chapter: number;  // Hvilket kapittel brukeren er på
  status: MangaStatus;      // Status på mangaen (Reading/Completed/Dropped)
  last_read?: number;       // Timestamp for sist oppdatert (optional)
}

// Interface for manga med tittel - brukes når vi viser data i appen
export interface Manga extends MangaData {
  title: string;  // Tittelen på mangaen
}

// Interface for hele biblioteket - key er manga tittel, value er manga data
export interface MangaLibrary {
  [title: string]: MangaData;
}