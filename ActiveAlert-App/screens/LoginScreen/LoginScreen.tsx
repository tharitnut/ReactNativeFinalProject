import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { Text, Input, Icon } from "@rneui/base";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../../services/product-service";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation<any>();

  // 1. define validation schema with Yup
  const schema = yup.object().shape({
    username: yup
      .string()
      .min(2, "Minimum 2 characters")
      .max(20, "Maximum 20 characters")
      .required("You must enter a username"),
    password: yup
      .string()
      .required("Please input password")
      .min(6, "Password must be at least 6 characters."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onLogin = async (data: any) => {
    try {
      const res = await login(data.username, data.password);
      if (res.status === 200) {
        console.log("Login successfully!!");
        navigation.navigate("TabContainer");
      }
    } catch (error: any) {}
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageBackground
          source={require("../../assets/Login.png")}
          style={styles.bgImage}
          resizeMode="cover"
        >
          <SafeAreaView>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => {
                navigation.navigate("FirstScreen");
              }}
            >
              <Ionicons name="arrow-back-outline" size={30} color="#1D1B20" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.helloText}>Hello,</Text>
              <Text style={styles.loginText}>Login!</Text>
            </View>

            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome Back!!</Text>
            </View>
            <View style={styles.content}>
              {/* Input Username */}
              <Controller
                name="username"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    placeholder="Username"
                    rightIcon={{ name: "person-outline" }}
                    keyboardType="default"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.username?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    placeholder="Password"
                    rightIcon={
                      <Icon
                        name={showPassword ? "eye" : "eye-off"}
                        type="feather"
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    keyboardType="default"
                    secureTextEntry={!showPassword}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  { opacity: isSubmitting ? 0.6 : 1 }, // Adjust opacity when submitting
                ]}
                onPress={handleSubmit(onLogin)}
                disabled={!isValid || isSubmitting}
                accessible={true}
                accessibilityLabel="Login"
                accessibilityHint="Completes your login process"
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.memberContainer}>
              <Text style={styles.text}>Not a member yet?</Text>
            </View>
            <TouchableOpacity style={{ alignItems: "center" }}>
              <Text
                style={[
                  styles.text,
                  { color: "#7C4DFF", textDecorationLine: "underline" },
                ]}
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
