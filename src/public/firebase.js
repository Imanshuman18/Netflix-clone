import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAZ_46zPMYd2Le-XmTvfl6S1DEyP8KnOFY",
    authDomain: "netflix-clone-9ef80.firebaseapp.com",
    projectId: "netflix-clone-9ef80",
    storageBucket: "netflix-clone-9ef80.appspot.com",
    messagingSenderId: "993264315640",
    appId: "1:993264315640:web:d8b549cdaf2dca52195f0d",
    measurementId: "G-XNL5PZ44V9"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth =firebase.auth()

  export {auth}
  export default db;