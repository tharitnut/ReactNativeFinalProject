import { View, Text } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FirstScreen from './screens/FirstScreen/FirstScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import StatsScreen from "./screens/StatsScreen/StatsScreen";
import AlarmScreen from "./screens/AlarmScreen/AlarmScreen";
import SetAlarmScreen from "./screens/SetAlarmScreen/SetAlarmScreen";

function App(): React.JSX.Element {
  // const Homestack = createNativeStackNavigator();

  return (
    // <NavigationContainer>
    //   <Homestack.Navigator
    //     initialRouteName="Home"
    //     screenOptions={{
    //       //Global
    //       headerStyle: { backgroundColor: "#20b2aa" },
    //       headerTintColor: "white",
    //       headerTitleStyle: { fontWeight: "bold" },
    //       headerTitleAlign:'center',
    //     }}
    //   >
    //     <Homestack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{ title: "Profile" }}
    //     />
    //   </Homestack.Navigator>
    // </NavigationContainer>
    <View style={{flex:1}}>
      <SetAlarmScreen/>
    </View>
  );
}

export default App;
