import { View, Text } from "react-native";
import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FirstScreen from "./screens/FirstScreen/FirstScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import StatsScreen from "./screens/StatsScreen/StatsScreen";
import AlarmScreen from "./screens/AlarmScreen/AlarmScreen";
import SetAlarmScreen from "./screens/SetAlarmScreen/SetAlarmScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import { scheduleAlarmNotification } from "./components/notificationHelper";
import { fetchtAlarm } from "./services/product-service";

function App(): React.JSX.Element {
  // const Homestack = createNativeStackNavigator();
  // const setAlarm = async (date: Date) => {
  //   try {
  //     await scheduleAlarmNotification(date);
  //     alert(`Alarm set for ${date.toLocaleTimeString()}`);
  //   } catch (error) {
  //     console.error("Failed to set alarm:", error);
  //   }
  // };
  
  // async function getDate() {
  //   const res = await fetchtAlarm(); // ดึงข้อมูลจาก API
  //   const alarmTimeString = res.data.alarm[1].time;
  
  //   console.log(`Before: ${typeof alarmTimeString} - ${alarmTimeString}`);
  
  //   const alarmTimeDate = new Date(alarmTimeString);
  //   console.log(`After: ${typeof alarmTimeDate} - ${alarmTimeDate.toString()}`);
  
  //   return alarmTimeDate;
  // }
  
  // useEffect(() => {
  //   async function initializeAlarm() {
  //     try {
  //       const alarmDate = await getDate();
  //       if (alarmDate instanceof Date && !isNaN(alarmDate.getTime())) {
  //         await setAlarm(alarmDate);
  //       } else {
  //         console.error("Invalid date from API");
  //       }
  //     } catch (error) {
  //       console.error("Error initializing alarm:", error);
  //     }
  //   }
  
  //   initializeAlarm();
  // }, []);

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
    <View style={{ flex: 1 }}>
      <StatsScreen />
    </View>
  );
}

export default App;
