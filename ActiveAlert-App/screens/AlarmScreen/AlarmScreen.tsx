import { View, Text, Switch, TouchableOpacity, FlatList } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { changeAlert, fetchtAlarm } from "../../services/product-service";

const AlarmScreen = (): React.JSX.Element => {
  const [alarmData, setAlarmData] = useState<any[]>([]);
  const [activeSwitch, setActiveSwitch] = useState<{ [key: number]: boolean }>(
    {}
  );

  async function getData() {
    const data = await fetchtAlarm();
    setAlarmData(data.data.alarm);
  }

  useEffect(() => {
    getData();
  }, []);

  const toggleSwitch = async(index: number) => {
    setActiveSwitch((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    const response = await changeAlert(index,activeSwitch)
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.card, { marginTop: 0 }]}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.alarmText}>{item.part} Workout</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#9747FF" }}
          thumbColor={activeSwitch[index] ? "#FFFFFF" : "#f4f3f4"}
          onValueChange={() => toggleSwitch(index)}
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }], marginStart: 80 }}
          value={!!activeSwitch[index]}
        />
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dayRow}>
        <Text style={styles.dayText}>
          {item.day.map((data: string, i: number) => (
            <Text key={i} style={{ color: "#7C6B6B" }}>
              {data}{" "}
            </Text>
          ))}
        </Text>
      </View>
    </View>
  );

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

      <FlatList
        data={alarmData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.plusButton}>
        <LinearGradient colors={["#9747FF", "#6F00FF"]} style={styles.plusBg}>
          <Text style={styles.plusButtonText}>+</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default AlarmScreen;
