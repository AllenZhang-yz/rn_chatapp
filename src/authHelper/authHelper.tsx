import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {IStackNavigation} from '../navigation/Navigation';
import {getAsyncData, key} from '../asyncStorage/Async';
import {setUniqueValue} from '../utility/constants/const';

const AuthHelper = () => {
  const navigation = useNavigation<IStackNavigation>();
  useEffect(() => {
    const redirect = setTimeout(async () => {
      try {
        const uid = await getAsyncData(key.uid);
        if (uid) {
          setUniqueValue(uid);
          navigation.replace('Dashboard');
        } else {
          navigation.replace('Login');
        }
      } catch (err) {
        console.log(err);
        navigation.replace('Login');
      }
    }, 3000);
    return () => {
      clearTimeout(redirect);
    };
  }, [navigation]);
  return (
    <View style={styles.container}>
      <AntDesign name="wechat" size={200} color="#65a1e0" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthHelper;
