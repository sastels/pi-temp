import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"
import moment from "moment";

const config = {
  apiKey: "AIzaSyDeHDbW7w5nakk2Re093Dl2LeSMyeF_3q4",
  authDomain: "pi-temperature-monitor.firebaseapp.com",
  databaseURL: "https://pi-temperature-monitor.firebaseio.com",
  projectId: "pi-temperature-monitor",
  storageBucket: "pi-temperature-monitor.appspot.com",
  messagingSenderId: "1090122501990"
};

firebase.initializeApp(config)
firebase.firestore().enablePersistence()
  .catch(function(err) {
    if (err.code === 'failed-precondition') {
      console.log("Multiple tabs open, persistence can only be enabled in one tab at a a time.")
    } else if (err.code === 'unimplemented') {
      console.log("The current browser does not support all of the features required to enable persistence")
    }
  });

export const signIn = onSignIn => {
  firebase
    .auth()
    .signInAnonymously()
    .catch(function(error) {
      console.log(`ERROR ${error.code}: ${error.message}`);
    });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var isAnonymous = user.isAnonymous;
      console.log(`signed in: ${user.uid}  isAnonymous: ${isAnonymous}`);
      if (onSignIn) {
        onSignIn();
      }
    } else {
      console.log("Signed out");
    }
  });
};

export const loadData = (id, setState) => {
  let data = [];
  var firebaseData = firebase.firestore().collection(id);
  firebaseData
    .onSnapshot(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach(doc => {
        const datetime = moment(doc.data().datetime.toDate());
        const pi_id = doc.data().pi_id;
        const temperature = doc.data().temperature
        const humidity = doc.data().humidity
        data.push({ pi_id, datetime, temperature, humidity});
      });
      setState({ id, data });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};
