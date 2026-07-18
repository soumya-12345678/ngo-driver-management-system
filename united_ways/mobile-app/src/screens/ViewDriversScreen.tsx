import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import DriverCard from "../components/DriverCard";
import SearchBar from "../components/SearchBar";
import { DriverContext } from "../context/DriverContext";

export default function ViewDriversScreen() {
  const { drivers } = useContext(DriverContext);

  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.driverName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      driver.mobileNumber.includes(searchText);

    const matchesFilter =
      selectedFilter === "All"
        ? true
        : driver.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const renderItem = ({ item }: any) => (
    <DriverCard driver={item} />
  );

  return (
    <View style={styles.container}>
      {drivers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons
            name="people-outline"
            size={80}
            color="#9CA3AF"
          />

          <Text style={styles.emptyTitle}>
            No Drivers Registered
          </Text>

          <Text style={styles.emptyText}>
            Register a driver from the Dashboard.
          </Text>
        </View>
      ) : (
        <>
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
          />

          {/* Filter Buttons */}

          <View style={styles.filterContainer}>
            <FilterButton
              title="All"
              selected={selectedFilter === "All"}
              onPress={() => setSelectedFilter("All")}
            />

            <FilterButton
              title="Active"
              selected={selectedFilter === "Active"}
              onPress={() => setSelectedFilter("Active")}
            />

            <FilterButton
              title="Inactive"
              selected={selectedFilter === "Inactive"}
              onPress={() => setSelectedFilter("Inactive")}
            />
          </View>

          <FlatList
            data={filteredDrivers}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <View style={styles.noResultContainer}>
                <MaterialIcons
                  name="search-off"
                  size={60}
                  color="#9CA3AF"
                />

                <Text style={styles.noResultTitle}>
                  No Matching Drivers
                </Text>

                <Text style={styles.noResultText}>
                  Try another name, mobile number, or filter.
                </Text>
              </View>
            }
          />
        </>
      )}
    </View>
  );
}

function FilterButton({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selected && styles.selectedFilter,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterText,
          selected && styles.selectedFilterText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    color: "#374151",
  },

  emptyText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#6B7280",
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    marginTop: 5,
  },

  filterButton: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: "center",
  },

  selectedFilter: {
    backgroundColor: "#2563EB",
  },

  filterText: {
    fontWeight: "600",
    color: "#374151",
  },

  selectedFilterText: {
    color: "#FFFFFF",
  },

  noResultContainer: {
    alignItems: "center",
    marginTop: 80,
  },

  noResultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    color: "#374151",
  },

  noResultText: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
  },
});