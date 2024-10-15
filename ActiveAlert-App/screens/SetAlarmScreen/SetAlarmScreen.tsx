import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import WheelPickerExpo from 'react-native-wheel-picker-expo';

const SetAlarmScreen = (): React.JSX.Element => {
  const [selectedDuration, setSelectedDuration] = useState(30); // Default 30 mins
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // No day selected initially
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null); // Default no body part selected

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
  const [selectedHour, setSelectedHour] = useState<number>(5); // Default hour
  const [selectedMinute, setSelectedMinute] = useState<number>(30); // Default minute
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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Text style={styles.topText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.setAlarmTitle}>Set Alarm</Text>
        <TouchableOpacity>
          <Text style={styles.topText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scrollContainer}>
        {/* Alarm Name */}
        <View style={styles.alarmNameContainer}>
          <Text style={styles.alarmNameText}>Alarm Name</Text>
          <TouchableOpacity >
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Time Picker */}
        <View style={styles.timePickerContainer}>
          <View style={styles.pickerRow}>
            {/* Hour Picker */}
            <WheelPickerExpo
              height={150}
              width={80}
              initialSelectedIndex={selectedHour-1}
              items={hours.map(({ label }) => ({ label }))}
              onChange={handleHourChange}
              selectedStyle={{ color: 'blue', fontWeight: 'bold' }}
              style={{ backgroundColor: '#F0FAFF' }}
            />

            <Text style={{ fontSize: 24 }}> : </Text>

            {/* Minute Picker */}
            <WheelPickerExpo
              height={150}
              width={80}
              initialSelectedIndex={selectedMinute}
              items={minutes.map(({ label }) => ({ label }))}
              onChange={handleMinuteChange}
              selectedStyle={{ color: 'blue', fontWeight: 'bold' }}
              style={{ backgroundColor: '#F0FAFF' }}
            />

            {/* AM/PM Picker */}
            <WheelPickerExpo
              height={150}
              width={80}
              initialSelectedIndex={selectedAmPm === "AM" ? 0 : 1}
              items={amPmOptions.map(({ label }) => ({ label }))}
              onChange={handleAmPmChange}
              selectedStyle={{ color: 'blue', fontWeight: 'bold' }}
              style={{ backgroundColor: '#F0FAFF' }}
            />
          </View>
        </View>

        {/* Duration Buttons */}
        <View style={styles.durationContainer}>
          <Text style={styles.sectionTitle}>Time</Text>
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
          <View style={styles.bodyPartsRow}>
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
          </View>
        </View>
      </View>
    </View>
  );
};

export default SetAlarmScreen;
