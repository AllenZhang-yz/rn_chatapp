import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {useNavigation} from '@react-navigation/native';
// import {IStackNavigation} from '../navigation/Navigation';

import Logo from '../utility/images/chatlogo.png';
import {deviceWidth} from '../utility/styles/appStyle';

const SignUp = () => {
  // const navigation = useNavigation<IStackNavigation>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.imgContainer}>
          <Image source={Logo} style={styles.img} />
        </View>
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={(value) => setName(value)}
          value={name}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(value) => setEmail(value)}
          value={email}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          onChangeText={(value) => setConfirmPwd(value)}
          value={confirmPwd}
        />
        <TouchableOpacity style={styles.btn}>
          <Button
            title="Login"
            onPress={() => Alert.alert(`${name},${email},${password}`)}
          />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    alignItems: 'center',
  },
  img: {
    width: deviceWidth * 0.8,
    height: deviceWidth * 0.8,
  },
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  btn: {
    margin: 10,
  },
});

export default SignUp;
