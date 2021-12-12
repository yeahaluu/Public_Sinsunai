import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//components
import Home from "../screens/Home";
import Camera from "../screens/Camera";
import AnalysisResult from "../screens/AnalysisResult";

const Stack = createStackNavigator();

export default CameraStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="AnalysisResult" component={AnalysisResult} />
    </Stack.Navigator>
  );
};
