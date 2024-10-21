import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function scheduleAlarmNotification(date: Date) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Alarm ⏰",
      body: "It's time to wake up!",
      sound: true,
    },
    trigger: date,
  });
}

// ขอ permission สำหรับการแจ้งเตือน
export async function requestNotificationPermissions() {
  const settings = await Notifications.getPermissionsAsync();
  if (!settings.granted) {
    await Notifications.requestPermissionsAsync();
  }
}

useEffect(() => {
  requestNotificationPermissions();
}, []);