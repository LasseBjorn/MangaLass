export type MangaStatus = 'Reading' | 'Completed' | 'Dropped';
export type FilterTab = 'All' | MangaStatus;

export interface MangaData {
  current_chapter: number;
  status: MangaStatus;
  last_read?: number;
}

export interface Manga extends MangaData {
  title: string;
}

export interface MangaLibrary {
  [title: string]: MangaData;
}