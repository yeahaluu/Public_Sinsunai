import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home,
  Camera,
  MapScreen,
  GroupBuy,
  Profile,
  GroupBuytwo,
  GroupBuyDetailTwo,
} from "../screens";
import CameraStackNavigation from "./CameraStack";
import GroupBuyStack from "./GroupBuyStack";
import AuthStack from "./AuthStack";
import ProfileStack from "./ProfileStack";
import MapStack from "./MapStack";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { UserContext } from "../contexts";

const Tab = createBottomTabNavigator();
const TabIcon = ({ name, size, color }) => {
  return <Feather name={name} size={size} color={color} />;
};

const TabIconFW = ({ name, size, color }) => {
  return <FontAwesome name={name} size={size} color={color} />;
};

const TabIconI = ({ name, size, color }) => {
  return <Ionicons name={name} size={size} color={color} />;
};

const MainTab = () => {
  const { user } = useContext(UserContext);

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#dddddd",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Main"
        component={CameraStackNavigation}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "camera" }),
        }}
      />
      {/* <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "map" }),
        }}
      /> */}
      <Tab.Screen
        name="Map"
        component={MapStack}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "map" }),
        }}
      />
      {/* <Tab.Screen
        name="Group"
        component={GroupBuytwo}
        options={{
          tabBarIcon: (props) => TabIconFW({ ...props, name: "handshake-o" }),
        }}
      /> */}
      <Tab.Screen
        name="Group"
        component={GroupBuyStack}
        options={{
          tabBarIcon: (props) => TabIconFW({ ...props, name: "handshake-o" }),
        }}
      />
      {/* <Tab.Screen
        name="Group"
        component={user?.uid && user?.email ? GroupBuyStack : AuthStack}
        options={{
          tabBarIcon: (props) => TabIconFW({ ...props, name: "handshake-o" }),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={user?.uid && user?.email ? ProfileStack : AuthStack}
        options={{
          tabBarIcon: (props) =>
            TabIconI({ ...props, name: "md-person-circle-outline" }),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
