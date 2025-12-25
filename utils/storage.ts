import AsyncStorage from '@react-native-async-storage/async-storage';
import { MangaLibrary } from '../types/manga';

const STORAGE_KEY = '@manga_library';

export const loadLibrary = async (): Promise<MangaLibrary> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return {};
  } catch (error) {
    console.error('Error loading library:', error);
    return {};
  }
};

export const saveLibrary = async (library: MangaLibrary): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(library));
  } catch (error) {
    console.error('Error saving library:', error);
  }
};