import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

const FirstScreen = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/AppText.png")}
        style={styles.appText}
      ></Image>
      <Image
        source={require("../../assets/Logo.png")}
        style={styles.logo}
      ></Image>
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FirstScreen;
