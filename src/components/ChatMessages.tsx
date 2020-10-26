/* eslint-disable react-native/no-inline-styles */
import {Card} from 'native-base';
import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {uid} from '../utility/constants/const';
import {deviceWidth} from '../utility/styles/appStyle';
import userLogo from '../utility/images/userlogo.png';

interface IChatMessages {
  userId: string;
  msg: string;
  img: string;
  currentUserName: string;
}

const ChatMessages: FC<IChatMessages> = ({userId, msg, img}) => {
  let isCurrentUser = userId === uid ? true : false;
  return (
    <Card
      transparent
      style={{
        ...styles.card,
        alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
      }}>
      <View style={{flexDirection: isCurrentUser ? 'row-reverse' : 'row'}}>
        <View style={styles.imgContainer}>
          {img ? (
            <Image source={{uri: img}} resizeMode="cover" style={styles.img} />
          ) : (
            <Image source={userLogo} resizeMode="cover" style={styles.img} />
          )}
        </View>
        <View
          style={{
            ...styles.chatMsg,
            backgroundColor: isCurrentUser ? '#13cf6a' : '#03adfc',
          }}>
          <Text style={styles.chatMsgText}>{msg}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  chatMsg: {
    marginVertical: 5,
    padding: 8,
    borderRadius: 5,
  },
  chatMsgText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  card: {
    maxWidth: deviceWidth / 2 + 10,
  },
  imgContainer: {
    marginHorizontal: 5,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

export default ChatMessages;
