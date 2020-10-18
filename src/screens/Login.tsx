import React, {useState, FC} from 'react';
import {
  Image,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Logo from '../utility/images/chatlogo.png';
import {IStackNavigation} from '../navigation/Navigation';
import {deviceWidth} from '../utility/styles/appStyle';

const Login = () => {
  const navigation = useNavigation<IStackNavigation>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const DismissKeyboard: FC = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  const loginUser = () => {
    if (!email) {
      Alert.alert('Type your email');
    }
    if (!password) {
      Alert.alert('Type your password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboard>
        <View>
          <View style={styles.imgContainer}>
            <Image source={Logo} style={styles.img} />
          </View>
          <TextInput
            placeholder="Email address"
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
            value={email}
            placeholderTextColor="#575554"
            onSubmitEditing={loginUser}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={true}
            placeholderTextColor="#575554"
            onSubmitEditing={loginUser}
          />
          <TouchableOpacity style={styles.btn}>
            <Button title="Login" onPress={loginUser} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Button
              title="Need an account?"
              onPress={() => navigation.navigate('SignUp')}
            />
          </TouchableOpacity>
        </View>
      </DismissKeyboard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    margin: 10,
    padding: Platform.OS === 'ios' ? 15 : 10,
    backgroundColor: '#8c8382',
    borderRadius: 8,
    fontSize: 20,
  },
  imgContainer: {
    alignItems: 'center',
  },
  img: {
    width: deviceWidth * 0.8,
    height: deviceWidth * 0.8,
    borderRadius: 20,
  },
  btn: {
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default Login;
