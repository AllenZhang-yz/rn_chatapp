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

export type StackParamList = {
  Login: undefined;
  SignUp: undefined;
  Dashboard: undefined;
  AuthHelper: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
