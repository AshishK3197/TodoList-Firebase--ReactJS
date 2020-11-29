// const firebaseConfig = {

// };

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAJmCU0GbDKJWwct9aFneTQMePKDDRkq98",
	authDomain: "todolist-react-7f9cf.firebaseapp.com",
	databaseURL: "https://todolist-react-7f9cf.firebaseio.com",
	projectId: "todolist-react-7f9cf",
	storageBucket: "todolist-react-7f9cf.appspot.com",
	messagingSenderId: "963060270316",
	appId: "1:963060270316:web:1eed98b7d3939ae80651c9",
});

const db = firebaseApp.firestore();

export default db;
//can also be written as export {db};
