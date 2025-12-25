export const colors = {
  background: '#121212',
  surface: '#1a1a1a',
  card: '#1e1e1e',
  border: '#2a2a2a',
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  textTertiary: '#666',
  primary: '#2196F3',
  success: '#4CAF50',
  error: '#F44336',
  inputBg: '#252525',
  inputBorder: '#3a3a3a',
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Completed':
      return colors.success;
    case 'Dropped':
      return colors.error;
    default:
      return colors.primary;
  }
};