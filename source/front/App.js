// import { StatusBar } from 'expo-status-bar';
// import CameraApp from './src/components/CameraApp';
import React, { useContext } from "react";
// import { StyleSheet, Text, View } from 'react-native';
import axios from "axios";
// 로그인 여부 확인을 위한 context
import { LogBox } from "react-native";
import {
  ProgressProvider,
  ProgressContext,
  UserProvider,
} from "./src/contexts";
import Navigation from "./src/navigations";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
axios.defaults.baseURL = "http://k5a206.p.ssafy.io:8000";

export default function App() {
  const { inProgress } = useContext(ProgressContext);
  console.log(inProgress);

  return (
    <UserProvider>
      <ProgressProvider>
        <Navigation />
      </ProgressProvider>
    </UserProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
