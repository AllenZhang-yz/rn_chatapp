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
import {useMutation} from 'react-query';
import {IStackNavigation} from '../navigation/Navigation';
import {signUpRequest, addUser} from '../auth';
import {setAsyncData, key} from '../asyncStorage/Async';
import firebase from '../firebase/config';
import {setUniqueValue} from '../utility/constants/const';
import Loader from '../components/Loader';

const SignUp = () => {
  const navigation = useNavigation<IStackNavigation>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const [addUserMutate, {isLoading: addUserIsLoading}] = useMutation(addUser, {
    onError: (error: any) => {
      Alert.alert(error.message);
    },
  });

  const [signUpMutate, {isLoading}] = useMutation(signUpRequest, {
    onSuccess: async () => {
      let uid = firebase.auth().currentUser?.uid;
      let userImg = '';
      if (uid) {
        try {
          // await addUser({name, email, uid, userImg});
          await addUserMutate({name, email, uid, userImg});
          await setAsyncData(key.uid, uid);
          setUniqueValue(uid);
          navigation.replace('Dashboard');
        } catch (err) {
          Alert.alert(err);
        }
      }
    },
    onError: (error: any) => {
      Alert.alert(error.message);
    },
  });

  const registerUser = async () => {
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
    await signUpMutate({email, password});
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading || addUserIsLoading) && <Loader />}
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
