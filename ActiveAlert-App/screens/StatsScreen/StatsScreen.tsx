import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import styles from "./styles";
import { fetchtAlarm } from "../../services/product-service";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";

// ขนาดหน้าจอ
const screenWidth = Dimensions.get("window").width;

// รายชื่อวันในสัปดาห์
const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// เริ่มต้นค่าทุกวันเป็น 0
const initialDayDurations: Record<string, number> = allDays.reduce((acc, day) => {
  acc[day] = 0;
  return acc;
}, {} as Record<string, number>);

// กำหนดการตั้งค่าของ Chart
const chartConfig = {
  backgroundColor: "#F0FAFF",
  backgroundGradientFrom: "#F0FAFF",
  backgroundGradientTo: "#F0FAFF",
  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  barPercentage: 0.6,
};

const StatsScreen = (): React.JSX.Element => {
  const [data, setData] = useState<ChartData | null>(null);
  const [alarmdata, setAlarmData] = useState<any>({});

  const getAlarm = async () => {
    const response = await fetchtAlarm();
    setAlarmData(response.data.alarm)
    const dayDurations = { ...initialDayDurations }; // สร้างสำเนาเพื่อแก้ไข

    // รวมค่า duration ตามวัน
    response.data.alarm.forEach((entry: any) => {
      entry.day.forEach((day: string) => {
        dayDurations[day] += entry.duration;
      });
    });

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

  const calculateCal = async () => {
    
  }

  useEffect(() => {
    getAlarm();
  }, []);

  return (
    <ScrollView style={styles.container}>
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
            style={styles.chart}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      {/* Workout Cards */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Chest</Text>
        <Text style={styles.cardDetail}>1.32 hours 226 kcal</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Back</Text>
        <Text style={styles.cardDetail}>1.32 hours 226 kcal</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Arms</Text>
        <Text style={styles.cardDetail}>1.32 hours 226 kcal</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Abdominal</Text>
        <Text style={styles.cardDetail}>1.32 hours 226 kcal</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Legs</Text>
        <Text style={styles.cardDetail}>1.32 hours 226 kcal</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Shoulders</Text>
        <Text style={styles.cardDetail}>1.32 hours 226 kcal</Text>
      </View>
    </ScrollView>
  );
};

export default StatsScreen;