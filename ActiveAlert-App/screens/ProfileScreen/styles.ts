import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0FAFF",
    flex: 1,
  },
  textLogo: {
    fontSize: 22,
    fontWeight:  "bold",
  },
  circleBorder: {
    backgroundColor: "#D5DBEE",
    borderRadius: 90,
    marginTop: 70,
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 120,
    height: 120,

    padding: 30,
  },
  profileName: {
    fontSize: 30,
    padding: 30,
  },
  statButton: {
    flexDirection: "row",
    padding: 15,
    marginTop: 30,
    backgroundColor: "#6834D4",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    height: 70,
    width: 300,
  },
  logoutButton: {
    flexDirection: "row",
    padding: 15,
    marginTop: 40,
    backgroundColor: "#EBF0FF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    height: 70,
    width: 300,
  },
  statButtonText: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
  },
  logoutButtonText: {
    color: "black",
    fontSize: 20,
    marginLeft: 10,
  },
});

export default styles;
