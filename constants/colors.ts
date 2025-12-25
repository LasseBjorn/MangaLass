// Alle farger samlet på ett sted - gjør det lett å endre fargetema senere
export const colors = {
  // Bakgrunnsfarger
  background: '#121212',    // Hovedbakgrunn (mørkeste)
  surface: '#1a1a1a',      // Litt lysere bakgrunn (header, filter tabs)
  card: '#1e1e1e',         // Bakgrunn for kort
  border: '#2a2a2a',       // Border farger
  
  // Tekstfarger
  text: '#ffffff',          // Hvit tekst (hovedtekst)
  textSecondary: '#b0b0b0', // Grå tekst (sekundær info)
  textTertiary: '#666',     // Mørkere grå (minst viktig tekst)
  
  // Funksjonsfarger
  primary: '#2196F3',       // Blå (Reading status, knapper)
  success: '#4CAF50',       // Grønn (Completed status)
  error: '#F44336',         // Rød (Dropped status, delete)
  
  // Input farger
  inputBg: '#252525',       // Bakgrunn for input felt
  inputBorder: '#3a3a3a',   // Border for input felt
};

// Funksjon som returnerer riktig farge basert på manga status
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Completed':
      return colors.success;  // Grønn
    case 'Dropped':
      return colors.error;    // Rød
    default:
      return colors.primary;  // Blå (Reading)
  }
};