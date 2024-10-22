import * as Notifications from "expo-notifications";
// import * as TaskManager from 'expo-task-manager';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// // กำหนดชื่อ Task สำหรับ background handling (รีบูตเครื่อง)
// const ALARM_TASK_NAME = 'alarm-task';

// TaskManager.defineTask(ALARM_TASK_NAME, async () => {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: '⏰ Alarm!',
//       body: 'Time to wake up!',
//       sound: true,
//     },
//     trigger: null, // แจ้งเตือนทันทีเมื่อเรียกใช้ Task นี้
//   });
// });

export const scheduleAlarm = async (
  alarm: Date,
  selectedBodyPart: string|null,
  alert: boolean
) => {
  try {
    if (alert) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: selectedBodyPart,
          body: `Alarm set for ${alarm.toLocaleTimeString()}`,
          sound: true,
        },
        trigger: alarm,
      });
    }
  } catch (error) {
    console.error("Failed to schedule alarms:", error);
  }
};
