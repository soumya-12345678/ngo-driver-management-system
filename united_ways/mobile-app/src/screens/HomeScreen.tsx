import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../constants/Colors";
import CustomButton from "../components/CustomButton";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <MaterialIcons
            name="local-shipping"
            size={70}
            color={Colors.primary}
          />

          <Text style={styles.title}>
            NGO Driver App
          </Text>

          <Text style={styles.subtitle}>
            Livelihood Tracking System
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Driver Login"
            onPress={() => navigation.navigate("Driver Login")}
          />

          <View style={{ height: 15 }} />

          <CustomButton
            title="NGO Owner Login"
            onPress={() => navigation.navigate("Owner Login")}
            backgroundColor={Colors.accent}
          />
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          United Ways Bengaluru
        </Text>
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
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 70,
  },

  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 17,
    color: Colors.gray,
    textAlign: "center",
  },

  buttonContainer: {
    marginBottom: 40,
  },

  footer: {
    textAlign: "center",
    color: Colors.gray,
    fontSize: 14,
    marginBottom: 10,
  },
});