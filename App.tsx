import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCallState } from "./services/callState";

export default function App() {
  // custom hook
  const playSound = useCallState();

  return (
    <View style={styles.container}>
      <Text onPress={playSound}>Click here to play sound</Text>
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
});
