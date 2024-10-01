import { View, Text, Image, Switch, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient"; // Use expo's LinearGradient

const manImage = require("../../assets/man.png");

const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 70, marginStart: 30 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.textLogo, { color: "#1E1E22" }]}>Active</Text>
          <Text style={[styles.textLogo, { color: "#7C4DFF" }]}>Alert</Text>
        </View>
      </View>
      <View style={styles.innerContainer}>
        <LinearGradient
          colors={["#9747FF", "#6F00FF"]} // Define your gradient colors here
          style={styles.dontStop} // Apply the existing style
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.dontText}>
              Don't stop when you're tired STOP when you're DONE
            </Text>
            <Image source={manImage} style={{ marginBottom: -20 }}></Image>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.card}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.alarmText}>Scheduled Alarm</Text>
            <Text style={styles.timeText}>5:30 AM</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#9747FF" }}
            thumbColor={isEnabled ? "#FFFFFF" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            style={{
              transform: [{ scaleX: 2 }, { scaleY: 2 }],
              marginStart: 80,
            }}
            value={isEnabled}
          />
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Days Row */}
        <View style={styles.dayRow}>
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <Text
              key={index}
              style={[
                styles.dayText,
                index === 1 ||
                index === 2 ||
                index === 3 ||
                index === 4 ||
                index === 5 // Active days logic
                  ? styles.activeDay
                  : styles.inactiveDay,
              ]}
            >
              {day}
            </Text>
          ))}
        </View>

        
      </View>
    </View>
  );
};

export default HomeScreen;
