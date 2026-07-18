import { useState } from 'react';
import { Driver } from '@/types/driver';
import { cn } from '@/lib/utils';
import { Search, Filter, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DriverTableProps {
  drivers: Driver[];
}

const statusConfig = {
  active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  warning: { label: 'Irregular', className: 'bg-warning/10 text-warning border-warning/20' },
  inactive: { label: 'Inactive', className: 'bg-danger/10 text-danger border-danger/20' },
};

export function DriverTable({ drivers }: DriverTableProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(search.toLowerCase()) ||
      driver.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
      driver.zone.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search drivers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          
          {/* Status Filter */}
          <div className="flex gap-2">
            {['all', 'active', 'warning', 'inactive'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  statusFilter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {status === 'all' ? 'All' : statusConfig[status as keyof typeof statusConfig]?.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Driver</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Vehicle</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Zone</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Avg Income</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Score</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredDrivers.slice(0, 20).map((driver) => (
              <tr 
                key={driver.id}
                onClick={() => navigate(`/dashboard/driver/${driver.id}`)}
                className="hover:bg-muted/30 cursor-pointer transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{driver.name}</p>
                      <p className="text-sm text-muted-foreground md:hidden">{driver.vehicleNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <span className="text-sm text-muted-foreground">{driver.vehicleNumber}</span>
                </td>
                <td className="px-4 py-4 hidden lg:table-cell">
                  <span className="text-sm text-muted-foreground">{driver.zone}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-medium text-foreground">₹{driver.averageDailyIncome}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                    <span className={cn(
                      "text-sm font-bold",
                      driver.livelihoodScore >= 80 ? "text-success" :
                      driver.livelihoodScore >= 60 ? "text-warning" : "text-danger"
                    )}>
                      {driver.livelihoodScore}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={cn(
                    "inline-flex px-2.5 py-1 rounded-full text-xs font-medium border",
                    statusConfig[driver.status].className
                  )}>
                    {statusConfig[driver.status].label}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <p className="text-sm text-muted-foreground text-center">
          Showing {Math.min(20, filteredDrivers.length)} of {filteredDrivers.length} drivers
        </p>
      </div>
    </div>
  );
}
