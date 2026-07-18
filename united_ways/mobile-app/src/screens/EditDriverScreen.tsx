import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { DriverContext } from "../context/DriverContext";

export default function EditDriverScreen({ route, navigation }: any) {
  const { driver } = route.params;
  const { updateDriver } = useContext(DriverContext);

  const [driverName, setDriverName] = useState(driver.driverName);
  const [mobileNumber, setMobileNumber] = useState(driver.mobileNumber);
  const [aadhaarNumber, setAadhaarNumber] = useState(driver.aadhaarNumber);
  const [licenseNumber, setLicenseNumber] = useState(driver.licenseNumber);
  const [dateOfBirth, setDateOfBirth] = useState(driver.dateOfBirth);
  const [address, setAddress] = useState(driver.address);
  const [vehicleNumber, setVehicleNumber] = useState(driver.vehicleNumber);
  const [joiningDate, setJoiningDate] = useState(driver.joiningDate);
  const [status, setStatus] = useState(driver.status);

  const handleSave = () => {
    if (!driverName || !mobileNumber) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    updateDriver({
      id: driver.id,
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

    Alert.alert("Success", "Driver updated successfully!");

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Edit Driver</Text>

      <TextInput
        style={styles.input}
        value={driverName}
        onChangeText={setDriverName}
        placeholder="Driver Name"
      />

      <TextInput
        style={styles.input}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
        placeholder="Mobile Number"
      />

      <TextInput
        style={styles.input}
        value={aadhaarNumber}
        onChangeText={setAadhaarNumber}
        placeholder="Aadhaar Number"
      />

      <TextInput
        style={styles.input}
        value={licenseNumber}
        onChangeText={setLicenseNumber}
        placeholder="Licence Number"
      />

      <TextInput
        style={styles.input}
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
        placeholder="Date of Birth"
      />

      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />

      <TextInput
        style={styles.input}
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
        placeholder="Vehicle Number"
      />

      <TextInput
        style={styles.input}
        value={joiningDate}
        onChangeText={setJoiningDate}
        placeholder="Joining Date"
      />

      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
        placeholder="Status"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});