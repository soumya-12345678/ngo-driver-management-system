import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { EarningsInput } from '@/components/driver/EarningsInput';
import { SuccessScreen } from '@/components/driver/SuccessScreen';
import { OfflineIndicator } from '@/components/driver/OfflineIndicator';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useLocation } from '@/hooks/useLocation';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { MapPin, Loader2, User, LogOut } from 'lucide-react';
import DriverMap from '@/components/driver/DriverMap';
import { useNavigate } from 'react-router-dom';

type Screen = 'entry' | 'submitting' | 'success';

export default function DriverApp() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [amount, setAmount] = useState('');
  const [screen, setScreen] = useState<Screen>('entry');
  const [submittedAmount, setSubmittedAmount] = useState(0);
  const isOnline = useOnlineStatus();
  const { getLocation } = useLocation();

  // Check if already submitted today
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  
  useEffect(() => {
    const lastSubmission = localStorage.getItem('lastSubmissionDate');
    const today = new Date().toISOString().split('T')[0];
    if (lastSubmission === today) {
      setAlreadySubmitted(true);
    }
  }, []);

  const handleSubmit = async () => {
    if (!amount || parseInt(amount) === 0) return;

    setScreen('submitting');

    // Get location
    const location = await getLocation();

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store submission
    const submission = {
      amount: parseInt(amount),
      location,
      date: new Date().toISOString(),
      synced: isOnline,
    };

    // Save to localStorage (for offline support)
    const pendingSubmissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    pendingSubmissions.push(submission);
    localStorage.setItem('pendingSubmissions', JSON.stringify(pendingSubmissions));
    localStorage.setItem('lastSubmissionDate', new Date().toISOString().split('T')[0]);

    setSubmittedAmount(parseInt(amount));
    setScreen('success');
  };

  const handleDone = () => {
    setAmount('');
    setScreen('entry');
    setAlreadySubmitted(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('driverToken');
    localStorage.removeItem('driverPhone');
    navigate('/');
  };

  if (screen === 'success') {
    return <SuccessScreen amount={submittedAmount} onDone={handleDone} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OfflineIndicator isOnline={isOnline} />
      
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Driver</p>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long',
                  day: 'numeric',
                  month: 'short'
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={handleLogout}
              className="p-3 rounded-full hover:bg-muted transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {alreadySubmitted ? (
          <div className="text-center animate-fade-in-up">
            <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t.alreadySubmittedTitle}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t.alreadySubmittedSubtitle}
            </p>
            <p className="text-sm text-muted-foreground">
              {t.seeYouTomorrow}
            </p>
          </div>
        ) : (
          <>
            <div className="w-full max-w-sm mb-8 animate-fade-in-up">
              <EarningsInput
                value={amount}
                onChange={setAmount}
                disabled={screen === 'submitting'}
              />
            </div>

            {/* Map tracking */}
            <div className="w-full max-w-sm mb-8">
              <DriverMap />
            </div>

            {/* Location Status */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in-up stagger-1">
              <MapPin className="w-4 h-4" />
              <span>{t.locationCapture}</span>
            </div>

            {/* Submit Button */}
            <div className="w-full max-w-sm animate-fade-in-up stagger-2">
              <Button
                variant="driver"
                size="driver"
                onClick={handleSubmit}
                disabled={!amount || parseInt(amount) === 0 || screen === 'submitting'}
                className="relative"
              >
                {screen === 'submitting' ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin mr-2" />
                    {t.submitting}
                  </>
                ) : (
                  t.submit
                )}
              </Button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center">
        <p className="text-xs text-muted-foreground">
          Powered by NGO Livelihood Tracker
        </p>
      </footer>
    </div>
  );
}
