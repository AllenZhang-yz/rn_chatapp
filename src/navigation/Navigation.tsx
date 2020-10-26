import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens//SignUp';
import Dashboard from '../screens/Dashboard';
import AuthHelper from '../authHelper/authHelper';
import UserProfile from '../screens/UserProfile';
import ChatRoom from '../screens/ChatRoom';

export type StackParamList = {
  Login: undefined;
  SignUp: undefined;
  Dashboard: undefined;
  AuthHelper: undefined;
  UserProfile: {
    profileName: string;
    profileImg: string;
  };
  ChatRoom: {
    guestName: string;
    guestImg: string;
    guestUserId: string;
    currentUserId: string;
    currentUserName: string;
  };
};

const Stack = createStackNavigator<StackParamList>();

export interface IStackNavigation extends StackNavigationProp<StackParamList> {}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthHelper"
        screenOptions={{
          headerShown: true,
          headerStyle: {backgroundColor: '#05a0e8'},
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}>
        <Stack.Screen
          name="AuthHelper"
          component={AuthHelper}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={({route}) => ({
            title: route.params.profileName,
            headerBackTitleVisible: false,
          })}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={({route}) => ({
            headerBackTitleVisible: false,
            title: route.params.guestName,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
