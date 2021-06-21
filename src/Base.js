import  * as firebase from "firebase/app";
import "firebase/auth";

const  app = firebase.initializeApp({
    apiKey: "AIzaSyBaWA3sEwVT7BGZetA3IPy934nlobWG-lI",
    authDomain: "discogsapi-892b3.firebaseapp.com",
    projectId: "discogsapi-892b3",
    storageBucket: "discogsapi-892b3.appspot.com",
    messagingSenderId: "214584360517",
    appId: "1:214584360517:web:793d29443ecbb9f5dead2c",
    measurementId: "G-W89GR85CBS"
});

export default app;