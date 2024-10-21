import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0FAFF",
    flex: 1,
  },
  textLogo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  alarmContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  alarmTitle: {
    fontSize: 36,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#EBF0FF",

    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 20, // Adjust as needed
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingBottom: 0,
  },
  alarmText: {
    color: "#7B1FA2",
    fontSize: 16,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 8,
  },
  menuText: {
    fontSize: 28,
    color: "#000000",
  },
  dayRow: {
    marginTop: 12,
    paddingVertical: 8,
    backgroundColor: "#D5DBEE",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  dayText: {
    fontSize: 18,
    paddingHorizontal: 22,
  },
  activeDay: {
    color: "#000000",
    fontWeight: "bold",
  },
  inactiveDay: {
    color: "#9E9E9E",
  },
  plusButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#7C4DFF",
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  plusBg: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  plusButtonText: {
    fontSize: 30,
    color: "#FFFFFF",
    lineHeight: 35,
  },
});

export default styles;
