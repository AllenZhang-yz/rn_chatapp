import React, {FC} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import userLogo from '../utility/images/userlogo.png';

interface IProfile {
  img: string;
  name: string;
  onNameTap: () => void;
  onEditImgTap: () => void;
}

const Profile: FC<IProfile> = ({img, name, onEditImgTap, onNameTap}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onEditImgTap} activeOpacity={0.8}>
        {img ? (
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={{uri: img}} resizeMode="cover" />
          </View>
        ) : (
          <Image style={styles.userLogo} source={userLogo} resizeMode="cover" />
        )}
      </TouchableOpacity>
      <Text style={styles.text} onPress={onNameTap}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    height: 154,
    width: 154,
    borderRadius: 77,
    borderWidth: 4,
    borderColor: '#d9dbde',
    marginVertical: 10,
  },
  img: {
    height: 146,
    width: 146,
    borderRadius: 73,
  },
  userLogo: {
    height: 154,
    width: 154,
    borderRadius: 77,
    marginVertical: 10,
  },
  text: {
    marginLeft: 80,
    fontSize: 40,
  },
});

export default Profile;
