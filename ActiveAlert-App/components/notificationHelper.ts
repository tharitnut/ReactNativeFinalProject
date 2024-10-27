import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { Platform } from "react-native";

// การตั้งค่า notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ฟังก์ชันการตั้งปลุกซ้ำ
export async function scheduleRepeatingAlarmNotification(
  weekday: number,
  time: { hour: number; minute: number },
  duration: number,
  part: String,
) {
  const startNotificationId = await Notifications.scheduleNotificationAsync({
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
  endTime.setHours(time.hour, time.minute + duration);
  if (endTime.getMinutes() >= 60) {
    endTime.setHours(endTime.getHours() + Math.floor(endTime.getMinutes() / 60));
    endTime.setMinutes(endTime.getMinutes() % 60);
  }

  const endNotificationId = await Notifications.scheduleNotificationAsync({
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

  // ส่งคืน ID ของการแจ้งเตือนเริ่มและสิ้นสุดเพื่อจัดเก็บในฐานข้อมูล
  return { startNotificationId, endNotificationId };
}

// ฟังก์ชันยกเลิกปลุกที่เลือกโดยใช้ notificationId
export async function cancelSelectedAlarm(startId: string, endId: string) {
  if (startId) {
    await Notifications.cancelScheduledNotificationAsync(startId);
  }
  if (endId) {
    await Notifications.cancelScheduledNotificationAsync(endId);
  }
}

// ตัวอย่างการใช้งานการตั้งปลุกใหม่และเก็บ ID
// async function setNewAlarm() {
//   const { startNotificationId, endNotificationId } =
//     await scheduleRepeatingAlarmNotification(
//       2, // ตัวอย่างวันจันทร์
//       { hour: 7, minute: 0 },
//       30, // ตัวอย่างเวลา 30 นาที
//       "morning"
//     );

//   // เก็บ startNotificationId และ endNotificationId ในฐานข้อมูล
//   saveAlarmInDatabase({
//     startNotificationId,
//     endNotificationId,
//   });
// }

// // การยกเลิกปลุกที่เก็บในฐานข้อมูล
// async function cancelAlarmFromDatabase(alarmId) {
//   const alarmData = await getAlarmDataFromDatabase(alarmId); // ดึงข้อมูลการปลุกจากฐานข้อมูลตาม ID ที่เลือก

//   if (alarmData) {
//     await cancelSelectedAlarm(
//       alarmData.startNotificationId,
//       alarmData.endNotificationId
//     );

//     // ลบการแจ้งเตือนจากฐานข้อมูลหรืออัปเดตสถานะ
//     deleteAlarmInDatabase(alarmId);
//   }
// }