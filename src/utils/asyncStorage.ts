import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataAsyncStorage = async (key: string, val: any) => {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (e) {
    console.log('errStore', e);
  }
};

export const getDataAsyncStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return '';
    }
  } catch (e) {
    console.log('error: ' + e);
  }
};

export const storeDataObjAsyncStorage = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('errStore', e);
  }
};

export const getDataObjAsyncStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('errStore', e);
  }
};
