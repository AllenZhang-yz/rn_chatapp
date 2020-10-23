import firebase from '../firebase/config';

export const signUpRequest = async (value: {
  email: string;
  password: string;
}) => {
  return await firebase
    .auth()
    .createUserWithEmailAndPassword(value.email, value.password);
};
