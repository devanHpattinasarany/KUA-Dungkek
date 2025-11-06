// Formspree Configuration
export const FORMSPREE_CONFIG = {
  // Anda perlu mendaftar di https://formspree.io untuk mendapatkan endpoint
  // Setelah mendaftar, ganti 'your-form-id' dengan ID form Anda
  // Contoh: 'https://formspree.io/f/xyz123'
  endpoint: 'https://formspree.io/f/xaypvlqo', // Ganti dengan endpoint Anda

  // Form configuration
  config: {
    headers: {
      'Accept': 'application/json'
    }
  }
};

export default FORMSPREE_CONFIG;