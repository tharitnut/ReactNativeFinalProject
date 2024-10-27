import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { Platform } from "react-native";

// Setting up notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Function to set up repeating alarm
export async function scheduleRepeatingAlarmNotification(
  weekday: number,
  time: { hour: number; minute: number }
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "ActiveAlert ⏰",
      body: "It's time for your workout!",
      sound: true,
    },
    trigger: {
      weekday, // e.g., 2 for Monday, 3 for Tuesday
      hour: time.hour,
      minute: time.minute,
      repeats: true,
    },
  });
}

// Request permission for notifications
export async function requestNotificationPermissions() {
  const settings = await Notifications.getPermissionsAsync();
  if (!settings.granted) {
    await Notifications.requestPermissionsAsync();
  }
}

const NotificationComponent = () => {
  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  return null; // Return null since it's a setup component
};

export default NotificationComponent;
