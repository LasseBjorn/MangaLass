import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { MangaStatus } from '../types/manga';
import { colors, getStatusColor } from '../constants/colors';

interface AddMangaModalProps {
  visible: boolean;
  title: string;
  chapter: string;
  status: MangaStatus;
  onTitleChange: (text: string) => void;
  onChapterChange: (text: string) => void;
  onStatusChange: (status: MangaStatus) => void;
  onAdd: () => void;
  onCancel: () => void;
}

export const AddMangaModal: React.FC<AddMangaModalProps> = ({
  visible,
  title,
  chapter,
  status,
  onTitleChange,
  onChapterChange,
  onStatusChange,
  onAdd,
  onCancel,
}) => {
  const StatusButton = ({ statusOption }: { statusOption: MangaStatus }) => (
    <TouchableOpacity
      style={[
        styles.statusButton,
        status === statusOption && styles.statusButtonActive,
        { borderColor: getStatusColor(statusOption) },
      ]}
      onPress={() => onStatusChange(statusOption)}
    >
      <Text
        style={[
          styles.statusButtonText,
          status === statusOption && { color: colors.text },
        ]}
      >
        {statusOption}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Manga</Text>

          <TextInput
            style={styles.input}
            placeholder="Manga title"
            placeholderTextColor="#999"
            value={title}
            onChangeText={onTitleChange}
          />

          <TextInput
            style={styles.input}
            placeholder="Current chapter"
            placeholderTextColor="#999"
            value={chapter}
            onChangeText={onChapterChange}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Status:</Text>
          <View style={styles.statusContainer}>
            <StatusButton statusOption="Reading" />
            <StatusButton statusOption="Completed" />
            <StatusButton statusOption="Dropped" />
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={onAdd}
            >
              <Text style={styles.saveButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: colors.inputBg,
    color: colors.text,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    backgroundColor: colors.inputBg,
  },
  statusButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.border,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
});