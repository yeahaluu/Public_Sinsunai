import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MapScreen, GroupBuyDetailTwo } from "../screens";

const Stack = createStackNavigator();

const MapStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MapScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="GroupBuyDetail" component={GroupBuyDetailTwo} />
    </Stack.Navigator>
  );
};

export default MapStack;
