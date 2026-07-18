import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface DriverCardProps {
  driver: {
    id: string;
    driverName: string;
    mobileNumber: string;
    vehicleNumber: string;
    licenseNumber: string;
    aadhaarNumber: string;
    dateOfBirth: string;
    address: string;
    joiningDate: string;
    status: string;
  };
}

export default function DriverCard({
  driver,
}: DriverCardProps) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("Driver Details", {
          driver,
        })
      }
    >
      <View style={styles.card}>
        <View style={styles.row}>
          <MaterialIcons
            name="person"
            size={28}
            color="#2563EB"
          />

          <View style={styles.details}>
            <Text style={styles.name}>
              {driver.driverName}
            </Text>

            <Text style={styles.info}>
              📞 {driver.mobileNumber}
            </Text>

            <Text style={styles.info}>
              🚖 {driver.vehicleNumber}
            </Text>

            <Text style={styles.info}>
              🪪 {driver.licenseNumber}
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

          <MaterialIcons
            name="chevron-right"
            size={30}
            color="#9CA3AF"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  info: {
    fontSize: 15,
    marginTop: 5,
    color: "#555",
  },

  status: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 15,
  },
});