import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config';
import { getFirestore, collection, doc, getDoc, updateDoc, query, addDoc, setDoc, getDocs, arrayUnion } from 'firebase/firestore';

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
  ///const bestTimes = {};
  const bestTimes = [];

  querySnapshot.forEach((doc) => {
    //bestTimes[doc.id] = doc.data().players
    doc.data().players.forEach((player) => {
      bestTimes.push([doc.id, player])
    })
  })
 
  //return querySnapshot;
  return bestTimes;
}


export const test = async () => {
  /*
  const querySnapshot = await getDocs(collection(db,"ps2-best-times"))
  
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data().players)
  })
  */
  /*
  console.log(querySnapshot.docs[0].id)
  console.log(querySnapshot.docs[0].data())
  console.log("///////////////////////")
  */
  
  const bestTimes = await getBestTimes('ps2');
  //console.log(bestTimes)

}


export const addCompletionTime = async (game, playerName, time) => {
  const bestTimeDoc = doc(db, `${game}-best-times`, `${time}`);

  try {
    await setDoc(bestTimeDoc, {
      players : arrayUnion(playerName)
    }, {merge: true})
    
    //await setDoc(doc(bestTimesRef, playerName))

  } 
  catch (error) {
    console.error('There was an error: ', error)
  }
}

