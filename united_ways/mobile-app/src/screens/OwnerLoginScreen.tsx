import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../constants/Colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function OwnerLoginScreen() {
  const navigation = useNavigation<any>();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!/^[0-9]{10}$/.test(mobile)) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (password.trim().length < 6) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 6 characters."
      );
      return;
    }

    // Temporary login until backend integration
    if (mobile === "9876543210" && password === "admin123") {
      navigation.replace("Dashboard");
    } else {
      Alert.alert(
        "Login Failed",
        "Invalid mobile number or password."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="admin-panel-settings"
              size={60}
              color={Colors.primary}
            />
          </View>

          <Text style={styles.title}>
            NGO Owner Login
          </Text>

          <Text style={styles.subtitle}>
            Login to manage drivers and view reports.
          </Text>
        </View>

        <CustomInput
          label="Mobile Number"
          placeholder="Enter 10-digit mobile number"
          value={mobile}
          onChangeText={setMobile}
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

        <CustomInput
          label="Password"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon={
            <MaterialIcons
              name="lock"
              size={22}
              color={Colors.primary}
            />
          }
        />

        <View style={{ height: 15 }} />

        <CustomButton
          title="Login"
          onPress={handleLogin}
          icon={
            <MaterialIcons
              name="login"
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
    marginTop: 10,
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },
});