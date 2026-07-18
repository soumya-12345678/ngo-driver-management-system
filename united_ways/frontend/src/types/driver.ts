export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleNumber: string;
  zone: string;
  joinedAt: string;
  status: 'active' | 'inactive' | 'warning';
  lastActive: string;
  totalEarnings: number;
  averageDailyIncome: number;
  livelihoodScore: number;
}

export interface DailyEarning {
  id: string;
  driverId: string;
  date: string;
  amount: number;
  location?: {
    lat: number;
    lng: number;
    zone: string;
  };
  submittedAt: string;
  syncedAt?: string;
}

export interface EarningsSubmission {
  amount: number;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface DashboardStats {
  totalDrivers: number;
  activeToday: number;
  inactiveToday: number;
  warningDrivers: number;
  averageIncome: number;
  totalEarningsToday: number;
  weeklyGrowth: number;
}

export interface ZoneData {
  zone: string;
  driverCount: number;
  averageIncome: number;
  lat: number;
  lng: number;
}
