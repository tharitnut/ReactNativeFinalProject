import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import { MediaType } from "react-native-image-picker";
import {
  getUserbyName,
  getUsername,
  insertProfile,
} from "../../services/product-service";

const ProfileScreen = (): React.JSX.Element => {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState<string | null>(null);
  const [userdata, setUserdata] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const formData = new FormData();

  useEffect(() => {
    const fetchUsername = async () => {
      const user = await getUsername();
      const res = await getUserbyName();
      setUsername(user);
      setUserdata(res.data.image);
    };
    fetchUsername();
  }, [selectedImage]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your gallery to proceed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);

      try {
        const formData = new FormData();
        const uriParts = imageUri.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("image", {
          uri: imageUri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        } as any);

        await insertProfile(formData);
      } catch (error: any) {
        console.error("Upload failed", error);
        const message = error.response?.data?.message || "Something went wrong.";
        Alert.alert("Upload Failed", message);
      }
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@username");
    navigation.navigate("LoginStack");
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
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.profileImage2}
            />
          ) : userdata ? (
            <Image
              source={{
                uri: `http://10.0.2.2:5000/${userdata.replace(/\\/g, "/")}`,
              }}
              style={styles.profileImage2}
            />
          ) : (
            <Image
              source={require("../../assets/default.png")}
              style={styles.profileImage}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.editProfile}
        onPress={() => {
          Alert.alert("Edit Profile", "Choose an option", [
            { text: "Cancel", onPress: () => {} },
            { text: "Choose from Device", onPress: pickImage },
          ]);
        }}
      >
        <Feather name="edit" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.profileName}>{username}</Text>
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
          onPress={async () => handleLogout()}
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
