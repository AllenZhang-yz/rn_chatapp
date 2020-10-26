import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {StackParamList} from '../navigation/Navigation';
import MessageInput from '../components/MessageInput';
import firebase from '../firebase/config';
import ChatMessages from '../components/ChatMessages';
import {sendMessages, receiveMessages} from '../messages/sendMessages';
import {useMutation} from 'react-query';

interface IMsg {
  sender: string;
  receiver: string;
  msg: string;
  img: string;
}

const ChatRoom = () => {
  const route = useRoute<RouteProp<StackParamList, 'ChatRoom'>>();
  const {guestImg, guestUserId, currentUserId, currentUserName} = route.params;
  const [msgValue, setMsgValue] = useState('');
  const [messages, setMessages] = useState<IMsg[]>([]);

  useEffect(() => {
    try {
      firebase
        .database()
        .ref('messages')
        .child(currentUserId)
        .child(guestUserId)
        .on('value', (msgData) => {
          let msgs: IMsg[] = [];
          msgData.forEach((child) => {
            msgs.push({
              sender: child.val().message.sender,
              receiver: child.val().message.receiver,
              msg: child.val().message.msg,
              img: child.val().message.img,
            });
          });
          setMessages(msgs.reverse());
        });
    } catch (error) {
      console.log(error.message);
    }
  }, [currentUserId, guestUserId]);

  const [sendMessageMutate, {}] = useMutation(sendMessages, {
    onError: (error: any) => {
      Alert.alert(error.message);
    },
  });
  const [receiveMessageMutate, {}] = useMutation(receiveMessages, {
    onError: (error: any) => {
      Alert.alert(error.message);
    },
  });

  const handleSend = async () => {
    //store messages based on userID
    setMsgValue('');
    if (msgValue) {
      await sendMessageMutate({
        msgValue,
        currentUserId,
        guestUserId,
        img: guestImg,
      });
      await receiveMessageMutate({
        msgValue,
        currentUserId,
        guestUserId,
        img: guestImg,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.touchableWithoutFeedback}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={95}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <FlatList
            inverted
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <ChatMessages
                msg={item.msg}
                userId={item.sender}
                img={item.img}
                currentUserName={currentUserName}
              />
            )}
          />
          <View style={styles.msgContainer}>
            <MessageInput
              placeholder="Please type the message..."
              value={msgValue}
              onChangeText={(value) => setMsgValue(value)}
            />
            <View style={styles.btnContainer}>
              <Button title="Send" onPress={() => handleSend()} />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.7,
  },
  touchableWithoutFeedback: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingRight: 30,
    marginHorizontal: 5,
  },
  btnContainer: {
    marginLeft: Platform.OS === 'android' ? 10 : 5,
  },
});

export default ChatRoom;
