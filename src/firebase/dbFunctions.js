import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config';
import { getFirestore, collection, doc, getDoc, setDoc, getDocs, arrayUnion } from 'firebase/firestore';

const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);
const db = getFirestore(firebaseApp);

export async function getCharCoords (selectedGame, character) {
  const docRef = doc(db, selectedGame , character);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()){
    const charCoords = docSnap.data();
    return charCoords;

  } else {
    console.log('No such doc')
  }
}

export const characterSelected = async (selectedGame, character, targetX, targetY) => {
  const charCoords = await getCharCoords(selectedGame, character);

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


export const getBestTimes = async (game) => {
  const querySnapshot = await getDocs(collection(db,`${game}-best-times`))
  const bestTimes = [];

  querySnapshot.forEach((doc) => {
    doc.data().players.forEach((player) => {
      bestTimes.push([doc.id, player])
    })
  })
 
  return bestTimes;
}

export const addCompletionTime = async (game, playerName, time) => {
  const bestTimeRef = doc(db, `${game}-best-times`, `${time}`);

  try {
    await setDoc(bestTimeRef, {
      players : arrayUnion(playerName)
    }, {merge: true})
    
  } 
  catch (error) {
    console.error('There was an error: ', error)
  }
}

