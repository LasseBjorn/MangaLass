import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Manga } from '../types/manga';
import { colors, getStatusColor } from '../constants/colors';

interface MangaCardProps {
  item: Manga;
  onPress: () => void;
  onDelete: () => void;
}

export const MangaCard: React.FC<MangaCardProps> = ({ item, onPress, onDelete }) => {
  return (
    <TouchableOpacity style={styles.mangaCard} onPress={onPress}>
      <View style={styles.mangaInfo}>
        <Text style={styles.mangaTitle}>{item.title}</Text>
        <View style={styles.mangaDetails}>
          <Text style={styles.chapterText}>Chapter {item.current_chapter}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  mangaInfo: {
    flex: 1,
  },
  mangaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  mangaDetails: {
    flexDirection: 'row',
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
  },
  statusText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
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