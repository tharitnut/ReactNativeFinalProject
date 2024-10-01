import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F0FAFF",
    width: "100%",
    height: "100%",
  },
  appText: {
    alignItems: "center",
    resizeMode: "contain",
    height: 150,
    width: 300,
    marginTop: 45,
  },
  logo: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoName: {
    marginTop: 90,
    fontSize: 62,
    fontWeight: "bold",
  },
  loginButton: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "#F0FAFF",
    borderColor: "#6834D4",
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center", // Vertically center both icon and text
    height: 70,
    width: 300,
  },
  loginText: {
    alignItems: "center",
    color: "#6834D4",
    fontSize: 24,
    fontWeight: "bold",
  },
  signupButton: {
    padding: 15,
    marginTop: 20,
    backgroundColor: "#6834D4",
    borderRadius: 50,
    alignItems: "center", // Vertically center both icon and text
    height: 70,
    width: 300,
  },
  signupText: {
    alignItems: "center",
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default styles;
