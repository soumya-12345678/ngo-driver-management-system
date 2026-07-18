import { CheckCircle2, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface SuccessScreenProps {
  amount: number;
  onDone: () => void;
}

export function SuccessScreen({ amount, onDone }: SuccessScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
      <div className="animate-success-pulse">
        <div className="w-32 h-32 rounded-full bg-success/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-20 h-20 text-success" strokeWidth={2} />
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-foreground mb-2 text-center animate-fade-in-up">
        {t.successTitle}
      </h1>
      <p className="text-lg text-muted-foreground mb-6 text-center animate-fade-in-up stagger-1">
        {t.successSubtitle}
      </p>
      
      <div className="bg-card rounded-2xl p-6 shadow-elevated mb-8 animate-fade-in-up stagger-2">
        <p className="text-sm text-muted-foreground text-center mb-1">{t.todaysEarnings}</p>
        <div className="flex items-center justify-center gap-2">
          <IndianRupee className="w-8 h-8 text-primary" />
          <span className="text-4xl font-bold text-foreground">{amount.toLocaleString('en-IN')}</span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground text-center mb-8 animate-fade-in-up stagger-3">
        {t.thankYou}
      </p>
      
      <Button
        variant="driver"
        size="driver"
        onClick={onDone}
        className="animate-fade-in-up stagger-4"
      >
        {t.ok}
      </Button>
    </div>
  );
}
