import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "../constants/Colors";
import { DriverContext } from "../context/DriverContext";
import StatCard from "../components/StatCard";
import CustomButton from "../components/CustomButton";

export default function DashboardScreen({ navigation }: any) {
  const { drivers } = useContext(DriverContext);

  const totalDrivers = drivers.length;
  const activeDrivers = drivers.filter(
    (driver) => driver.status === "Active"
  ).length;
  const inactiveDrivers = totalDrivers - activeDrivers;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>NGO Dashboard</Text>
            <Text style={styles.subtitle}>
              Welcome back, Owner 👋
            </Text>
          </View>

          <View style={styles.avatar}>
            <MaterialIcons
              name="admin-panel-settings"
              size={32}
              color={Colors.primary}
            />
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <StatCard
            icon="groups"
            title="Drivers"
            value={totalDrivers}
            color={Colors.primary}
          />

          <StatCard
            icon="check-circle"
            title="Active"
            value={activeDrivers}
            color={Colors.success}
          />

          <StatCard
            icon="cancel"
            title="Inactive"
            value={inactiveDrivers}
            color={Colors.danger}
          />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Register")}
        >
          <View style={styles.iconBox}>
            <MaterialIcons
              name="person-add"
              size={28}
              color={Colors.primary}
            />
          </View>

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>
              Register Driver
            </Text>

            <Text style={styles.cardSubtitle}>
              Add a new driver to the system
            </Text>
          </View>

          <MaterialIcons
            name="chevron-right"
            size={28}
            color={Colors.gray}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("View Drivers")}
        >
          <View style={styles.iconBox}>
            <MaterialIcons
              name="groups"
              size={28}
              color={Colors.primary}
            />
          </View>

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>
              View Drivers
            </Text>

            <Text style={styles.cardSubtitle}>
              Browse and manage drivers
            </Text>
          </View>

          <MaterialIcons
            name="chevron-right"
            size={28}
            color={Colors.gray}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Reports")}
        >
          <View style={styles.iconBox}>
            <MaterialIcons
              name="bar-chart"
              size={28}
              color={Colors.primary}
            />
          </View>

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>
              Reports
            </Text>

            <Text style={styles.cardSubtitle}>
              View earnings and statistics
            </Text>
          </View>

          <MaterialIcons
            name="chevron-right"
            size={28}
            color={Colors.gray}
          />
        </TouchableOpacity>

        <View style={{ height: 20 }} />

        <CustomButton
          title="Logout"
          backgroundColor={Colors.danger}
          onPress={() => navigation.replace("Home")}
          icon={
            <MaterialIcons
              name="logout"
              size={20}
              color={Colors.white}
            />
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 16,
    color: Colors.gray,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 15,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    elevation: 3,
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  cardText: {
    flex: 1,
    marginLeft: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },

  cardSubtitle: {
    marginTop: 4,
    color: Colors.gray,
    fontSize: 14,
  },
});