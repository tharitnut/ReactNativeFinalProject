import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigator from "./components/MainNavigator";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

function App(): React.JSX.Element {
  

  useEffect(() => {
    Notifications.requestPermissionsAsync().then(({ status }) => {
      if (status !== "granted") {
        Alert.alert("Permission required", "Please enable notifications.");
      }
    });
  }, []);

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
    <>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
      {/*<View style={{ flex: 1 }}>
        <AlarmScreen />
      </View>*/}
    </>
  );
}

export default App;
