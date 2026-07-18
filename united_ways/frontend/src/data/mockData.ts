import { Driver, DailyEarning, DashboardStats, ZoneData } from '@/types/driver';

// Generate mock drivers
export const mockDrivers: Driver[] = [
  { id: '1', name: 'Ramesh Kumar', phone: '9876543210', vehicleNumber: 'TN01AB1234', zone: 'North Chennai', joinedAt: '2024-01-15', status: 'active', lastActive: new Date().toISOString(), totalEarnings: 125000, averageDailyIncome: 850, livelihoodScore: 92 },
  { id: '2', name: 'Suresh Babu', phone: '9876543211', vehicleNumber: 'TN01CD5678', zone: 'Central Chennai', joinedAt: '2024-02-01', status: 'active', lastActive: new Date().toISOString(), totalEarnings: 118000, averageDailyIncome: 780, livelihoodScore: 85 },
  { id: '3', name: 'Venkatesh R', phone: '9876543212', vehicleNumber: 'TN01EF9012', zone: 'South Chennai', joinedAt: '2024-01-20', status: 'warning', lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), totalEarnings: 95000, averageDailyIncome: 620, livelihoodScore: 68 },
  { id: '4', name: 'Murugan S', phone: '9876543213', vehicleNumber: 'TN01GH3456', zone: 'West Chennai', joinedAt: '2024-03-01', status: 'active', lastActive: new Date().toISOString(), totalEarnings: 82000, averageDailyIncome: 910, livelihoodScore: 95 },
  { id: '5', name: 'Selvam K', phone: '9876543214', vehicleNumber: 'TN01IJ7890', zone: 'North Chennai', joinedAt: '2024-01-10', status: 'inactive', lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), totalEarnings: 145000, averageDailyIncome: 720, livelihoodScore: 45 },
  { id: '6', name: 'Prakash M', phone: '9876543215', vehicleNumber: 'TN01KL1234', zone: 'Central Chennai', joinedAt: '2024-02-15', status: 'active', lastActive: new Date().toISOString(), totalEarnings: 98000, averageDailyIncome: 820, livelihoodScore: 88 },
  { id: '7', name: 'Anand T', phone: '9876543216', vehicleNumber: 'TN01MN5678', zone: 'South Chennai', joinedAt: '2024-03-10', status: 'active', lastActive: new Date().toISOString(), totalEarnings: 72000, averageDailyIncome: 890, livelihoodScore: 91 },
  { id: '8', name: 'Kumar P', phone: '9876543217', vehicleNumber: 'TN01OP9012', zone: 'East Chennai', joinedAt: '2024-01-25', status: 'warning', lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), totalEarnings: 110000, averageDailyIncome: 650, livelihoodScore: 62 },
  { id: '9', name: 'Rajan V', phone: '9876543218', vehicleNumber: 'TN01QR3456', zone: 'North Chennai', joinedAt: '2024-02-20', status: 'active', lastActive: new Date().toISOString(), totalEarnings: 88000, averageDailyIncome: 840, livelihoodScore: 86 },
  { id: '10', name: 'Karthik N', phone: '9876543219', vehicleNumber: 'TN01ST7890', zone: 'West Chennai', joinedAt: '2024-03-05', status: 'active', lastActive: new Date().toISOString(), totalEarnings: 65000, averageDailyIncome: 870, livelihoodScore: 89 },
];

// Generate more drivers to reach 120
for (let i = 11; i <= 120; i++) {
  const zones = ['North Chennai', 'South Chennai', 'Central Chennai', 'West Chennai', 'East Chennai'];
  const statuses: ('active' | 'inactive' | 'warning')[] = ['active', 'active', 'active', 'active', 'warning', 'inactive'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const avgIncome = 500 + Math.floor(Math.random() * 500);
  
  mockDrivers.push({
    id: String(i),
    name: `Driver ${i}`,
    phone: `98765${String(43200 + i).padStart(5, '0')}`,
    vehicleNumber: `TN01${String.fromCharCode(65 + (i % 26))}${String.fromCharCode(65 + ((i + 1) % 26))}${1000 + i}`,
    zone: zones[Math.floor(Math.random() * zones.length)],
    joinedAt: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1).toISOString(),
    status,
    lastActive: status === 'active' 
      ? new Date().toISOString() 
      : new Date(Date.now() - (status === 'warning' ? 2 : 7) * 24 * 60 * 60 * 1000 * Math.random()).toISOString(),
    totalEarnings: 50000 + Math.floor(Math.random() * 100000),
    averageDailyIncome: avgIncome,
    livelihoodScore: status === 'active' ? 70 + Math.floor(Math.random() * 30) : status === 'warning' ? 50 + Math.floor(Math.random() * 20) : 20 + Math.floor(Math.random() * 30),
  });
}

// Generate mock daily earnings for charts
export const generateEarningsHistory = (driverId: string, days: number = 30): DailyEarning[] => {
  const earnings: DailyEarning[] = [];
  const baseAmount = 600 + Math.random() * 400;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Skip some days randomly for realism
    if (Math.random() > 0.15) {
      earnings.push({
        id: `${driverId}-${date.toISOString().split('T')[0]}`,
        driverId,
        date: date.toISOString().split('T')[0],
        amount: Math.round(baseAmount + (Math.random() - 0.5) * 300),
        location: {
          lat: 13.0827 + (Math.random() - 0.5) * 0.1,
          lng: 80.2707 + (Math.random() - 0.5) * 0.1,
          zone: ['North Chennai', 'South Chennai', 'Central Chennai', 'West Chennai', 'East Chennai'][Math.floor(Math.random() * 5)],
        },
        submittedAt: date.toISOString(),
        syncedAt: date.toISOString(),
      });
    }
  }
  
  return earnings;
};

export const getDashboardStats = (): DashboardStats => {
  const activeDrivers = mockDrivers.filter(d => d.status === 'active');
  const warningDrivers = mockDrivers.filter(d => d.status === 'warning');
  const inactiveDrivers = mockDrivers.filter(d => d.status === 'inactive');
  
  return {
    totalDrivers: mockDrivers.length,
    activeToday: activeDrivers.length,
    inactiveToday: inactiveDrivers.length,
    warningDrivers: warningDrivers.length,
    averageIncome: Math.round(activeDrivers.reduce((sum, d) => sum + d.averageDailyIncome, 0) / activeDrivers.length),
    totalEarningsToday: Math.round(activeDrivers.length * 780),
    weeklyGrowth: 12.5,
  };
};

export const getZoneData = (): ZoneData[] => [
  { zone: 'North Chennai', driverCount: 28, averageIncome: 820, lat: 13.1067, lng: 80.2206 },
  { zone: 'South Chennai', driverCount: 24, averageIncome: 780, lat: 12.9516, lng: 80.1462 },
  { zone: 'Central Chennai', driverCount: 32, averageIncome: 890, lat: 13.0827, lng: 80.2707 },
  { zone: 'West Chennai', driverCount: 18, averageIncome: 750, lat: 13.0475, lng: 80.2090 },
  { zone: 'East Chennai', driverCount: 18, averageIncome: 810, lat: 13.1036, lng: 80.2850 },
];

export const getWeeklyTrend = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, i) => ({
    day,
    earnings: 70000 + Math.floor(Math.random() * 20000),
    drivers: 85 + Math.floor(Math.random() * 20),
  }));
};
