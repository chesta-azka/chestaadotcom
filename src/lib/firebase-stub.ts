// Zero-SDK stub for firebase/* imports (app, auth, firestore, storage)
// Ensures 0 bytes of Firebase client SDK and 0 network requests to *.googleapis.com

export const initializeApp = () => ({});
export const getApps = () => [{}];
export const getApp = () => ({});

export const getAuth = () => ({ currentUser: null });
export class GoogleAuthProvider {}
export const signInWithPopup = async () => ({ user: null });
export const signOut = async () => {};
export const onAuthStateChanged = (_auth: any, cb: (user: any) => void) => {
  cb(null);
  return () => {};
};
export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export const getFirestore = () => ({});
export const initializeFirestore = () => ({});
export const persistentLocalCache = () => ({});
export const persistentMultipleTabManager = () => ({});

export const collection = (_db?: any, ..._path: string[]) => ({});
export const doc = (_db?: any, ..._path: string[]) => ({ id: 'stub-doc' });
export const query = (..._args: any[]) => ({});
export const where = (..._args: any[]) => ({});
export const orderBy = (..._args: any[]) => ({});
export const limit = (_n: number) => ({});

export const getDoc = async (_ref?: any) => ({
  exists: () => false,
  data: () => ({} as any),
  id: 'stub-doc',
});
export const getDocs = async (_q?: any) => ({
  empty: true,
  size: 0,
  docs: [] as any[],
  forEach: (_cb: (d: any) => void) => {},
});
export const setDoc = async (..._args: any[]) => {};
export const addDoc = async (..._args: any[]) => ({ id: 'stub-doc' });
export const updateDoc = async (..._args: any[]) => {};
export const deleteDoc = async (..._args: any[]) => {};

export const onSnapshot = (_q: any, onNext?: any, _onError?: any) => {
  const cb = typeof onNext === 'function' ? onNext : onNext?.next;
  if (typeof cb === 'function') {
    Promise.resolve().then(() => {
      cb({
        exists: () => false,
        data: () => ({}),
        docs: [],
        size: 0,
        empty: true,
        forEach: () => {},
      });
    });
  }
  return () => {};
};

export const serverTimestamp = () => new Date().toISOString();
export const arrayUnion = (...items: any[]) => items;
export const increment = (n: number) => n;
export const Timestamp = {
  now: () => ({ toDate: () => new Date(), seconds: Math.floor(Date.now() / 1000) }),
  fromDate: (d: Date) => ({ toDate: () => d, seconds: Math.floor(d.getTime() / 1000) }),
};

export const getStorage = (..._args: any[]) => ({});
export const ref = (..._args: any[]) => ({});
export const uploadBytesResumable = (..._args: any[]) => ({
  on: (_event: string, _progress?: any, _error?: any, complete?: any) => {
    if (typeof complete === 'function') complete();
  },
  snapshot: { ref: {} },
});
export const getDownloadURL = async (..._args: any[]) => '';
