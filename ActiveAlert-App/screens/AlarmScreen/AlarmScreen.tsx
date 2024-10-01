import { View, Text, Switch, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";

const AlarmScreen = () => {
  const [isFirstSwitchOn, setIsFirstSwitchOn] = useState(false); // State for the first switch
  const [isSecondSwitchOn, setIsSecondSwitchOn] = useState(false); // State for the second switch
  // Function to toggle the first switch
  const toggleFirstSwitch = () => setIsFirstSwitchOn((prev) => !prev);

  // Function to toggle the second switch
  const toggleSecondSwitch = () => setIsSecondSwitchOn((prev) => !prev);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 70, marginStart: 30 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.textLogo, { color: "#1E1E22" }]}>Active</Text>
          <Text style={[styles.textLogo, { color: "#7C4DFF" }]}>Alert</Text>
        </View>
      </View>
      <View style={styles.alarmContainer}>
        <Text style={styles.alarmTitle}>Alarm</Text>
      </View>

      {/* Card */}
      <View style={[styles.card, { marginTop: 0 }]}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.alarmText}>Chest Workout</Text>
            <Text style={styles.timeText}>5:30 AM</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#9747FF" }}
            thumbColor={isFirstSwitchOn ? "#FFFFFF" : "#f4f3f4"}
            onValueChange={toggleFirstSwitch}
            style={{
              transform: [{ scaleX: 2 }, { scaleY: 2 }],
              marginStart: 80,
            }}
            value={isFirstSwitchOn}
          />
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Days Row */}
        <View style={styles.dayRow}>
          <Text style={styles.dayText}>Mon Tue Thu Fri</Text>
        </View>
      </View>

      {/* Card */}
      <View style={[styles.card]}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.alarmText}>Legs Workout</Text>
            <Text style={styles.timeText}>6:30 AM</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#9747FF" }}
            thumbColor={isSecondSwitchOn ? "#FFFFFF" : "#f4f3f4"}
            onValueChange={toggleSecondSwitch}
            style={{
              transform: [{ scaleX: 2 }, { scaleY: 2 }],
              marginStart: 80,
            }}
            value={isSecondSwitchOn}
          />
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Days Row */}
        <View style={styles.dayRow}>
          <Text style={styles.dayText}>Mon Wed Fri</Text>
        </View>
      </View>

      {/* Plus Button */}
      <TouchableOpacity style={styles.plusButton}>
        <LinearGradient
          colors={["#9747FF", "#6F00FF"]} // Define your gradient colors here
          style={styles.plusBg} // Apply the existing style
        >
          <Text style={styles.plusButtonText}>+</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default AlarmScreen;
