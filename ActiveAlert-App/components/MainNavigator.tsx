import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import FirstScreen from "../screens/FirstScreen/FirstScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import StatsScreen from "../screens/StatsScreen/StatsScreen";
import AlarmScreen from "../screens/AlarmScreen/AlarmScreen";
import SetAlarmScreen from "../screens/SetAlarmScreen/SetAlarmScreen";

const LoginStack = createNativeStackNavigator();
const RegisterStack = createNativeStackNavigator();

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/* function TabContainer() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          if (route.name === "HomeStack") {
            iconName = focused
              ? "home"
              : "home-outline";
          } else if (route.name === "CameraStack") {
            iconName = focused ? "camera" : "camera-outline";
          }
          // You can return any component that you like here!​
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "pink",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarActiveBackgroundColor:'#D1E9F6'
      })}
    >
      <Tab.Screen
        name="LoginStack"
        component={LoginStackScreen}
      />
      <Tab.Screen
        name="RegisterStack"
        component={RegisterStackScreen}
      />
    </Tab.Navigator>
  );
}

function RegisterStackScreen() {
  return (
    <LoginStack.Navigator
      initialRouteName="Register"
      screenOptions={{
        //Global
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <LoginStack.Screen name="Register" component={RegisterScreen} />
    </LoginStack.Navigator>
  );
}

function LoginStackScreen() {
  return (
    <LoginStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        //Global
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <LoginStack.Screen name="Login" component={LoginScreen} />
    </LoginStack.Navigator>
  );
} */

const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="FirstScreen">
      {/* Welcome screen */}
      <Stack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      {/* Register screen */}
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      {/* Login screen */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Stats"
        component={StatsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Alarm"
        component={AlarmScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SetAlarm"
        component={SetAlarmScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Export Navigator component
export default Navigator;
