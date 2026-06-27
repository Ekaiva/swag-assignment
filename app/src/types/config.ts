export interface FirebaseConfig {
  apiKey: string;
  projectId: string;
  appId: string;
  messagingSenderId: string;
  storageBucket: string;
}

export interface AppExtra {
  firebase: FirebaseConfig;
  easProjectId: string;
  adminApiUrl: string;
  logoUrl: string;
}
