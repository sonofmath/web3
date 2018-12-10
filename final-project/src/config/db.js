import Firebase from 'firebase'
 let config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY2,
    authDomain: process.env.VUE_APP_FIREBASE_PROJECT_ID2 + ".firebaseapp.com",
    databaseURL: "https://"+ process.env.VUE_APP_FIREBASE_PROJECT_ID2 + ".firebaseio.com",
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID2,
    storageBucket: process.env.VUE_APP_FIREBASE_PROJECT_ID2 + ".appspot.com"
  };
let app = Firebase.initializeApp(config)
export const db = app.database()