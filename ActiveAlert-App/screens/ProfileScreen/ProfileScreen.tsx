import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginStackScreen } from "../../components/MainNavigator";

const profileImage = require("../../assets/ProfileIcon.png");

const ProfileScreen = (): React.JSX.Element => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 70, marginStart: 30 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.textLogo, { color: "#1E1E22" }]}>Active</Text>
          <Text style={[styles.textLogo, { color: "#7C4DFF" }]}>Alert</Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={styles.circleBorder}>
          <Image source={profileImage} style={styles.profileImage} />
        </View>
        <Text style={styles.profileName}>David Sanchez</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={styles.statButton}
          onPress={() => {
            navigation.navigate("StatsScreen");
          }}
        >
          <MaterialIcons name="fire" size={24} color="#EBF0FF" />
          <Text style={styles.statButtonText}> My Stats</Text>
          <MaterialIcons
            style={{ marginStart: 130 }}
            name="arrow-right"
            size={24}
            color="#EBF0FF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            await AsyncStorage.removeItem("@username");
            navigation.navigate('FirstProfileScreen')
          }}
        >
          <MaterialIcons name="logout" size={24} color="#C847F4" />
          <Text style={styles.logoutButtonText}> Logout</Text>
          <MaterialIcons
            style={{ marginStart: 140 }}
            name="arrow-right"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
