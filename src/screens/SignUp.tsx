import React, {useState} from 'react';
import {
  SafeAreaView,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Alert,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {IStackNavigation} from '../navigation/Navigation';

const SignUp = () => {
  const navigation = useNavigation<IStackNavigation>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const registerUser = () => {
    if (!name) {
      Alert.alert('Name is required');
    }
    if (!email) {
      Alert.alert('Email is required');
    }
    if (!password) {
      Alert.alert('Password is required');
    }
    if (!confirmPwd || confirmPwd !== password) {
      Alert.alert('Password does not match');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.imgContainer}>
          <AntDesign name="wechat" size={200} color="#65a1e0" />
        </View>
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={(value) => setName(value)}
          value={name}
          placeholderTextColor="#575554"
          onSubmitEditing={registerUser}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(value) => setEmail(value)}
          value={email}
          autoCapitalize="none"
          placeholderTextColor="#575554"
          onSubmitEditing={registerUser}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          value={password}
          placeholderTextColor="#575554"
          onSubmitEditing={registerUser}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          onChangeText={(value) => setConfirmPwd(value)}
          value={confirmPwd}
          placeholderTextColor="#575554"
          onSubmitEditing={registerUser}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.btn}>
          <Button title="Sign Up" onPress={registerUser} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Button
            title="Have an account?"
            onPress={() => navigation.navigate('Login')}
          />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    opacity: 0.8,
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  input: {
    borderWidth: 1,
    margin: 10,
    padding: Platform.OS === 'ios' ? 15 : 10,
    backgroundColor: '#8c8382',
    borderRadius: 8,
    fontSize: 20,
  },
  btn: {
    margin: 10,
  },
});

export default SignUp;
