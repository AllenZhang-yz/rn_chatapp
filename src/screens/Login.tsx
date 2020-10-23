import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IStackNavigation} from '../navigation/Navigation';
import {loginRequest} from '../auth';
import {useMutation} from 'react-query';
import {key, setAsyncData} from '../asyncStorage/Async';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setUniqueValue} from '../utility/constants/const';
import Loader from '../components/Loader';

const Login = () => {
  const navigation = useNavigation<IStackNavigation>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginMutate, {isLoading}] = useMutation(loginRequest, {
    onSuccess: async (data) => {
      const uid = data.user?.uid;
      if (uid) {
        await setAsyncData(key.uid, uid);
        setUniqueValue(uid);
      }
      navigation.replace('Dashboard');
    },
    onError: (error: any) => {
      Alert.alert(error.message);
    },
  });

  const loginUser = async () => {
    if (!email) {
      Alert.alert('Type your email');
    }
    if (!password) {
      Alert.alert('Type your password');
    }
    await loginMutate({email, password});
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loader />}
      <KeyboardAwareScrollView>
        <View>
          <View style={styles.imgContainer}>
            <AntDesign name="wechat" size={200} color="#65a1e0" />
          </View>
          <TextInput
            placeholder="Email address"
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
            value={email}
            placeholderTextColor="#575554"
            autoCapitalize="none"
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
    marginTop: 20,
  },
  btn: {
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default Login;
