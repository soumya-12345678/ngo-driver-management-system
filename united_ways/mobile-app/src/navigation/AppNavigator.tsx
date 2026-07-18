import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import DriverLoginScreen from "../screens/DriverLoginScreen";
import RegisterScreen from "../screens/RegisterDriver";
import OtpVerificationScreen from "../screens/OtpVerificationScreen";
import DashboardScreen from "../screens/DashboardScreen";
import DailyEarningsScreen from "../screens/DailyEarningsScreen";
import OwnerLoginScreen from "../screens/OwnerLoginScreen";
import ViewDriversScreen from "../screens/ViewDriversScreen";
import ReportsScreen from "../screens/ReportsScreen";
import DriverDetailsScreen from "../screens/DriverDetailsScreen";
import EditDriverScreen from "../screens/EditDriverScreen";

// Import Driver Provider
import { DriverProvider } from "../context/DriverContext";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <DriverProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#2563EB",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "NGO Driver App" }}
          />

          <Stack.Screen
            name="Driver Login"
            component={DriverLoginScreen}
          />

          <Stack.Screen
            name="Owner Login"
            component={OwnerLoginScreen}
            options={{ title: "NGO Owner Login" }}
          />

          <Stack.Screen
            name="OTP Verification"
            component={OtpVerificationScreen}
          />

          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Register Driver" }}
          />


          <Stack.Screen
  name="Edit Driver"
  component={EditDriverScreen}
/>

          <Stack.Screen
            name="View Drivers"
            component={ViewDriversScreen}
          />

          <Stack.Screen
            name="Reports"
            component={ReportsScreen}
          />

          <Stack.Screen
  name="Driver Details"
  component={DriverDetailsScreen}
/>

          <Stack.Screen
            name="Daily Earnings"
            component={DailyEarningsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DriverProvider>
  );
}