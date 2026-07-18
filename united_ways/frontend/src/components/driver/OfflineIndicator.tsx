import { WifiOff, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface OfflineIndicatorProps {
  isOnline: boolean;
  pendingSync?: number;
}

export function OfflineIndicator({ isOnline, pendingSync = 0 }: OfflineIndicatorProps) {
  const { t } = useLanguage();

  if (isOnline && pendingSync === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium z-50 transition-all duration-300",
        isOnline 
          ? "bg-accent text-accent-foreground" 
          : "bg-destructive text-destructive-foreground"
      )}
    >
      {isOnline ? (
        <>
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>{t.syncing}</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4" />
          <span>{t.offline}</span>
        </>
      )}
    </div>
  );
}
