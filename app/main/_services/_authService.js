import auth from '@react-native-firebase/auth';

export const attemptLogin = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const attemptToRegister = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const getCurrentAuthUser = () =>{
  return auth().currentUser;
}
export const attemptSignOut = () => auth().signOut();
