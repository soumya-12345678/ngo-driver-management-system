import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Car, MapPin, Calendar, TrendingUp, IndianRupee } from 'lucide-react';
import { mockDrivers, generateEarningsHistory } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

const statusConfig = {
  active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  warning: { label: 'Irregular', className: 'bg-warning/10 text-warning border-warning/20' },
  inactive: { label: 'Inactive', className: 'bg-danger/10 text-danger border-danger/20' },
};

export default function DriverProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const driver = mockDrivers.find(d => d.id === id);
  const earnings = generateEarningsHistory(id || '1', 30);

  if (!driver) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Driver not found</p>
      </div>
    );
  }

  const chartData = earnings.map(e => ({
    date: new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    amount: e.amount,
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-foreground">Driver Profile</h1>
              <p className="text-sm text-muted-foreground">{driver.name}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-card rounded-xl border border-border shadow-soft p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">{driver.name}</h2>
                  <span className={cn(
                    "inline-flex px-3 py-1 rounded-full text-sm font-medium border",
                    statusConfig[driver.status].className
                  )}>
                    {statusConfig[driver.status].label}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Livelihood Score</p>
                  <p className={cn(
                    "text-3xl font-bold",
                    driver.livelihoodScore >= 80 ? "text-success" :
                    driver.livelihoodScore >= 60 ? "text-warning" : "text-danger"
                  )}>
                    {driver.livelihoodScore}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">+91 {driver.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{driver.vehicleNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{driver.zone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Joined {new Date(driver.joinedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Total Earnings</span>
            </div>
            <p className="text-2xl font-bold text-foreground">₹{driver.totalEarnings.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-muted-foreground">Avg Daily</span>
            </div>
            <p className="text-2xl font-bold text-foreground">₹{driver.averageDailyIncome}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Days Active</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{earnings.length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Last Active</span>
            </div>
            <p className="text-lg font-medium text-foreground">
              {new Date(driver.lastActive).toLocaleDateString('en-IN', { 
                day: 'numeric',
                month: 'short' 
              })}
            </p>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-card rounded-xl border border-border shadow-soft p-5">
          <h3 className="font-semibold text-foreground mb-4">30-Day Earnings History</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`₹${value}`, 'Earnings']}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fill="url(#colorAmount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
