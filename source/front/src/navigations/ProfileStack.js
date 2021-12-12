import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile, SellerStore, Channel, ChannelList } from "../screens";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#FEBB25",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SellerStore"
        component={SellerStore}
        options={{ headerBackTitleVisible: false, headerTitle: "가게 선택" }}
      />
      <Stack.Screen
        name="ChannelList"
        component={ChannelList}
        options={{ headerBackTitleVisible: false, headerTitle: "채널 목록" }}
      />
      <Stack.Screen
        name="Channel"
        component={Channel}
        options={{ headerBackTitleVisible: false, headerTitle: "채널" }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
