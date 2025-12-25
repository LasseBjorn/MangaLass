import AsyncStorage from '@react-native-async-storage/async-storage';
import { MangaLibrary } from '../types/manga';

// Key som brukes for å lagre data i AsyncStorage
const STORAGE_KEY = '@manga_library';

// Funksjon for å laste inn biblioteket fra AsyncStorage
export const loadLibrary = async (): Promise<MangaLibrary> => {
  try {
    // Hent data fra AsyncStorage
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    
    // Hvis data eksisterer, parse JSON og returner
    if (data) {
      return JSON.parse(data);
    }
    
    // Hvis ingen data, returner tomt objekt
    return {};
  } catch (error) {
    console.error('Error loading library:', error);
    return {};
  }
};

// Funksjon for å lagre biblioteket til AsyncStorage
export const saveLibrary = async (library: MangaLibrary): Promise<void> => {
  try {
    // Konverter library objekt til JSON string og lagre
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(library));
  } catch (error) {
    console.error('Error saving library:', error);
  }
};