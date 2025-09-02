// Environment configuration with fallbacks
export const config = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-key',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || 'demo-app-id',
  },
  google: {
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY || 'demo-key',
    authClientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID || 'demo-client-id',
  },
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || 'demo-key',
  }
};
