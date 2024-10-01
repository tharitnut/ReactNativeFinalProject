import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0FAFF",
    flex: 1,
  },
  innerContainer: {
    alignItems: "center",
  },
  textLogo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  dontStop: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30,
    borderRadius: 15,
    marginHorizontal: 60,
  },
  dontText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginEnd: 10,
  },
  card: {
    backgroundColor: "#EBF0FF",
    padding: 16,
    borderRadius: 16,
    marginVertical: 30,
    marginHorizontal: 20, // Adjust as needed
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingVertical: 8,
    backgroundColor: "#CFD8DC",
    borderRadius: 10,
  },
  dayText: {
    fontSize: 18,
    paddingHorizontal: 6,
  },
  activeDay: {
    color: "#000000",
    fontWeight: "bold",
  },
  inactiveDay: {
    color: "#9E9E9E",
  },
});

export default styles;
