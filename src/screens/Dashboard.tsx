import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PERMISSIONS, request, RESULTS, check} from 'react-native-permissions';
import {IStackNavigation} from '../navigation/Navigation';
import firebase from '../firebase/config';
import {uid} from '../utility/constants/const';
import ShowUsers from '../components/ShowUsers';
import Profile from '../components/Profile';
import ImagePicker from 'react-native-image-picker';
import {updateUser} from '../auth';

export interface IUser {
  id: string;
  name: string;
  userImg: string;
}

const Dashboard = () => {
  const navigation = useNavigation<IStackNavigation>();
  const [userInfo, setUserInfo] = useState<IUser>({
    id: '',
    name: '',
    userImg: '',
  });
  const {userImg, name} = userInfo;
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const fetchAllUsers = () => {
    return firebase
      .database()
      .ref('users')
      .on('value', (allUsersInDb) => {
        let users: IUser[] = [];
        let currentUser: IUser = {
          id: '',
          name: '',
          userImg: '',
        };
        if (allUsersInDb) {
          allUsersInDb.forEach((user) => {
            if (uid === user.val().uid) {
              currentUser.id = uid;
              currentUser.name = user.val().name;
              currentUser.userImg = user.val().userImg;
            } else {
              users.push({
                id: user.val().uid,
                name: user.val().name,
                userImg: user.val().userImg,
              });
            }
          });
        }

        setUserInfo(currentUser);
        setAllUsers(users);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const selectPhotoTapped = async () => {
    if (Platform.OS === 'android') {
      const checkResult = await check(PERMISSIONS.ANDROID.CAMERA);
      if (checkResult) {
        const requestResult = await request(PERMISSIONS.ANDROID.CAMERA, {
          title: 'ChatApp Camera Permission',
          message: 'ChatApp needs access to your camera',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        console.log('requestResult', requestResult);
        if (requestResult === RESULTS.GRANTED) {
          ImagePicker.showImagePicker(
            {storageOptions: {skipBackup: true}},
            async (res) => {
              if (res.didCancel) {
                console.log('User canceled image picker');
              } else if (res.error) {
                console.log(res.error);
              } else {
                let src = `data:image/jpeg;base64,${res.data}`;
                await updateUser(uid, src);
                setUserInfo((prev) => ({...prev, userImg: src}));
              }
            },
          );
        } else {
          Alert.alert('Permission Denied');
        }
      }
    } else {
      const checkResult = await check(PERMISSIONS.IOS.CAMERA);
      if (checkResult) {
        const requestResult = await request(PERMISSIONS.IOS.CAMERA, {
          title: 'ChatApp Camera Permission',
          message: 'ChatApp needs access to your camera',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        if (requestResult === RESULTS.GRANTED) {
          ImagePicker.showImagePicker(
            {storageOptions: {skipBackup: true}},
            async (res) => {
              if (res.didCancel) {
                console.log('User canceled image picker');
              } else if (res.error) {
                console.log(res.error);
              } else {
                let src = `data:image/jpeg;base64,${res.data}`;
                await updateUser(uid, src);
                setUserInfo((prev) => ({...prev, userImg: src}));
              }
            },
          );
        } else {
          Alert.alert('Permission Denied');
        }
      }
    }
  };

  const nameTap = (profileName: string, profileImg: string) => {
    navigation.navigate('UserProfile', {profileName, profileImg});
  };

  const openChatRoom = (
    guestName: string,
    guestImg: string,
    guestUserId: string,
  ) => {
    navigation.navigate('ChatRoom', {
      guestName,
      guestImg,
      guestUserId,
      currentUserId: uid,
      currentUserName: userInfo.name,
    });
  };

  return (
    <SafeAreaView>
      <FlatList
        alwaysBounceVertical={false}
        data={allUsers}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <ShowUsers
            user={item}
            onNameTap={() => nameTap(item.name, item.userImg)}
            onImgTap={() => {}}
            goToChatRoom={() => openChatRoom(item.name, item.userImg, item.id)}
          />
        )}
        ListHeaderComponent={
          <Profile
            img={userImg}
            name={name}
            onEditImgTap={() => selectPhotoTapped()}
            onNameTap={() => nameTap(name, userImg)}
          />
        }
        style={styles.flatList}
      />
      <Button
        title="Logout"
        onPress={() =>
          Alert.alert(
            'Logout',
            'Do you want to logout?',
            [
              {
                text: 'Yes',
                onPress: async () => {
                  try {
                    await firebase.auth().signOut();
                  } catch (err) {
                    Alert.alert(err.message);
                  }
                  navigation.replace('Login');
                },
              },
              {
                text: 'No',
              },
            ],
            {cancelable: true},
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginBottom: 10,
  },
});

export default Dashboard;
