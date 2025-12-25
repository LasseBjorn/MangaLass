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
  const [library, setLibrary] = useState<MangaLibrary>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedManga, setSelectedManga] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  
  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newChapter, setNewChapter] = useState('0');
  const [newStatus, setNewStatus] = useState<MangaStatus>('Reading');

  useEffect(() => {
    loadLibraryData();
  }, []);

  const loadLibraryData = async () => {
    const data = await loadLibrary();
    setLibrary(data);
  };

  const updateLibrary = async (newLibrary: MangaLibrary) => {
    await saveLibrary(newLibrary);
    setLibrary(newLibrary);
  };

  const addManga = () => {
    if (!newTitle.trim()) {
      Alert.alert('Error', 'Please enter a manga title');
      return;
    }

    const updatedLibrary: MangaLibrary = {
      ...library,
      [newTitle]: {
        current_chapter: parseInt(newChapter) || 0,
        status: newStatus,
        last_read: Date.now(),
      },
    };

    updateLibrary(updatedLibrary);
    setNewTitle('');
    setNewChapter('0');
    setNewStatus('Reading');
    setModalVisible(false);
  };

  const openEditModal = (title: string) => {
    setSelectedManga(title);
    setNewChapter(library[title].current_chapter.toString());
    setNewStatus(library[title].status);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (selectedManga) {
      const updatedLibrary: MangaLibrary = {
        ...library,
        [selectedManga]: {
          current_chapter: parseInt(newChapter) || 0,
          status: newStatus,
          last_read: Date.now(),
        },
      };
      updateLibrary(updatedLibrary);
      setEditModalVisible(false);
      setSelectedManga(null);
    }
  };

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
            delete updatedLibrary[title];
            updateLibrary(updatedLibrary);
          },
        },
      ]
    );
  };

  const getFilteredMangaList = (): Manga[] => {
    let mangaArray = Object.entries(library).map(([title, data]) => ({
      title,
      ...data,
    }));

    if (activeFilter !== 'All') {
      mangaArray = mangaArray.filter(manga => manga.status === activeFilter);
    }

    mangaArray.sort((a, b) => {
      const aTime = a.last_read || 0;
      const bTime = b.last_read || 0;
      return bTime - aTime;
    });

    return mangaArray;
  };

  const mangaList = getFilteredMangaList();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.surface} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📚 Manga Library</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <FilterTabs 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />

        {mangaList.length === 0 ? (
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
            setNewTitle('');
            setNewChapter('0');
            setNewStatus('Reading');
          }}
        />

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
    paddingTop: 40,
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
    paddingBottom: 40,
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