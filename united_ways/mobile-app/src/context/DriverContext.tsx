import React, { createContext, useState } from "react";

export interface Driver {
  id: string;
  driverName: string;
  mobileNumber: string;
  aadhaarNumber: string;
  licenseNumber: string;
  dateOfBirth: string;
  address: string;
  vehicleNumber: string;
  joiningDate: string;
  status: string;
}

interface DriverContextType {
  drivers: Driver[];

  addDriver: (driver: Driver) => void;

  updateDriver: (driver: Driver) => void;

  deleteDriver: (id: string) => void;
}

export const DriverContext = createContext<DriverContextType>({
  drivers: [],
  addDriver: () => {},
  updateDriver: () => {},
  deleteDriver: () => {},
});

export const DriverProvider = ({ children }: any) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const addDriver = (driver: Driver) => {
    setDrivers((prevDrivers) => [...prevDrivers, driver]);
  };

  const updateDriver = (updatedDriver: Driver) => {
    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) =>
        driver.id === updatedDriver.id ? updatedDriver : driver
      )
    );
  };

  const deleteDriver = (id: string) => {
    setDrivers((prevDrivers) =>
      prevDrivers.filter((driver) => driver.id !== id)
    );
  };

  return (
    <DriverContext.Provider
      value={{
        drivers,
        addDriver,
        updateDriver,
        deleteDriver,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};