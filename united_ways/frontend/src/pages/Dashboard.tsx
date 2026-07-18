import { Users, UserCheck, UserX, AlertTriangle, IndianRupee, TrendingUp, Download, LogOut } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { DriverTable } from '@/components/dashboard/DriverTable';
import { IncomeChart } from '@/components/dashboard/IncomeChart';
import { ZoneHeatmap } from '@/components/dashboard/ZoneHeatmap';
import { mockDrivers, getDashboardStats, getZoneData, getWeeklyTrend } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const stats = getDashboardStats();
  const zones = getZoneData();
  const weeklyTrend = getWeeklyTrend();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">NGO Livelihood Dashboard</h1>
              <p className="text-sm text-muted-foreground">E-Auto Driver Impact Monitoring</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Drivers"
            value={stats.totalDrivers}
            subtitle="Registered in program"
            icon={Users}
            variant="primary"
          />
          <StatCard
            title="Active Today"
            value={stats.activeToday}
            subtitle={`${Math.round((stats.activeToday / stats.totalDrivers) * 100)}% of total`}
            icon={UserCheck}
            variant="success"
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Need Attention"
            value={stats.warningDrivers}
            subtitle="Irregular reporting"
            icon={AlertTriangle}
            variant="warning"
          />
          <StatCard
            title="Avg Daily Income"
            value={`₹${stats.averageIncome}`}
            subtitle="Per active driver"
            icon={IndianRupee}
            variant="default"
            trend={{ value: stats.weeklyGrowth, isPositive: true }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <IncomeChart data={weeklyTrend} />
          </div>
          <ZoneHeatmap zones={zones} />
        </div>

        {/* Drivers Table */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">All Drivers</h2>
            <span className="text-sm text-muted-foreground">{stats.totalDrivers} total</span>
          </div>
          <DriverTable drivers={mockDrivers} />
        </div>
      </main>
    </div>
  );
}
