import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDHXC59-mN3xZS82UgQiE4iG1zlbrCgJm0",
    authDomain: "newinternapp.firebaseapp.com",
    projectId: "newinternapp",
    storageBucket: "newinternapp.appspot.com",
    messagingSenderId: "995629657536",
    appId: "1:995629657536:web:7147e4f6b6caa855d6ac25",
    measurementId: "G-3THZBGPEZW"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // auth exports
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  
  // firestore export
  export const firestore = firebase.firestore();
  export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
  export const fromMillis = firebase.firestore.Timestamp.fromMillis;
  export const increment = firebase.firestore.FieldValue.increment;
  
  // storage exports
  export const storage = firebase.storage();
  export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
  
  /// helper functions
  
  /**`
   * Gets a users/{uid} document with username
   * @param  {string} username
   */
  export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
  }
  
  /**`
   * converts a firestore document to JSON
   * @param  {DocumentSnapshot} doc
   */
  export function postToJSON(doc) {
    const data = doc.data();
    return {
      ...data,
      // firestore timestamp NOT serializable to JSON. Must convert to milliseconds
      createdAt: data?.createdAt.toMillis() || 0,
      updatedAt: data?.updatedAt.toMillis() || 0,
    };
  }