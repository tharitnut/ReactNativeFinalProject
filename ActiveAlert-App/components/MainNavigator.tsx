import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "@rneui/base";
import { getFocusedRouteNameFromRoute, NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import FirstScreen from "../screens/FirstScreen/FirstScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import StatsScreen from "../screens/StatsScreen/StatsScreen";
import AlarmScreen from "../screens/AlarmScreen/AlarmScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import SetAlarmScreen from "../screens/SetAlarmScreen/SetAlarmScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeStack = createNativeStackNavigator();
const StatsStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Alarm Stack
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

// Login Stack
function LoginStackScreen() {
  return (
    <LoginStack.Navigator initialRouteName="FirstScreen">
      <LoginStack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
}

// Tab Navigator
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
        tabBarStyle: {
          height: 70,
          display: getFocusedRouteNameFromRoute(route) === "SetAlarm"
            ? "none"
            : "flex",
        },
        tabBarActiveBackgroundColor: "#A3D7F2",
        tabBarInactiveBackgroundColor: "#A3D7F2",
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="StatsScreen" component={StatsScreen} />
      <Tab.Screen name="AlarmScreen" component={AlarmStackScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Root Navigator
const RootNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const users = await AsyncStorage.getItem("@username");
    if (users) {
      setIsLoggedIn(true); // Set logged-in state based on user info
    }
    setLoading(false); // Loading complete
  };

  useEffect(() => {
    getUser();
  }, []);
  
  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "TabContainer" : "LoginStack"}>
      <Stack.Screen
        name="TabContainer"
        component={TabContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginStack"
        component={LoginStackScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// App Component
const App = () => {
  return <RootNavigator />;
};

export default App;
