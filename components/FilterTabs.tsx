import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FilterTab as FilterTabType } from '../types/manga';
import { colors } from '../constants/colors';

// Props for FilterTabs komponenten
interface FilterTabsProps {
  activeFilter: FilterTabType;                      // Hvilket filter som er aktivt nå
  onFilterChange: (filter: FilterTabType) => void;  // Funksjon som kalles når filter endres
}

// Komponent som viser filter tabs (All, Reading, Completed, Dropped)
export const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  // Array med alle tilgjengelige filter tabs
  const tabs: FilterTabType[] = ['All', 'Reading', 'Completed', 'Dropped'];

  return (
    <View style={styles.filterContainer}>
      {/* Loop gjennom alle tabs og vis dem */}
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.filterTab,
            // Legg til active style hvis denne tab er aktiv
            activeFilter === tab && styles.filterTabActive,
          ]}
          onPress={() => onFilterChange(tab)}
        >
          <Text
            style={[
              styles.filterTabText,
              // Legg til active text style hvis denne tab er aktiv
              activeFilter === tab && styles.filterTabTextActive,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',  // Tabs ved siden av hverandre
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,  // Avstand mellom tabs
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,  // Avrundede hjørner
    backgroundColor: colors.inputBg,
  },
  filterTabActive: {
    backgroundColor: colors.primary,  // Blå bakgrunn når aktiv
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,  // Grå tekst når inaktiv
  },
  filterTabTextActive: {
    color: colors.text,  // Hvit tekst når aktiv
  },
});