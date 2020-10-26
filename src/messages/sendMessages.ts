import {Alert} from 'react-native';
import firebase from '../firebase/config';

export const sendMessages = async (value: {
  msgValue: string;
  currentUserId: string;
  guestUserId: string;
  img: string;
}) => {
  const {msgValue, currentUserId, guestUserId, img} = value;
  try {
    return await firebase
      .database()
      .ref(`messages/${currentUserId}`)
      .child(guestUserId)
      .push({
        message: {
          sender: currentUserId,
          receiver: guestUserId,
          msg: msgValue,
          img,
        },
      });
  } catch (err) {
    console.log(err.message);
    Alert.alert(err.message);
  }
};

export const receiveMessages = async (value: {
  msgValue: string;
  currentUserId: string;
  guestUserId: string;
  img: string;
}) => {
  const {msgValue, currentUserId, guestUserId, img} = value;
  try {
    return await firebase
      .database()
      .ref(`messages/${guestUserId}`)
      .child(currentUserId)
      .push({
        message: {
          sender: currentUserId,
          receiver: guestUserId,
          msg: msgValue,
          img,
        },
      });
  } catch (err) {
    console.log(err.message);
    Alert.alert(err.message);
  }
};
