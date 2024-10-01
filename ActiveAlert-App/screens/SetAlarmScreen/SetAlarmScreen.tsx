import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import styles from "./styles";

const SetAlarmScreen = () => {
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
  // Toggle day selection with TypeScript
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

      <ScrollView style={styles.scrollContainer}>
        {/* Alarm Name */}
        <View style={styles.alarmNameContainer}>
          <Text style={styles.alarmNameText}>Alarm Name</Text>
          <TouchableOpacity>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Time Picker */}
        <View style={styles.timePickerContainer}>
          <Text style={styles.timeText}>05 : 30</Text>
          <Text style={styles.ampmText}>AM</Text>
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
      </ScrollView>
    </View>
  );
};

export default SetAlarmScreen;
