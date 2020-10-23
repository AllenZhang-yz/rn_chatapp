import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem, Left, Body, Thumbnail, Text} from 'native-base';
import {IUser} from '../screens/Dashboard';
import userLogo from '../utility/images/userlogo.png';

interface IShowUsers {
  user: IUser;
  onImgTap: () => void;
  onNameTap: () => void;
}

const ShowUsers: FC<IShowUsers> = ({user, onImgTap, onNameTap}) => {
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
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 18,
    marginTop: 18,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#7e72ed',
    marginHorizontal: 5,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShowUsers;
