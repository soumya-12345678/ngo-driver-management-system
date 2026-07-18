import React, { useState, useContext } from "react";
import { DriverContext } from "../context/DriverContext";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

export default function RegisterScreen() {
  const { addDriver } = useContext(DriverContext);

  const [driverName, setDriverName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [status, setStatus] = useState("Active");

  const handleContinue = () => {
    if (
      !driverName ||
      !mobileNumber ||
      !aadhaarNumber ||
      !licenseNumber ||
      !dateOfBirth ||
      !address ||
      !vehicleNumber ||
      !joiningDate
    ) {
      Alert.alert(
        "Incomplete Details",
        "Please fill in all the required fields."
      );
      return;
    }

    if (mobileNumber.length !== 10) {
      Alert.alert(
        "Invalid Mobile Number",
        "Mobile number must contain exactly 10 digits."
      );
      return;
    }

    if (aadhaarNumber.length !== 12) {
      Alert.alert(
        "Invalid Aadhaar Number",
        "Aadhaar number must contain exactly 12 digits."
      );
      return;
    }

    // Save Driver to Context
    addDriver({
      id: Date.now().toString(),
      driverName,
      mobileNumber,
      aadhaarNumber,
      licenseNumber,
      dateOfBirth,
      address,
      vehicleNumber,
      joiningDate,
      status,
    });

    Alert.alert(
      "Driver Registered",
      `${driverName} has been registered successfully!`
    );

    // Clear the form
    setDriverName("");
    setMobileNumber("");
    setAadhaarNumber("");
    setLicenseNumber("");
    setDateOfBirth("");
    setAddress("");
    setVehicleNumber("");
    setJoiningDate("");
    setStatus("Active");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Driver Registration</Text>
        <Text style={styles.subtitle}>
          Enter the driver's details
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Driver Name</Text>
        <TextInput
          placeholder="Enter driver's name"
          value={driverName}
          onChangeText={setDriverName}
          style={styles.input}
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          style={styles.input}
        />

        <Text style={styles.label}>Aadhaar Number</Text>
        <TextInput
          placeholder="Enter Aadhaar number"
          keyboardType="numeric"
          maxLength={12}
          value={aadhaarNumber}
          onChangeText={setAadhaarNumber}
          style={styles.input}
        />

        <Text style={styles.label}>Driving Licence Number</Text>
        <TextInput
          placeholder="Enter licence number"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
          style={styles.input}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          placeholder="DD/MM/YYYY"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          style={styles.input}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          placeholder="Enter address"
          multiline
          numberOfLines={4}
          value={address}
          onChangeText={setAddress}
          style={[styles.input, styles.textArea]}
        />

        <Text style={styles.label}>Vehicle Registration Number</Text>
        <TextInput
          placeholder="KA01AB1234"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
          style={styles.input}
        />

        <Text style={styles.label}>Joining Date</Text>
        <TextInput
          placeholder="DD/MM/YYYY"
          value={joiningDate}
          onChangeText={setJoiningDate}
          style={styles.input}
        />

        <Text style={styles.label}>Status</Text>
        <TextInput
          placeholder="Active"
          value={status}
          onChangeText={setStatus}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Register Driver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    backgroundColor: "#2563EB",
    padding: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 4,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 8,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#2563EB",
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});