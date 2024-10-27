import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient"; // Use expo's LinearGradient
import "react-circular-progressbar/dist/styles.css"; //progressbar
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const manImage = require("../../assets/man.png");
const iconConfetti = require("../../assets/fi-sr-confetti.png");

const HomeScreen = (): React.JSX.Element => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [progress, setProgress] = useState(0);

  // BMI state management
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // BMI Calculation
  const calculateBMI = (): void => {
    const h = parseFloat(height) / 100; // Convert height from cm to meters
    const w = parseFloat(weight);

    if (!isNaN(h) && !isNaN(w) && h > 0) {
      const bmiValue = w / (h * h);
      setBmi(parseFloat(bmiValue.toFixed(1))); // Round to 1 decimal place
    }
  };

  // Function to get the color based on the BMI value
  const getBMIColor = (bmi: number): string => {
    if (bmi < 18.5) return "orange";
    if (bmi > 25) return "red";
    return "green";
  };

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 70, marginStart: 30 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.textLogo, { color: "#1E1E22" }]}>Active</Text>
          <Text style={[styles.textLogo, { color: "#7C4DFF" }]}>Alert</Text>
        </View>
      </View>
      <View style={styles.innerContainer}>
        <LinearGradient
          colors={["#9747FF", "#6F00FF"]} // Define your gradient colors here
          style={styles.dontStop} // Apply the existing style
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.dontText}>
              Don't stop when{"\n"}you're tired STOP{"\n"}when you're DONE
            </Text>
            <Image
              source={manImage}
              style={{ marginBottom: -20, marginStart: 30 }}
            ></Image>
          </View>
        </LinearGradient>
      </View>

      {/* BMI Cal */}
      <View style={styles.bmiContainer}>
        <Text style={styles.textBMI}>BMI Calculator</Text>

        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <Text>Height (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            placeholder="Enter height"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            placeholder="Enter weight"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        <View style={styles.measurement}>
          <Text style={[styles.measurementText, { color: "orange" }]}>
            Underweight
          </Text>
          <Text style={[styles.measurementText, { color: "green" }]}>
            Normal
          </Text>
          <Text style={[styles.measurementText, { color: "red" }]}>
            Overweight
          </Text>
        </View>

        {bmi !== null && (
          <Text style={[styles.bmiResult, { color: getBMIColor(bmi) }]}>
            {bmi}
          </Text>
        )}
      </View>

      {/* My Stats */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate("StatsScreen");
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image source={iconConfetti} style={styles.iconConfetti} />
          <Text style={styles.textStat}>My Stats</Text>
          <AntDesign
            name="right"
            size={20}
            color="black"
            style={styles.iconRight}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
