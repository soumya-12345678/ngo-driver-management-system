import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Colors } from "../constants/Colors";

export default function DailyEarningsScreen() {
  const [earnings, setEarnings] = useState("");
  const [trips, setTrips] = useState("");
  const [remarks, setRemarks] = useState("");

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleSubmit = () => {
    if (!earnings || !trips) {
      Alert.alert(
        "Validation",
        "Please fill all the required fields."
      );
      return;
    }

    Alert.alert(
      "Success",
      "Daily earnings submitted successfully!"
    );

    setEarnings("");
    setTrips("");
    setRemarks("");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* Welcome Card */}

      <View style={styles.headerCard}>
        <Text style={styles.welcome}>
          👋 Welcome, Driver
        </Text>

        <Text style={styles.date}>
          {today}
        </Text>
      </View>

      {/* Form Card */}

      <View style={styles.formCard}>
        <Text style={styles.title}>
          Daily Earnings
        </Text>

        <Text style={styles.label}>
          💰 Today's Earnings (₹)
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter today's earnings"
          keyboardType="numeric"
          value={earnings}
          onChangeText={setEarnings}
        />

        <Text style={styles.label}>
          🚖 Number of Trips
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter number of trips"
          keyboardType="numeric"
          value={trips}
          onChangeText={setTrips}
        />

        <Text style={styles.label}>
          📝 Remarks (Optional)
        </Text>

        <TextInput
          style={[styles.input, styles.remarks]}
          placeholder="Enter remarks..."
          multiline
          numberOfLines={4}
          value={remarks}
          onChangeText={setRemarks}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>
            ✓ Submit Earnings
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  headerCard: {
    backgroundColor: Colors.primary,
    padding: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  date: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
  },

  formCard: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: Colors.primary,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },

  remarks: {
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});