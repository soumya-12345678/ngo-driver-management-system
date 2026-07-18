import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../constants/Colors";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

export default function DriverLoginScreen() {
  const navigation = useNavigation<any>();

  const [phone, setPhone] = useState("");

  const sendOtp = () => {
    const trimmedPhone = phone.trim();

    if (!/^[0-9]{10}$/.test(trimmedPhone)) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    navigation.navigate("OTP Verification", {
      phone: trimmedPhone,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="local-taxi"
              size={60}
              color={Colors.primary}
            />
          </View>

          <Text style={styles.title}>Driver Login</Text>

          <Text style={styles.subtitle}>
            Enter your registered mobile number to receive an OTP.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <CustomInput
            label="Mobile Number"
            placeholder="Enter 10-digit mobile number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            maxLength={10}
            leftIcon={
              <MaterialIcons
                name="phone"
                size={22}
                color={Colors.primary}
              />
            }
          />

          <View style={{ height: 25 }} />

          <CustomButton
            title="Send OTP"
            onPress={sendOtp}
            icon={
              <MaterialIcons
                name="send"
                size={20}
                color={Colors.white}
              />
            }
          />
        </View>
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

  header: {
    alignItems: "center",
    marginBottom: 50,
  },

  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",

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
    marginTop: 20,
  },

  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    lineHeight: 22,
  },

  form: {
    width: "100%",
  },
});