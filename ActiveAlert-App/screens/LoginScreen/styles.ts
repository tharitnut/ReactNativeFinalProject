import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0FAFF",
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  bgImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
  backIcon: {
    paddingTop: 50,
    paddingLeft: 20,
  },
  titleContainer: {
    paddingTop: 50,
    marginLeft: 50,
  },
  helloText: {
    fontSize: 36,
    fontWeight: "400",
  },
  loginText: {
    fontSize: 62,
    fontWeight: "bold",
  },
  welcomeContainer: {
    alignItems: "center",
    paddingTop: 110,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "700",
  },
  memberContainer: {
    alignItems: "center",
  },
  text: {
    alignItems: "center",
    fontSize: 21,
    fontWeight: "700",
  },
  content: {
    margin: 40,
  },
  loginButton: {
    borderRadius: 50,
    backgroundColor: "#6834D4",
    height: 70,
    width: "100%", // Make button full width
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // For shadow effect in Android
    shadowColor: "#000", // For shadow effect in iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
  },
});

export default styles;
