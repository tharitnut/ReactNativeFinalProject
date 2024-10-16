import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { saveAlarm } from "../../services/product-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SetAlarmScreen = (): React.JSX.Element => {
  const [selectedDuration, setSelectedDuration] = useState<Number>(30); // Default 30 mins
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // No day selected initially
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(''); // Default no body part selected

  // List of durations
  const durations = [10, 20, 30, 40, 50, 60];

  // List of days
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // List of body parts
  const bodyParts = [
    { name: "Chest", icon: require("../../assets/chest-icon.png") },
    { name: "Back", icon: require("../../assets/back-icon.png") },
    { name: "Arms", icon: require("../../assets/arms-icon.png") },
    { name: "Abdominal", icon: require("../../assets/abs-icon.png") },
    { name: "Legs", icon: require("../../assets/legs-icon.png") },
    { name: "Shoulders", icon: require("../../assets/shoulders-icon.png") },
  ];

  // Toggle day selection
  const toggleDay = (day: string) => {
    setSelectedDays((prev: string[]) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Handle body part selection
  const handleBodyPartSelect = (partName: string) => {
    if (selectedBodyPart === partName) {
      // If the body part is already selected, unselect it
      setSelectedBodyPart(null);
    } else {
      // Otherwise, select the new body part
      setSelectedBodyPart(partName);
    }
  };

  // Define arrays for hours, minutes, and AM/PM as objects with `label` and `value`
  const hours = Array.from({ length: 12 }, (_, i) => ({
    label: i.toString(),
    value: i + 1,
  })); // [{ label: "0", value: 0 }, ..., { label: "11", value: 11 }]

  const minutes = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i,
  })); // [{ label: "00", value: 0 }, ..., { label: "59", value: 59 }]

  const amPmOptions = [
    { label: "AM", value: "AM" },
    { label: "PM", value: "PM" },
  ];

  // States for selected time
  const [selectedHour, setSelectedHour] = useState<number>(0); // Default hour
  const [selectedMinute, setSelectedMinute] = useState<number>(0o0); // Default minute
  const [selectedAmPm, setSelectedAmPm] = useState<string>("AM"); // Default AM/PM

  // Function to handle hour change
  const handleHourChange = (index: number) => {
    const hourValue = hours[index]?.value;
    if (hourValue !== undefined) {
      setSelectedHour(hourValue);
    }
  };

  // Function to handle minute change
  const handleMinuteChange = (index: number) => {
    const minuteValue = minutes[index]?.value;
    if (minuteValue !== undefined) {
      setSelectedMinute(minuteValue);
    }
  };

  // Function to handle AM/PM change
  const handleAmPmChange = (index: number) => {
    const amPmValue = amPmOptions[index]?.value;
    if (amPmValue !== undefined) {
      setSelectedAmPm(amPmValue);
    }
  };

  const handleSaveAlarm = async () => {
    const time = `${selectedHour-1}:${selectedMinute} ${selectedAmPm}`;
    // const user = AsyncStorage.getItem('@username')
    const username = 'Nigga5678'
    const setAlarm = {
      time: time,
      alarm: true,
      part: selectedBodyPart,
      day: selectedDays,
      durations: selectedDuration
    };
    const res = await saveAlarm(setAlarm,username)
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Text style={styles.topText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.setAlarmTitle}>Set Alarm</Text>
        <TouchableOpacity onPress={() => handleSaveAlarm()}>
          <Text style={styles.topText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scrollContainer}>
        {/* Time Picker */}
        <View style={styles.timePickerContainer}>
          <View style={styles.pickerRow}>
            {/* Hour Picker */}
            <WheelPickerExpo
              height={150}
              width={80}
              initialSelectedIndex={selectedHour}
              items={hours.map(({ label }) => ({
                label,
                value: label,
              }))}
              onChange={({ index }) => handleHourChange(index)}
              selectedStyle={{
                borderWidth: 2,
                borderColor: "#7C4DFF",
              }}
              backgroundColor="#F0FAFF"
              renderItem={(item, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 20,
                    color: index === selectedHour - 1 ? "#7C4DFF" : "#333", // Highlight selected item
                    fontWeight: index === selectedHour - 1 ? "bold" : "normal",
                  }}
                >
                  {item.label}
                </Text>
              )}
            />

            <Text style={{ fontSize: 24 }}> : </Text>

            {/* Minute Picker */}
            <WheelPickerExpo
              height={150}
              width={80}
              initialSelectedIndex={selectedMinute}
              items={minutes.map(({ label }) => ({
                label,
                value: label,
              }))}
              onChange={({ index }) => handleMinuteChange(index)}
              selectedStyle={{ borderWidth: 2, borderColor: "#7C4DFF" }}
              backgroundColor="#F0FAFF"
              renderItem={(item, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 20,
                    color: index === selectedHour - 1 ? "#7C4DFF" : "#333", // Highlight selected item
                    fontWeight: index === selectedHour - 1 ? "bold" : "normal",
                  }}
                >
                  {item.label}
                </Text>
              )}
            />

            {/* AM/PM Picker */}
            <WheelPickerExpo
              height={150}
              width={80}
              initialSelectedIndex={selectedAmPm === "AM" ? 0 : 1}
              items={amPmOptions.map(({ label }) => ({
                label,
                value: label,
                // You can optionally specify styles within each item, depending on the library.
              }))}
              onChange={({ index }) => handleAmPmChange(index)}
              selectedStyle={{ borderWidth: 2, borderColor: "#7C4DFF" }}
              backgroundColor="#F0FAFF"
              renderItem={(item, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 18,
                    color: index === selectedHour - 1 ? "#7C4DFF" : "#333", // Highlight selected item
                    fontWeight: index === selectedHour - 1 ? "bold" : "normal",
                  }}
                >
                  {item.label}
                </Text>
              )}
            />
          </View>
        </View>

        {/* Duration Buttons */}
        <View style={styles.durationContainer}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationButtons}>
            {durations.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.durationButton,
                  selectedDuration === time && styles.selectedDurationButton,
                  { flexBasis: "30%", marginBottom: 10, alignItems: "center" },
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

        {/* Repeat Buttons */}
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

        {/* Body Part Selection */}
        <View style={styles.bodyPartContainer}>
          <Text style={styles.sectionTitle}>Select Body Part</Text>
          <ScrollView
            contentContainerStyle={styles.bodyPartsRow}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {bodyParts.map((part) => (
              <TouchableOpacity
                key={part.name}
                style={[
                  styles.bodyPart,
                  selectedBodyPart === part.name && styles.selectedBodyPart, // Highlight if selected
                ]}
                onPress={() => handleBodyPartSelect(part.name)} // Select or unselect body part
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
