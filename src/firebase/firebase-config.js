const config = {
  apiKey: "AIzaSyBVdQri_y4f7HUp7pzhtZ6tn9FHBAQceog",
  authDomain: "odin-waldo-65bf0.firebaseapp.com",
  projectId: "odin-waldo-65bf0",
  storageBucket: "odin-waldo-65bf0.appspot.com",
  messagingSenderId: "20029600618",
  appId: "1:20029600618:web:ef2caf0eecbd8bd2aaab13"
};

export function getFirebaseConfig() {
 if (!config || !config.apiKey) {
   throw new Error('No Firebase configuration object provided.' + '\n' +
   'Add your web app\'s configuration object to firebase-config.js');
 } else {
   return config;
 }
}