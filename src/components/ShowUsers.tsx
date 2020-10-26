import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem, Left, Body, Thumbnail, Text, Right} from 'native-base';
import {IUser} from '../screens/Dashboard';
import userLogo from '../utility/images/userlogo.png';

interface IShowUsers {
  user: IUser;
  onImgTap: () => void;
  onNameTap: () => void;
  goToChatRoom: () => void;
}

const ShowUsers: FC<IShowUsers> = ({
  user,
  onImgTap,
  onNameTap,
  goToChatRoom,
}) => {
  return (
    <Card>
      <CardItem>
        <Left>
          <TouchableOpacity onPress={onImgTap}>
            {user.userImg ? (
              <Thumbnail source={{uri: user.userImg}} resizeMode="cover" />
            ) : (
              <Thumbnail source={userLogo} resizeMode="cover" />
            )}
          </TouchableOpacity>
          <Body>
            <Text onPress={onNameTap}>{user.name}</Text>
          </Body>
        </Left>
        <Right>
          <TouchableOpacity
            style={styles.chatTextContainer}
            onPress={goToChatRoom}
            activeOpacity={0.7}>
            <Text style={styles.chatText}>Chat</Text>
          </TouchableOpacity>
        </Right>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  chatTextContainer: {
    justifyContent: 'center',
    marginLeft: 80,
    paddingHorizontal: 18,
    paddingVertical: 15,
    backgroundColor: '#05a0e8',
    borderRadius: 8,
  },
  chatText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShowUsers;
