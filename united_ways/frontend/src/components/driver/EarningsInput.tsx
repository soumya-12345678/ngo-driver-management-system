import { useState } from 'react';
import { IndianRupee } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface EarningsInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function EarningsInput({ value, onChange, disabled }: EarningsInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 5) {
      onChange(val);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-lg font-medium text-muted-foreground mb-3 text-center">
        {t.todaysEarnings}
      </label>
      <div
        className={cn(
          "relative flex items-center bg-card rounded-2xl border-2 transition-all duration-300 shadow-medium",
          isFocused ? "border-primary shadow-elevated" : "border-border",
          disabled && "opacity-50"
        )}
      >
        <div className="flex items-center justify-center w-20 h-24 bg-secondary/50 rounded-l-2xl border-r border-border">
          <IndianRupee className="w-10 h-10 text-primary" strokeWidth={2.5} />
        </div>
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder="0"
          className={cn(
            "flex-1 h-24 text-4xl font-bold text-center bg-transparent outline-none placeholder:text-muted-foreground/30",
            "text-foreground"
          )}
          aria-label="Enter today's earnings in rupees"
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        {t.enterNumbersOnly}
      </p>
    </div>
  );
}
