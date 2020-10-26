import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Thumbnail} from 'native-base';
import {useRoute, RouteProp} from '@react-navigation/native';
import {StackParamList} from '../navigation/Navigation';
import userLogo from '../utility/images/userlogo.png';

const UserProfile = () => {
  const route = useRoute<RouteProp<StackParamList, 'UserProfile'>>();
  const {profileName, profileImg} = route.params;
  return (
    <>
      {profileImg ? (
        <View>
          <Thumbnail
            style={styles.image}
            source={{uri: profileImg}}
            resizeMode="cover"
          />
          <Text style={styles.text}>{profileName}</Text>
        </View>
      ) : (
        <View>
          <Thumbnail
            style={styles.image}
            source={userLogo}
            resizeMode="cover"
          />
          <Text style={styles.text}>{profileName}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginLeft: 100,
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserProfile;
