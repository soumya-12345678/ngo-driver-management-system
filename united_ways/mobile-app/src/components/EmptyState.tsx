import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  title: string;
  subtitle: string;
}

export default function EmptyState({
  title,
  subtitle,
}: Props) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="people-outline"
        size={80}
        color="#9CA3AF"
      />

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 18,
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
  },
});