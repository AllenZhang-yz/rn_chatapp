import firebase from '../firebase/config';

export const addUser = async (values: {
  name: string;
  email: string;
  uid: string;
  userImg: string;
}) => {
  return await firebase.database().ref(`users/${values.uid}`).set(values);
};

export const updateUser = async (uid: string, imgUrl: string) => {
  return await firebase
    .database()
    .ref(`users/${uid}`)
    .update({userImg: imgUrl});
};
