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
  },
  card: {
    backgroundColor: "#EBF0FF",
    padding: 16,
    borderRadius: 16,
    marginVertical: 30,
    marginHorizontal: 20, // Adjust as needed
  },
  textStat: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  iconRight: {
    marginTop: 10,
    marginStart: 160,
  },
  iconConfetti: {
    marginEnd: 15,
    marginTop: 10,
  },

  // BMI Calculator Styles
  bmiContainer: {
    backgroundColor: "#EBF0FF",
    padding: 20,
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 15,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    // elevation: 3,
  },
  textBMI: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#9747FF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  measurement: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  measurementText: {
    fontSize:16
  },
  bmiResult: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

});

export default styles;
