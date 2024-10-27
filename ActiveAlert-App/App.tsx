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
