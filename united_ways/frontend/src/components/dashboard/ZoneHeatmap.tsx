import { ZoneData } from '@/types/driver';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface ZoneHeatmapProps {
  zones: ZoneData[];
}

export function ZoneHeatmap({ zones }: ZoneHeatmapProps) {
  const maxDrivers = Math.max(...zones.map(z => z.driverCount));
  
  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Zone Distribution</h3>
          <p className="text-sm text-muted-foreground">Driver activity by area</p>
        </div>
        <MapPin className="w-5 h-5 text-muted-foreground" />
      </div>
      
      <div className="space-y-3">
        {zones.map((zone) => {
          const intensity = zone.driverCount / maxDrivers;
          return (
            <div key={zone.zone} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-foreground">{zone.zone}</span>
                <span className="text-sm text-muted-foreground">{zone.driverCount} drivers</span>
              </div>
              <div className="h-8 bg-muted rounded-lg overflow-hidden relative">
                <div 
                  className="h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                  style={{ 
                    width: `${intensity * 100}%`,
                    background: `linear-gradient(90deg, hsl(var(--primary) / ${0.3 + intensity * 0.5}) 0%, hsl(var(--primary)) 100%)`
                  }}
                >
                  <span className="text-xs font-medium text-primary-foreground">
                    ₹{zone.averageIncome}/day
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
