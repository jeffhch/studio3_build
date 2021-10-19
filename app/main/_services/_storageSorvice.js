import firestore from '@react-native-firebase/firestore';
import {Actions, Collections} from '../../Constants';

const usersCollection = Collections.USERS;

const postsCollection = Collections.POSTS

function updateUserData(docId) {
  return firestore()
    .collection(usersCollection)
    .doc(docId)
    .update({
      uqCoins: firestore.FieldValue.increment(6),
    });
}

function addUserData(email, username) {
  return firestore().collection(usersCollection).add({
    username,
    email,
    uqCoins: 0,
  });
}

export function storeUserDataToFireStore(
  docId,
  action,
  email,
  username,
) {
  switch (action) {
    case Actions.ADD:
      return addUserData(email, username);

    case Actions.UPDATE:
      return updateUserData(docId);

    default:
      return addUserData(email, username);
  }
}

export function getStoredUserDataFromFireStore(email) {
  return firestore().collection('users').where('email', '==', email).get();
}

export function getAllStoredPostsFromFirestore() {
  return firestore().collection(postsCollection).get();
}

export function storeNewPostToFirebase(postToStore) {
  return firestore().collection(postsCollection).add(postToStore);
}

export function updateCommentsOnPost(postId, postData) {
  return firestore()
    .doc(`posts/${postId}`)
    .update({
      comments: firestore.FieldValue.arrayUnion({...postData}),
    });
}

export function listenToActiveStorage(onResult) {
  firestore()
    .collection(postsCollection)
    .onSnapshot(onResult, err => console.log(err));
}

export function listenToActiveUsersStorage(onResult, userEmail) {
  firestore()
    .collection(usersCollection)
    .where('email', '==', userEmail)
    .onSnapshot(onResult, err => console.log(err));
}
