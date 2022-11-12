import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  getDocs, 
  arrayUnion, 
  query,
} from 'firebase/firestore';

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
  };
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
};

const queryBestTimes = async (game) => {
  const q = query(collection(db,`${game}-best-times`));

  const querySnapshot = await getDocs(q);
  const bestTimes = {};

  querySnapshot.forEach((doc) => {
    bestTimes[parseInt(doc.id)] = doc.data().players;
  });

  return bestTimes;
};

const sortIntegerKeys = (keys) => {
  const intKeys = keys.map((a) => {return(parseInt(a))});
  const sortedKeys = intKeys.sort(function(a, b){
    return a - b;
  });

  return sortedKeys.map((key) => {return(key.toString())});
};

export const getBestTimes = async (game) => {
  const bestTimes = await queryBestTimes(game);
  const keys = sortIntegerKeys(Object.keys(bestTimes));
  const sortedBestTimes = [];

  for (const key of keys) {
    const players = bestTimes[key];
    
    for (const player of players) {
      sortedBestTimes.push([key, player]);
    }
  };

  return sortedBestTimes;
};

export const addCompletionTime = async (game, playerName, time) => {
  const bestTimeRef = doc(db, `${game}-best-times`, `${time}`);

  try {
    await setDoc(bestTimeRef, {
      players : arrayUnion(playerName)
    }, {merge: true})
  } 
  catch (error) {
    console.error('There was an error: ', error)
  };
};