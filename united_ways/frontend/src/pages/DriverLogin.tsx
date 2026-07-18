import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';

type Step = 'phone' | 'otp' | 'verifying';

export default function DriverLogin() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 10) {
      setPhone(val);
      setError('');
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 6) {
      setOtp(val);
      setError('');
    }
  };

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setStep('otp');
    // In production, this would call the API to send OTP
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setStep('verifying');

    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store token (in production, this comes from API)
    localStorage.setItem('driverToken', 'mock-token-' + Date.now());
    localStorage.setItem('driverPhone', phone);

    navigate('/driver');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Language Toggle - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageToggle />
      </div>

      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-8 rounded-b-[2rem] shadow-elevated">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🛺</span>
          </div>
          <h1 className="text-2xl font-bold mb-1">E-Auto Driver App</h1>
          <p className="text-primary-foreground/80">NGO Livelihood Tracker</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center p-6">
        {step === 'phone' && (
          <div className="animate-fade-in-up">
            <h2 className="text-xl font-semibold text-foreground mb-2 text-center">
              {t.enterPhone}
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              {t.enterPhoneSubtitle}
            </p>

            <div className="relative mb-6">
              <div className="flex items-center bg-card rounded-2xl border-2 border-border shadow-medium overflow-hidden">
                <div className="flex items-center justify-center w-16 h-20 bg-secondary/50 border-r border-border">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-center px-4">
                  <span className="text-lg font-medium text-muted-foreground mr-2">+91</span>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="9876543210"
                  className="flex-1 h-20 text-2xl font-medium bg-transparent outline-none text-foreground placeholder:text-muted-foreground/30"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-destructive text-sm mt-2 text-center">{error}</p>
              )}
            </div>

            <Button
              variant="driver"
              size="driver"
              onClick={handleSendOtp}
              disabled={phone.length !== 10}
            >
              {t.sendOtp}
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        )}

        {step === 'otp' && (
          <div className="animate-fade-in-up">
            <h2 className="text-xl font-semibold text-foreground mb-2 text-center">
              {t.enterOtp}
            </h2>
            <p className="text-muted-foreground text-center mb-2">
              {t.otpSentTo} +91 {phone}
            </p>
            <p className="text-sm text-accent text-center mb-8">
              (Demo: Enter any 6 digits)
            </p>

            <div className="relative mb-6">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={otp}
                onChange={handleOtpChange}
                placeholder="------"
                className={cn(
                  "w-full h-20 text-4xl font-bold text-center tracking-[0.5em] bg-card rounded-2xl border-2 border-border shadow-medium outline-none transition-all",
                  "focus:border-primary text-foreground placeholder:text-muted-foreground/30"
                )}
                autoFocus
              />
              {error && (
                <p className="text-destructive text-sm mt-2 text-center">{error}</p>
              )}
            </div>

            <Button
              variant="driver"
              size="driver"
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6}
            >
              {t.verify}
              <CheckCircle2 className="w-6 h-6 ml-2" />
            </Button>

            <button
              onClick={() => setStep('phone')}
              className="w-full mt-4 text-muted-foreground hover:text-foreground transition-colors py-3"
            >
              ← {t.changeNumber}
            </button>
          </div>
        )}

        {step === 'verifying' && (
          <div className="animate-fade-in-up text-center">
            <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {t.verifying}
            </h2>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center">
        <p className="text-xs text-muted-foreground">
          {t.oneTimeLogin}
        </p>
      </footer>
    </div>
  );
}
