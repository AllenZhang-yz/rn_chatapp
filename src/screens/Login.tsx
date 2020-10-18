import React from 'react';
import {
  Image,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Logo from '../utility/images/chatlogo.png';
import {IStackNavigation} from '../navigation/Navigation';
import {deviceWidth} from '../utility/styles/appStyle';

const Login = () => {
  const navigation = useNavigation<IStackNavigation>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={Logo} style={styles.img} />
      </View>
      <TextInput placeholder="Email address" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} />
      <TouchableOpacity style={styles.btn}>
        <Button title="Login" onPress={() => navigation.navigate('SignUp')} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  imgContainer: {
    alignItems: 'center',
  },
  img: {
    width: deviceWidth * 0.8,
    height: deviceWidth * 0.8,
  },
  btn: {
    margin: 10,
  },
});

export default Login;
