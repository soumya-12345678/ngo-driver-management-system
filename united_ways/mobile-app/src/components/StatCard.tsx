import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  icon: any;
  title: string;
  value: number;
  color: string;
}

export default function StatCard({
  icon,
  title,
  value,
  color,
}: Props) {
  return (
    <View style={styles.card}>
      <MaterialIcons
        name={icon}
        size={30}
        color={color}
      />

      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 3,
  },

  value: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  title: {
    marginTop: 5,
    color: "#6B7280",
    textAlign: "center",
    fontSize: 13,
  },
});