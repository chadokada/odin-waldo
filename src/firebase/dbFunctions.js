import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config';
import { getFirestore, collection, doc, getDoc, query } from 'firebase/firestore';

const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);
const db = getFirestore(firebaseApp);

export async function getCharCoords (character) {
  const docRef = doc(db, 'ps4', character);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()){
    const charCoords = docSnap.data();
    return charCoords;

  } else {
    console.log('No such doc')
  }
}

export const characterSelected = async (character, targetX, targetY) => {
  const charCoords = await getCharCoords(character);
  const xMin = charCoords['x-min']
  const xMax = charCoords['x-max']
  const yMin = charCoords['y-min']
  const yMax = charCoords['y-max']

  if(xMin <= targetX && xMax >= targetX && yMin <= targetY && yMax >= targetY){
    return true;
  } else {
    return false;
  }
}

