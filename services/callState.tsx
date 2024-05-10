// callState.tsx
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import CallKeep from "react-native-callkeep";
import { PermissionsAndroid, Platform } from "react-native";

export const useCallState = () => {
  const [sound, setSound] = useState<Audio.Sound>();

  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../raw/GACHA.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  useEffect(() => {
    const checkPermissions = async () => {
      if (Platform.OS === "android") {
        try {
          // Request necessary permissions for Android
          const readPhoneStatePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
          );
          const answerPhoneCallsPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ANSWER_PHONE_CALLS
          );

          if (
            readPhoneStatePermission === PermissionsAndroid.RESULTS.GRANTED &&
            answerPhoneCallsPermission === PermissionsAndroid.RESULTS.GRANTED
          ) {
            // Permissions granted, register event listeners for call state changes
            const subscription = CallKeep.addEventListener(
              "answerCall",
              (event) => {
                console.log("Incoming call received");
                playSound();
              }
            );

            return () => {
              // Clean up event subscription
              subscription.remove();
            };
          } else {
            console.log("Permissions denied");
          }
        } catch (error) {
          console.error("Error requesting permissions:", error);
        }
      } else {
        // For platforms other than Android, register event listeners without checking permissions
        const subscription = CallKeep.addEventListener(
          "answerCall",
          (event) => {
            console.log("Incoming call received");
            playSound();
          }
        );

        return () => {
          // Clean up event subscription
          subscription.remove();
        };
      }
    };

    checkPermissions();

    // Cleanup function
    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload the sound when the component unmounts
      }
    };
  }, []);

  return playSound;
};
