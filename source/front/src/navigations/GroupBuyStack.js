import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  GroupBuy,
  GroupBuytwo,
  GroupBuyDetail,
  GroupBuyCreate,
  GroupBuyCreatetwo,
  GroupBuyDetailTwo,
  Channel,
} from "../screens";
import { StackActions } from "@react-navigation/routers";
import Camera from "../screens/Camera";
import AnalysisResult from "../screens/AnalysisResult";
import MapScreenGroup from "../screens/MapScreenGroup";

const Stack = createStackNavigator();
export default GroupBuyStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GroupBuy" component={GroupBuytwo} />
      {/* <Stack.Screen name="GroupBuy" component={GroupBuy} /> */}
      {/* <Stack.Screen name="GroupBuytwo" component={GroupBuytwo} /> */}
      <Stack.Screen name="GroupBuyDetail" component={GroupBuyDetailTwo} />
      <Stack.Screen name="GroupBuyCreate" component={GroupBuyCreatetwo} />
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="AnalysisResult" component={AnalysisResult} />
      <Stack.Screen name="MapScreenGroup" component={MapScreenGroup} />
      <Stack.Screen name="Channel" component={Channel} />
    </Stack.Navigator>
  );
};
