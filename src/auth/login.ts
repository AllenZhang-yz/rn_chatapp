import firebase from '../firebase/config';

export const loginRequest = async (value: {
  email: string;
  password: string;
}) => {
  return await firebase
    .auth()
    .signInWithEmailAndPassword(value.email, value.password);
};
