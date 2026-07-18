import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { DriverContext } from "../context/DriverContext";

export default function DriverDetailsScreen({
  route,
  navigation,
}: any) {
  const { driver } = route.params;

  const { deleteDriver } = useContext(DriverContext);

  const handleDelete = () => {
    Alert.alert(
      "Delete Driver",
      "Are you sure you want to delete this driver?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteDriver(driver.id);

            Alert.alert(
              "Success",
              "Driver deleted successfully."
            );

            navigation.navigate("View Drivers");
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.profile}>
          <MaterialIcons
            name="person"
            size={80}
            color="#2563EB"
          />

          <Text style={styles.name}>
            {driver.driverName}
          </Text>

          <Text
            style={[
              styles.status,
              {
                color:
                  driver.status === "Active"
                    ? "green"
                    : "red",
              },
            ]}
          >
            ● {driver.status}
          </Text>
        </View>

        <View style={styles.divider} />

        <DetailRow
          icon="phone"
          label="Mobile Number"
          value={driver.mobileNumber}
        />

        <DetailRow
          icon="badge"
          label="Aadhaar Number"
          value={driver.aadhaarNumber}
        />

        <DetailRow
          icon="credit-card"
          label="Licence Number"
          value={driver.licenseNumber}
        />

        <DetailRow
          icon="cake"
          label="Date of Birth"
          value={driver.dateOfBirth}
        />

        <DetailRow
          icon="location-on"
          label="Address"
          value={driver.address}
        />

        <DetailRow
          icon="directions-car"
          label="Vehicle Number"
          value={driver.vehicleNumber}
        />

        <DetailRow
          icon="calendar-month"
          label="Joining Date"
          value={driver.joiningDate}
        />

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("Edit Driver", {
              driver,
            })
          }
        >
          <Text style={styles.buttonText}>
            Edit Driver
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>
            Delete Driver
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.row}>
      <MaterialIcons
        name={icon}
        size={24}
        color="#2563EB"
      />

      <View style={{ marginLeft: 15 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  card: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },

  profile: {
    alignItems: "center",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
    color: "#111827",
  },

  status: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
    color: "#111827",
  },

  editButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});