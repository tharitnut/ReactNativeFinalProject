import { View, Text } from 'react-native'
import React from 'react'
import styles from "./styles";

const StatsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 70, marginStart: 30 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.textLogo, { color: "#1E1E22" }]}>Active</Text>
          <Text style={[styles.textLogo, { color: "#7C4DFF" }]}>Alert</Text>
        </View>
      </View>
    </View>
  )
}

export default StatsScreen