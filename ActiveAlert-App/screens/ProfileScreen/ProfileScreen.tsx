import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraType, useCameraPermissions } from "expo-camera";
import Feather from "@expo/vector-icons/Feather";
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
} from "react-native-image-picker";

const profileImage = require("../../assets/ProfileIcon.png");

const ProfileScreen = (): React.JSX.Element => {
  const navigation = useNavigation<any>();

  const [selectedImage, setSelectedImage] = useState(profileImage);
  const [permission, requestPermission] = useCameraPermissions();

  const imageOptions = {
    mediaType: "photo" as MediaType,
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  const handleRequestPermission = async () => {
    if (!permission) {
      // Camera permissions are still loading
      return false;
    }

    if (!permission.granted) {
      // Request camera permissions
      const { status } = await requestPermission();
      return status === "granted";
    }

    return true;
  };

  const openImagePicker = async () => {
    const hasPermission = await handleRequestPermission();
    if (hasPermission) {
      launchImageLibrary(imageOptions, handleResponse);
    }
  };

  const handleCameraLaunch = async () => {
    const hasPermission = await handleRequestPermission();
    if (hasPermission) {
      launchCamera(imageOptions, handleResponse);
    }
  };

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log("User cancelled image picker");
    } else if (response.errorMessage) {
      console.error("Image picker error: ", response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const imageUri = response.assets[0].uri;
      setSelectedImage(imageUri);
    } else {
      console.warn("Unexpected response structure: ", response);
    }
  };

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
      </View>
      <TouchableOpacity
        style={styles.editProfile}
        onPress={() => {
          Alert.alert("Edit Profile", "Choose an option", [
            { text: "Choose from Device", onPress: openImagePicker },
            { text: "Open Camera", onPress: handleCameraLaunch },
          ]);
        }}
      >
        <Feather name="edit" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
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
            navigation.navigate("FirstProfileScreen");
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
