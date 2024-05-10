import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCallState } from "./services/callState";

export default function App() {
  // custom hook
  const playSound = useCallState();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playSound} style={styles.button}>
        <Text>Touch here to play the GACHA sound</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    padding: 10,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
});
