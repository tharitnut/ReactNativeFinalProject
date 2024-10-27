import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { insertAlarm } from "../../services/product-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { scheduleRepeatingAlarmNotification } from "../../components/notificationHelper";

const SetAlarmScreen = (): React.JSX.Element => {
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<number>(1);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [selectedAmPm, setSelectedAmPm] = useState<string>("AM");

  const navigation = useNavigation<any>();

  const durations = [10, 20, 30, 40, 50, 60];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const bodyParts = [
    { name: "Chest", icon: require("../../assets/chest-icon.png") },
    { name: "Back", icon: require("../../assets/back-icon.png") },
    { name: "Arms", icon: require("../../assets/arms-icon.png") },
    { name: "Abdominal", icon: require("../../assets/abs-icon.png") },
    { name: "Legs", icon: require("../../assets/legs-icon.png") },
    { name: "Shoulders", icon: require("../../assets/shoulders-icon.png") },
  ];

  const hours = Array.from({ length: 12 }, (_, i) => ({
    label: (i + 1).toString(),
    value: i + 1,
  }));

  const minutes = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i,
  }));

  const amPmOptions = [
    { label: "AM", value: "AM" },
    { label: "PM", value: "PM" },
  ];

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSaveAlarm = async () => {
    let hours = selectedHour;
    if (selectedAmPm === "PM" && hours < 12) hours += 12;
    if (selectedAmPm === "AM" && hours === 12) hours = 0;

    const alarmTime: Date = new Date();
    alarmTime.setHours(hours, selectedMinute, 0, 0);
    //Auto GMT+7

    if (selectedDays && selectedBodyPart) {
      const username = await AsyncStorage.getItem("@username");
      const alarmData = {
        time: alarmTime,
        timeFormat: selectedAmPm,
        part: selectedBodyPart,
        day: selectedDays,
        duration: selectedDuration,
        alert: true,
      };

      const res = await insertAlarm(alarmData, username || "UnknownUser");
      let dayIndex = 1;
      selectedDays.forEach(async (day) => {
        switch (day) {
          case "Sun":
            dayIndex = 1;
            break;
          case "Mon":
            dayIndex = 2;
            break;
          case "Tue":
            dayIndex = 3;
            break;
          case "Wed":
            dayIndex = 4;
            break;
          case "Thu":
            dayIndex = 5;
            break;
          case "Fri":
            dayIndex = 6;
            break;
          case "Sat":
            dayIndex = 7;
            break;
          default:
            break;
        }
        await scheduleRepeatingAlarmNotification(dayIndex, {
          hour: hours,
          minute: selectedMinute,
        });
      });
      Alert.alert("Alarms Set", "Multiple alarms have been scheduled.");
      // Alert.alert("Alarm Set", `Alarm set for ${alarmTime.toLocaleTimeString()}`);
      navigation.navigate("Alarm");
    } else {
      Alert.alert(
        "Incomplete Fields",
        "Please make sure all fields are filled in before continuing."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Alarm");
          }}
        >
          <Text style={styles.topText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.setAlarmTitle}>Set Alarm</Text>
        <TouchableOpacity onPress={handleSaveAlarm}>
          <Text style={styles.topText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scrollContainer}>
        <View style={styles.timePickerContainer}>
          <View style={styles.pickerRow}>
            <WheelPickerExpo
              height={150}
              width={80}
              initialSelectedIndex={selectedHour - 1}
              items={hours}
              onChange={({ index }) => setSelectedHour(hours[index].value)}
              selectedStyle={{ borderWidth: 2, borderColor: "#7C4DFF" }}
              backgroundColor="#F0FAFF"
              renderItem={(item: any, index: any) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 20,
                    color: index === selectedHour - 1 ? "#7C4DFF" : "#333", // Highlight selected item
                    fontWeight: index === selectedHour - 1 ? "bold" : "normal", // Bold if selected
                  }}
                >
                  {item.label}
                </Text>
              )}
            />

            <Text style={{ fontSize: 24 }}> : </Text>

            <WheelPickerExpo
              height={150}
              width={80}
              initialSelectedIndex={selectedMinute}
              items={minutes}
              onChange={({ index }) => setSelectedMinute(minutes[index].value)}
              selectedStyle={{ borderWidth: 2, borderColor: "#7C4DFF" }}
              backgroundColor="#F0FAFF"
              renderItem={(item: any, index: any) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 20,
                    color: index === selectedMinute ? "#7C4DFF" : "#333", // Highlight selected item
                    fontWeight: index === selectedMinute ? "bold" : "normal",
                  }}
                >
                  {item.label}
                </Text>
              )}
            />

            <WheelPickerExpo
              height={150}
              width={80}
              initialSelectedIndex={selectedAmPm === "AM" ? 0 : 1}
              items={amPmOptions}
              onChange={({ index }) =>
                setSelectedAmPm(amPmOptions[index].value)
              }
              selectedStyle={{ borderWidth: 2, borderColor: "#7C4DFF" }}
              backgroundColor="#F0FAFF"
              renderItem={(item: any, index: any) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 18,
                    color:
                      index === (selectedAmPm === "AM" ? 0 : 1)
                        ? "#7C4DFF"
                        : "#333", // Highlight selected item
                    fontWeight:
                      index === (selectedAmPm === "AM" ? 0 : 1)
                        ? "bold"
                        : "normal",
                  }}
                >
                  {item.label}
                </Text>
              )}
            />
          </View>
        </View>

        <View style={styles.durationContainer}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationButtons}>
            {durations.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.durationButton,
                  selectedDuration === time && styles.selectedDurationButton,
                ]}
                onPress={() => setSelectedDuration(time)}
              >
                <Text
                  style={[
                    styles.durationButtonText,
                    selectedDuration === time && styles.selectedDurationText,
                  ]}
                >
                  {time} mins
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.repeatContainer}>
          <Text style={styles.sectionTitle}>Repeat</Text>
          <View style={styles.daysRow}>
            {days.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  selectedDays.includes(day) && styles.selectedDayButton,
                ]}
                onPress={() => toggleDay(day)}
              >
                <Text
                  style={[
                    styles.dayButtonText,
                    selectedDays.includes(day) && styles.selectedDayText,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bodyPartContainer}>
          <Text style={styles.sectionTitle}>Select Body Part</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {bodyParts.map((part) => (
              <TouchableOpacity
                key={part.name}
                style={[
                  styles.bodyPart,
                  selectedBodyPart === part.name && styles.selectedBodyPart,
                ]}
                onPress={() => setSelectedBodyPart(part.name)}
              >
                <Image source={part.icon} style={styles.bodyPartIcon} />
                <Text style={styles.bodyPartText}>{part.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default SetAlarmScreen;
