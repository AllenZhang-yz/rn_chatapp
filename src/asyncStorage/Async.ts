import AsyncStorage from '@react-native-community/async-storage';

export const key = {
  uid: 'uid',
};

export const setAsyncData = async (asyncKey: any, item: any) => {
  try {
    await AsyncStorage.setItem(asyncKey, item);
  } catch (error) {
    console.log(error);
  }
};

export const getAsyncData = async (asyncKey: any) => {
  try {
    const value = await AsyncStorage.getItem(asyncKey);
    return value ? value : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteAsyncData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
