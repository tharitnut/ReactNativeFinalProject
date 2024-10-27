import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const FirstScreen = (): React.JSX.Element => {
  const navigation = useNavigation<any>();

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
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.signupText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FirstScreen;
