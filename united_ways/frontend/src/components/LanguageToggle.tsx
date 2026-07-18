import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-muted rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all",
          language === 'en'
            ? "bg-card text-foreground shadow-soft"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('hi')}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all",
          language === 'hi'
            ? "bg-card text-foreground shadow-soft"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        हिंदी
      </button>
      <button
        onClick={() => setLanguage('kn')}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all",
          language === 'kn'
            ? "bg-card text-foreground shadow-soft"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}
