import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Colors } from "../constants/Colors";
import CustomButton from "../components/CustomButton";

export default function OtpVerificationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const phone = route.params?.phone ?? "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: any,
    index: number
  ) => {
    if (
      e.nativeEvent.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      Alert.alert(
        "Invalid OTP",
        "Please enter the complete 6-digit OTP."
      );
      return;
    }

    // Temporary verification
    navigation.replace("Daily Earnings");
  };

  const resendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimer(30);

    Alert.alert(
      "OTP Sent",
      "A new OTP has been sent successfully."
    );

    inputRefs.current[0]?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.iconContainer}>
          <MaterialIcons
            name="verified-user"
            size={60}
            color={Colors.primary}
          />
        </View>

        <Text style={styles.title}>
          OTP Verification
        </Text>

        <Text style={styles.subtitle}>
          Enter the OTP sent to
        </Text>

        <Text style={styles.phone}>
          +91 {phone}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={styles.otpBox}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) =>
                handleChange(text, index)
              }
              onKeyPress={(e) =>
                handleKeyPress(e, index)
              }
            />
          ))}
        </View>

        {timer > 0 ? (
          <Text style={styles.timer}>
            Resend OTP in {timer}s
          </Text>
        ) : (
          <TouchableOpacity onPress={resendOtp}>
            <Text style={styles.resend}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 30 }} />

        <CustomButton
          title="Verify OTP"
          onPress={verifyOtp}
          icon={
            <MaterialIcons
              name="verified"
              size={20}
              color={Colors.white}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginTop: 20,
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
    color: Colors.gray,
    fontSize: 16,
  },

  phone: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 40,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  otpBox: {
    width: 48,
    height: 58,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.white,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,

    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },

  timer: {
    textAlign: "center",
    color: Colors.gray,
    fontSize: 15,
  },

  resend: {
    textAlign: "center",
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});