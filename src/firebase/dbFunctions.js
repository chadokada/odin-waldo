import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config';
import { getFirestore, collection, doc, getDoc, query } from 'firebase/firestore';

const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);
const db = getFirestore(firebaseApp);

export async function getXY (character) {
  const docRef = doc(db, 'ps4', character);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()){
    const charCoords = docSnap.data();
    return charCoords;

  } else {
    console.log('No such doc')
  }
}

