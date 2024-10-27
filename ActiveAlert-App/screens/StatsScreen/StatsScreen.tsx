import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import styles from "./styles";
import { fetchtAlarm } from "../../services/product-service";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { useFocusEffect } from "@react-navigation/native";

// ขนาดหน้าจอ
const screenWidth = Dimensions.get("window").width;

// รายชื่อวันในสัปดาห์
const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const allParts = ["Chest", "Back", "Arms", "Abdominal", "Legs", "Shoulders"];

// เริ่มต้นค่าทุกวันเป็น 0
const initialDayDurations: Record<string, number> = allDays.reduce(
  (acc, day) => {
    acc[day] = 0;
    return acc;
  },
  {} as Record<string, number>
);

// กำหนดการตั้งค่าของ Chart
const chartConfig = {
  backgroundColor: "#F0FAFF",
  backgroundGradientFrom: "#F0FAFF",
  backgroundGradientTo: "#F0FAFF",
  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  barPercentage: 0.6,
  decimalPlaces: 0,
};

const StatsScreen = (): React.JSX.Element => {
  const [data, setData] = useState<ChartData | null>(null);
  const [alarmdata, setAlarmData] = useState<any>({});
  const [calories, setCalories] = useState<any>([
    { Chest: 0 },
    { Back: 0 },
    { Arms: 0 },
    { Abdominal: 0 },
    { Legs: 0 },
    { Shoulders: 0 },
  ]);
  const [duration, setDuration] = useState<any>([
    { Chest: 0 },
    { Back: 0 },
    { Arms: 0 },
    { Abdominal: 0 },
    { Legs: 0 },
    { Shoulders: 0 },
  ]);

  const getAlarm = async () => {
    const response = await fetchtAlarm();
    setAlarmData(response.data.alarm);
    const dayDurations = { ...initialDayDurations }; // สำเนาของ dayDurations

    // รวมค่า duration ตามวัน
    response.data.alarm.forEach((entry: any) => {
      entry.day.forEach((day: string) => {
        dayDurations[day] += entry.duration;
      });
    });

    // อัปเดตค่า calories ตามส่วนของร่างกาย
    const updatedCalories = [...calories]; // สำเนาของ calories
    const updatedDuration = [...duration]; // สำเนาของ duration

    response.data.alarm.forEach((entry: any) => {
      let caloriesPerMinute = 0;
      switch (entry.part) {
        case "Chest":
          caloriesPerMinute = 9;
          break;
        case "Back":
          caloriesPerMinute = 11;
          break;
        case "Arms":
          caloriesPerMinute = 7;
          break;
        case "Abdominal":
          caloriesPerMinute = 7;
          break;
        case "Legs":
          caloriesPerMinute = 14;
          break;
        case "Shoulders":
          caloriesPerMinute = 9;
          break;
        default:
          break;
      }

      const caloriesPerPart = entry.duration * caloriesPerMinute;
      const part = entry.part;
      const duration = entry.duration;

      // หา index ของส่วนที่ต้องการอัปเดต
      const index = updatedCalories.findIndex(
        (item: any) => item[part] !== undefined
      );

      if (index !== -1) {
        updatedCalories[index] = {
          ...updatedCalories[index],
          [part]: caloriesPerPart,
        };
        updatedDuration[index] = {
          ...updatedDuration[index],
          [part]: duration,
        };
      }
    });

    // อัปเดต state
    setCalories(updatedCalories);
    setDuration(updatedDuration);

    // อัปเดตข้อมูล Chart
    setData({
      labels: allDays,
      datasets: [
        {
          data: allDays.map((day) => dayDurations[day]),
        },
      ],
    });
  };

  useFocusEffect(
    useCallback(() => {
      getAlarm();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={{ marginTop: 70, marginStart: 30 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.textLogo, { color: "#1E1E22" }]}>Active</Text>
          <Text style={[styles.textLogo, { color: "#7C4DFF" }]}>Alert</Text>
        </View>
      </View>

      {/* Calories Burn Chart */}
      <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
        <Text style={styles.sectionTitle}>Calories Burn</Text>
        {data ? (
          <BarChart
            data={data}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=" cal"
            style={styles.chart}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      {/* Workout Cards */}
      <FlatList
        data={allParts}
        keyExtractor={(item: any, index: any) => index.toString()}
        renderItem={({ item, index }) => {
          const cal = calories[index]?.[item] ?? 0;
          const hour = (duration[index]?.[item] ?? 0) / 60;
          return (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item}</Text>
              <Text style={styles.cardDetail}>
                {hour == 0 ? 0 : hour.toFixed(1)}{" "}
                {hour == 1 || hour == 0 ? "hour" : "hours"} {cal} cal
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default StatsScreen;
