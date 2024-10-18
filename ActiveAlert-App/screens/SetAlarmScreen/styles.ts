import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0FAFF",
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row", // Horizontally align items
    justifyContent: "space-between", // Spread "Cancel", "Set Alarm", and "Save"
    alignItems: "center", // Vertically center the texts
    marginTop: 70,
    marginHorizontal: 20, // Padding on sides
  },
  topText: {
    color: "#7B1FA2",
    fontSize: 16,
  },
  setAlarmTitle: {
    fontSize: 36,
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  alarmNameContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  alarmNameText: {
    fontSize: 18,
    color: "#1E1E22",
    marginEnd: 10,
  },
  editIcon: {
    fontSize: 18,
  },
  timePickerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  colon: {
    fontSize: 48,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  selectedText: {
    fontSize: 30,
    color: "#000",
  },

  timeText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  ampmText: {
    fontSize: 24,
    marginTop: -10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginStart: 10,
  },
  durationContainer: {
    marginBottom: 20,
  },
  durationButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  durationButton: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 8,
    margin: 5,
  },
  selectedDurationButton: {
    backgroundColor: "#7C4DFF",
  },
  durationButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  selectedDurationText: {
    fontWeight: "bold",
  },
  repeatContainer: {
    marginBottom: 20,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayButton: {
    padding: 10,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
  },
  selectedDayButton: {
    backgroundColor: "#7C4DFF",
  },
  dayButtonText: {
    fontSize: 16,
  },
  selectedDayText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  bodyPartContainer: {
    marginBottom: 20,
  },
  bodyPartsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bodyPart: {
    alignItems: "center",
    marginHorizontal: 5,
    padding:5
  },
  bodyPartIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  bodyPartText: {
    marginTop: 5,
    fontSize: 14,
  },
  selectedBodyPart: {
    borderWidth: 2,
    borderColor: "#7C4DFF", // Highlight the selected body part with a purple border
    borderRadius: 10,
  },
});

export default styles;
