import AsyncStorage from "@react-native-async-storage/async-storage";

// 스토리지에 저장
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e.message);
  }
};

// 스토리지에서 불러오기
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e.message);
  }
};
