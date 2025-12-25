import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar,
} from 'react-native';
import { MangaLibrary, MangaStatus, FilterTab, Manga } from './types/manga';
import { loadLibrary, saveLibrary } from './utils/storage';
import { MangaCard } from './components/MangaCard';
import { FilterTabs } from './components/FilterTabs';
import { AddMangaModal } from './components/AddMangaModal';
import { EditMangaModal } from './components/EditMangaModal';
import { colors } from './constants/colors';

export default function App() {
  // State for manga biblioteket
  const [library, setLibrary] = useState<MangaLibrary>({});
  
  // State for modals
  const [modalVisible, setModalVisible] = useState(false);        // Add modal
  const [editModalVisible, setEditModalVisible] = useState(false); // Edit modal
  const [selectedManga, setSelectedManga] = useState<string | null>(null);  // Hvilken manga som redigeres
  
  // State for filter
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  
  // Form state (brukes i begge modals)
  const [newTitle, setNewTitle] = useState('');
  const [newChapter, setNewChapter] = useState('0');
  const [newStatus, setNewStatus] = useState<MangaStatus>('Reading');

  // Last inn biblioteket når appen starter
  useEffect(() => {
    loadLibraryData();
  }, []);

  // Funksjon for å laste biblioteket fra AsyncStorage
  const loadLibraryData = async () => {
    const data = await loadLibrary();
    setLibrary(data);
  };

  // Funksjon for å oppdatere biblioteket (både state og AsyncStorage)
  const updateLibrary = async (newLibrary: MangaLibrary) => {
    await saveLibrary(newLibrary);  // Lagre til AsyncStorage
    setLibrary(newLibrary);         // Oppdater state
  };

  // Legg til ny manga
  const addManga = () => {
    // Validering: Sjekk at tittel ikke er tom
    if (!newTitle.trim()) {
      Alert.alert('Error', 'Please enter a manga title');
      return;
    }

    // Opprett nytt library objekt med den nye mangaen
    const updatedLibrary: MangaLibrary = {
      ...library,
      [newTitle]: {
        current_chapter: parseInt(newChapter) || 0,
        status: newStatus,
        last_read: Date.now(),  // Sett timestamp
      },
    };

    // Lagre og reset form
    updateLibrary(updatedLibrary);
    setNewTitle('');
    setNewChapter('0');
    setNewStatus('Reading');
    setModalVisible(false);
  };

  // Åpne edit modal for en spesifikk manga
  const openEditModal = (title: string) => {
    setSelectedManga(title);
    // Fyll ut form med eksisterende data
    setNewChapter(library[title].current_chapter.toString());
    setNewStatus(library[title].status);
    setEditModalVisible(true);
  };

  // Lagre endringer fra edit modal
  const saveEdit = () => {
    if (selectedManga) {
      const updatedLibrary: MangaLibrary = {
        ...library,
        [selectedManga]: {
          current_chapter: parseInt(newChapter) || 0,
          status: newStatus,
          last_read: Date.now(),  // Oppdater timestamp
        },
      };
      updateLibrary(updatedLibrary);
      setEditModalVisible(false);
      setSelectedManga(null);
    }
  };

  // Slett manga (med bekreftelse)
  const removeManga = (title: string) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to remove "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedLibrary = { ...library };
            delete updatedLibrary[title];  // Fjern fra biblioteket
            updateLibrary(updatedLibrary);
          },
        },
      ]
    );
  };

  // Filtrer og sorter manga listen
  const getFilteredMangaList = (): Manga[] => {
    // Konverter library objekt til array
    let mangaArray = Object.entries(library).map(([title, data]) => ({
      title,
      ...data,
    }));

    // Filtrer basert på aktiv tab (All viser alt)
    if (activeFilter !== 'All') {
      mangaArray = mangaArray.filter(manga => manga.status === activeFilter);
    }

    // Sorter etter sist lest (nyeste først)
    mangaArray.sort((a, b) => {
      const aTime = a.last_read || 0;
      const bTime = b.last_read || 0;
      return bTime - aTime;  // Nyeste først
    });

    return mangaArray;
  };

  const mangaList = getFilteredMangaList();

  return (
    <View style={styles.container}>
      {/* Status bar (klokke, batteri, etc) */}
      <StatusBar barStyle="light-content" backgroundColor={colors.surface} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header med tittel og Add knapp */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📚 Manga Library</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {/* Filter tabs (All, Reading, Completed, Dropped) */}
        <FilterTabs 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />

        {/* Vis enten tom state eller manga liste */}
        {mangaList.length === 0 ? (
          // Tom state - vis melding
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {activeFilter === 'All' 
                ? 'No manga in library yet!' 
                : `No ${activeFilter.toLowerCase()} manga`}
            </Text>
            <Text style={styles.emptySubtext}>
              {activeFilter === 'All' ? 'Tap "Add" to get started' : 'Try a different filter'}
            </Text>
          </View>
        ) : (
          // Manga liste - vis alle kort
          <FlatList
            data={mangaList}
            renderItem={({ item }) => (
              <MangaCard
                item={item}
                onPress={() => openEditModal(item.title)}
                onDelete={() => removeManga(item.title)}
              />
            )}
            keyExtractor={(item) => item.title}
            contentContainerStyle={styles.listContainer}
          />
        )}

        {/* Add manga modal */}
        <AddMangaModal
          visible={modalVisible}
          title={newTitle}
          chapter={newChapter}
          status={newStatus}
          onTitleChange={setNewTitle}
          onChapterChange={setNewChapter}
          onStatusChange={setNewStatus}
          onAdd={addManga}
          onCancel={() => {
            setModalVisible(false);
            // Reset form når modal lukkes
            setNewTitle('');
            setNewChapter('0');
            setNewStatus('Reading');
          }}
        />

        {/* Edit manga modal */}
        <EditMangaModal
          visible={editModalVisible}
          mangaTitle={selectedManga}
          chapter={newChapter}
          status={newStatus}
          onChapterChange={setNewChapter}
          onStatusChange={setNewStatus}
          onSave={saveEdit}
          onCancel={() => setEditModalVisible(false)}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    paddingTop: 40,  // Manuell padding for status bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 40,  // Ekstra padding på bunn for Android nav knapper
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: colors.textTertiary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textTertiary,
  },
});