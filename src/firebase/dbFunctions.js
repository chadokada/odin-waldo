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


export const test = async () => {
  /* Loops through best scores
  const querySnapshot = await getDocs(collection(db,"ps2-best-times"))
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data().players)
    console.log("///////////////////////")
  })
  */

  const querySnapshot = await getDocs(collection(db,"ps2-best-times"))

  console.log(querySnapshot.select())

  /* Updates fields in existing document
  const ps2Ref = doc(db, 'ps2-best-times', '1000')

  await updateDoc(ps2Ref, {
    players: arrayUnion('Joe Fucc')
  })
  */
}



export const addCompletionTime = async (game, playerName, time) => {
  //const bestTimesRef = collection(db, 'best-times');
  //const bestTimesRef = doc(db, 'best-times', game);

  //const playerDataString = `{"${playerName}":[${time}]}`
  //const playerData = JSON.parse(playerDataString)

  const bestTimesRef = collection(db, `${game}-best-times`);


  try {
    //await setDoc(bestTimesRef, playerData, {merge: true})
    
    //await setDoc(doc(bestTimesRef, playerName))

  } 
  catch (error) {
    console.error('There was an error: ', error)
  }
}

