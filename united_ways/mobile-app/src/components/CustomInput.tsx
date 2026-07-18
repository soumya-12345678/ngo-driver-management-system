import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

import { Colors } from "../constants/Colors";

interface CustomInputProps extends TextInputProps {
  label: string;
  leftIcon?: React.ReactNode;
  error?: string;
}

export default function CustomInput({
  label,
  leftIcon,
  error,
  style,
  ...props
}: CustomInputProps) {
  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Input */}
      <View
        style={[
          styles.inputContainer,
          error ? styles.errorBorder : null,
        ]}
      >
        {leftIcon && (
          <View style={styles.iconContainer}>
            {leftIcon}
          </View>
        )}

        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={Colors.placeholder}
          {...props}
        />
      </View>

      {/* Error Message */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    height: 55,
    paddingHorizontal: 15,

    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  iconContainer: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },

  errorBorder: {
    borderColor: Colors.danger,
  },

  errorText: {
    color: Colors.danger,
    marginTop: 6,
    fontSize: 13,
  },
});