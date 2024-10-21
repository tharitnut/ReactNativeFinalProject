import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import styles from "./styles";

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [100, 90, 75, 112, 70, 85, 110],
    },
  ],
};

const chartConfig = {
  backgroundColor: "#F0FAFF",
  backgroundGradientFrom: "#F0FAFF",
  backgroundGradientTo: "#F0FAFF",
  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  barPercentage: 0.6,
};

const StatsScreen = (): React.JSX.Element => {
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
        <BarChart
          data={data}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

      {/* Workout Cards */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Chest • 8:00 AM</Text>
        <Text style={styles.cardDetail}>1.32 hours 226 kcal</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Legs • 9:30 AM</Text>
        <Text style={styles.cardDetail}>1.00 hours 210 kcal</Text>
      </View>
    </ScrollView>
  );
};

export default StatsScreen;