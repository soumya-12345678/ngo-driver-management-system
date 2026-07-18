import React, { useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { DriverContext } from "../context/DriverContext";
import { Colors } from "../constants/Colors";

export default function ReportsScreen() {
  const { drivers } = useContext(DriverContext);

  const totalDrivers = drivers.length;

  const activeDrivers = drivers.filter(
    (driver) => driver.status === "Active"
  ).length;

  const inactiveDrivers = totalDrivers - activeDrivers;

  const activePercentage =
    totalDrivers === 0
      ? 0
      : Math.round((activeDrivers / totalDrivers) * 100);

  const inactivePercentage =
    totalDrivers === 0
      ? 0
      : Math.round((inactiveDrivers / totalDrivers) * 100);

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Driver Reports
      </Text>

      <View style={styles.card}>
        <ReportItem
          icon="groups"
          label="Total Drivers"
          value={totalDrivers}
          color="#2563EB"
        />

        <ReportItem
          icon="check-circle"
          label="Active Drivers"
          value={activeDrivers}
          color="#16A34A"
        />

        <ReportItem
          icon="cancel"
          label="Inactive Drivers"
          value={inactiveDrivers}
          color="#DC2626"
        />

        <ReportItem
          icon="trending-up"
          label="Active Rate"
          value={`${activePercentage}%`}
          color="#16A34A"
        />

        <ReportItem
          icon="trending-down"
          label="Inactive Rate"
          value={`${inactivePercentage}%`}
          color="#DC2626"
        />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryHeading}>
          Driver Status Summary
        </Text>

        <Text style={styles.summaryText}>
          ✔ Total Drivers Registered : {totalDrivers}
        </Text>

        <Text style={styles.summaryText}>
          ✔ Drivers Currently Active : {activeDrivers}
        </Text>

        <Text style={styles.summaryText}>
          ✔ Drivers Currently Inactive : {inactiveDrivers}
        </Text>
      </View>

    </ScrollView>
  );
}

function ReportItem({
  icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <MaterialIcons
          name={icon}
          size={28}
          color={color}
        />

        <Text style={styles.label}>
          {label}
        </Text>
      </View>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    marginLeft: 12,
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
  },

  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    marginTop: 25,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },

  summaryHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: Colors.primary,
  },

  summaryText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#374151",
  },
});