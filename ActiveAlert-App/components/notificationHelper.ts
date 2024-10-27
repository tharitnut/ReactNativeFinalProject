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
  time: { hour: number; minute: number },
  duration: number,
  part: String
) {
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "ActiveAlert ⏰",
      body: `It's time for ${part} workout!`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
    },
    trigger: {
      weekday,
      hour: time.hour,
      minute: time.minute,
      repeats: true,
    },
  });
  const endTime = new Date();
  endTime.setHours(time.hour, time.minute + duration, 0);
  console.log(endTime.getHours()+':'+endTime.getMinutes());
  
  // Schedule end-of-session alert
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Workout Complete 💪",
      body: `Your ${part} workout session is now over!`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
    },
    trigger: {
      weekday,
      hour: endTime.getHours(),
      minute: endTime.getMinutes(),
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
