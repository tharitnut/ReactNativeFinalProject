import { View, Text } from "react-native";
import React from "react";

import HomeScreen from "./screens/HomeScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function App(): React.JSX.Element {
  const Homestack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Homestack.Navigator
        initialRouteName="Home"
        screenOptions={{
          //Global
          headerStyle: { backgroundColor: "#20b2aa" },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
          //headerTitleAlign: "center",
        }}
      >
        <Homestack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Active Alert" }}
        />
      </Homestack.Navigator>
    </NavigationContainer>
  );
}

export default App;
