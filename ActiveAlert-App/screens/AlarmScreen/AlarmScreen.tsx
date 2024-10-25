import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import {
  changeAlert,
  deleteAlarm,
  fetchtAlarm,
} from "../../services/product-service";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

const AlarmScreen = (): React.JSX.Element => {
  const [alarmData, setAlarmData] = useState<any[]>([]);
  const [activeSwitch, setActiveSwitch] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedAlarm, setSelectedAlarm] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>();

  const navigation = useNavigation<any>();

  async function getData() {
    try {
      const data = await fetchtAlarm();
      setAlarmData(data.data.alarm);
      setIsRefreshing(true);
    } catch (error) {
    } finally {
      setIsRefreshing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const toggleSwitch = async (index: number) => {
    setActiveSwitch((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    const response = await changeAlert(index, activeSwitch);
  };

  const handleMenuButtonClick = (index: number) => {
    setSelectedAlarm(index);
    setIsModalVisible(true);
  };

  const handleDeleteAlarm = (index: Number | null) => {
    Alert.alert("Delete Alarm", "Are you sure you want to delete this alarm?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          setAlarmData((prevAlarms) =>
            prevAlarms.filter((_, i) => i !== selectedAlarm)
          );
          setIsModalVisible(false);
          deleteAlarm(index);
        },
        style: "destructive",
      },
    ]);
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const date = new Date(item.time);
    return (
      <View style={[styles.card]}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.alarmText}>{item.part} Workout</Text>
            <Text style={styles.timeText}>
              {date.getHours()}:{String(date.getMinutes()).padStart(2, "0")}{" "}
              {item.timeFormat}
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#9747FF" }}
            thumbColor={activeSwitch[index] ? "#FFFFFF" : "#f4f3f4"}
            onValueChange={() => toggleSwitch(index)}
            style={{
              transform: [{ scaleX: 2 }, { scaleY: 2 }],
              marginStart: 80,
            }}
            value={!activeSwitch[index]}
          />
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              handleMenuButtonClick(index);
              setSelectedIndex(index);
            }}
          >
            <Text style={styles.menuText}>⋮</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dayRow}>
          <Text style={styles.dayText}>
            {item.day.map((data: string, i: number) => (
              <Text key={i} style={{ color: "#7C6B6B" }}>
                {data}{" "}
              </Text>
            ))}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 70, marginStart: 30 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.textLogo, { color: "#1E1E22" }]}>Active</Text>
          <Text style={[styles.textLogo, { color: "#7C4DFF" }]}>Alert</Text>
        </View>
      </View>
      <View style={styles.alarmContainer}>
        <Text style={styles.alarmTitle}>Alarm</Text>
      </View>

      <FlatList
        data={alarmData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onRefresh={getData}
        refreshing={isRefreshing}
      />

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => {
          navigation.navigate("SetAlarm");
        }}
      >
        <LinearGradient colors={["#9747FF", "#6F00FF"]} style={styles.plusBg}>
          <Text style={styles.plusButtonText}>+</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => handleDeleteAlarm(selectedIndex ?? null)}
          >
            <Text style={styles.modalText}>Delete Alarm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Text style={styles.modalText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default AlarmScreen;
