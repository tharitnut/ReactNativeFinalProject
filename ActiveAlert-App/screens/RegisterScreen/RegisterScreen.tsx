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
import styles from "./styles";
import React, { useState } from "react";
import { Text, Input, Icon } from "@rneui/base";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { register } from "../../services/product-service";

const RegisterScreen = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

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
    confirmPassword: yup
      .string()
      .required("Please input password")
      .min(6, "Password must be at least 6 characters.")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const onRegister = async (data: any) => {
    try {
      const res = await register(data.username, data.password);
      if (res.status === 200) {
        console.log("Login successfully!!");
        // navigation.navigate
      }
    } catch (error: any) {}
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageBackground
          source={require("../../assets/Sign_up.png")}
          style={styles.bgImage}
          resizeMode="cover"
        >
          <SafeAreaView>
            <TouchableOpacity style={styles.backIcon}>
              <Ionicons name="arrow-back-outline" size={30} color="#1D1B20" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.helloText}>Hello,</Text>
              <Text style={styles.signUpText}>Sign Up!</Text>
            </View>

            <View style={styles.newAccContainer}>
              <Text style={styles.newAccText}>New</Text>
              <Text style={styles.newAccText}>Account</Text>
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

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    placeholder="Confirm Password"
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
                    errorMessage={errors.confirmPassword?.message}
                  />
                )}
              />

              {/* Sign Up Button */}
              <TouchableOpacity
                style={[
                  styles.signUpButton,
                  { opacity: isSubmitting ? 0.6 : 1 }, // Adjust opacity when submitting
                ]}
                onPress={handleSubmit(onRegister)}
                disabled={!isValid || isSubmitting}
                accessible={true}
                accessibilityLabel="Sign Up"
                accessibilityHint="Completes your sign-up process"
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.signUpButtonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.memberContainer}>
              <Text style={styles.text}>Already have an account?</Text>
            </View>
            <TouchableOpacity style={{ alignItems: "center" }}>
              <Text
                style={[
                  styles.text,
                  { color: "#7C4DFF", textDecorationLine: "underline" },
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
