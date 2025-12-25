import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Manga } from '../types/manga';
import { colors, getStatusColor } from '../constants/colors';

// Props som MangaCard komponenten forventer
interface MangaCardProps {
  item: Manga;           // Manga objektet som skal vises
  onPress: () => void;   // Funksjon som kalles når kortet trykkes
  onDelete: () => void;  // Funksjon som kalles når delete knapp trykkes
}

// Komponent som viser ett manga kort
export const MangaCard: React.FC<MangaCardProps> = ({ item, onPress, onDelete }) => {
  return (
    // Hele kortet er klikkbart - åpner edit modal
    <TouchableOpacity style={styles.mangaCard} onPress={onPress}>
      {/* Venstre side: Manga info */}
      <View style={styles.mangaInfo}>
        {/* Tittel */}
        <Text style={styles.mangaTitle}>{item.title}</Text>
        
        {/* Chapter og status badge */}
        <View style={styles.mangaDetails}>
          <Text style={styles.chapterText}>Chapter {item.current_chapter}</Text>
          
          {/* Status badge med dynamisk farge */}
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
      
      {/* Høyre side: Delete knapp */}
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mangaCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',        // Layout: venstre (info) + høyre (delete)
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  mangaInfo: {
    flex: 1,  // Ta opp all tilgjengelig plass til venstre
  },
  mangaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  mangaDetails: {
    flexDirection: 'row',  // Chapter og status ved siden av hverandre
    alignItems: 'center',
    gap: 12,
  },
  chapterText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    // backgroundColor settes dynamisk basert på status
  },
  statusText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,  // Sirkulær knapp
    backgroundColor: '#2a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.error,
    fontSize: 18,
    fontWeight: 'bold',
  },
});