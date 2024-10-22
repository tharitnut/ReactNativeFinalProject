import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "@rneui/base";

import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import FirstScreen from "../screens/FirstScreen/FirstScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import StatsScreen from "../screens/StatsScreen/StatsScreen";
import AlarmScreen from "../screens/AlarmScreen/AlarmScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import SetAlarmScreen from "../screens/SetAlarmScreen/SetAlarmScreen";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeStack = createNativeStackNavigator();
const StatsStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//for TabContainer
function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

function StatsStackScreen() {
  return (
    <StatsStack.Navigator initialRouteName="Stats">
      <StatsStack.Screen
        name="Stats"
        component={StatsScreen}
        options={{ headerShown: false }}
      />
    </StatsStack.Navigator>
  );
}

function AlarmStackScreen() {
  return (
    <StatsStack.Navigator initialRouteName="Alarm">
      <StatsStack.Screen
        name="Alarm"
        component={AlarmScreen}
        options={{ headerShown: false }}
      />
      <StatsStack.Screen
        name="SetAlarm"
        component={SetAlarmScreen}
        options={{ headerShown: false }}
      />
    </StatsStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <StatsStack.Navigator initialRouteName="Profile">
      <StatsStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <StatsStack.Screen
        name="FirstProfileScreen"
        component={LoginStackScreen}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
    </StatsStack.Navigator>
  );
}

function LoginStackScreen() {
  return (
    <LoginStack.Navigator initialRouteName="FirstScreen">
      {/* Welcome screen */}
      <LoginStack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      {/* Register screen */}
      <LoginStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      {/* Login screen */}
      <LoginStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Home"
        component={TabContainer}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
}

//for BottomTap
const TabContainer = () => {
  const home = require("../assets/home_focus.png");
  const home_outline = require("../assets/home.png");
  const flame = require("../assets/flame_focus.png");
  const flame_outline = require("../assets/flame.png");
  const alarm = require("../assets/alarm_focus.png");
  const alarm_outline = require("../assets/alarm.png");
  const person = require("../assets/user_focus.png");
  const person_outline = require("../assets/user.png");

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, focused }) => {
          let iconName;
          if (route.name === "HomeScreen") {
            iconName = focused ? home : home_outline;
          } else if (route.name === "StatsScreen") {
            iconName = focused ? flame : flame_outline;
          } else if (route.name === "AlarmScreen") {
            iconName = focused ? alarm : alarm_outline;
          } else if (route.name === "ProfileScreen") {
            iconName = focused ? person : person_outline;
          }

          return (
            <Image source={iconName} style={{ width: size, height: size }} />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 70 },
        tabBarActiveBackgroundColor: "#A3D7F2",
        tabBarInactiveBackgroundColor: "#A3D7F2",
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeStackScreen} />
      <Tab.Screen name="StatsScreen" component={StatsStackScreen} />
      <Tab.Screen name="AlarmScreen" component={AlarmStackScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

//for App.tsx
const MainNavigator = () => {
  const [user, setUser] = useState<string | null>("");

  const getUser = async () => {
    const users = await AsyncStorage.getItem("@username");
    setUser(users);
  };

  useEffect(() => {
    getUser();
  }, []);
  return user ? <TabContainer /> : <LoginStackScreen />;
};

// Export Navigator component
export default MainNavigator;
export { LoginStackScreen };
