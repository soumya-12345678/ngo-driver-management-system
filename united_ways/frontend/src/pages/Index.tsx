import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Truck, BarChart3, ArrowRight, UserPlus } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Index() {
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const driverToken = localStorage.getItem('driverToken');
    const adminToken = localStorage.getItem('adminToken');

    if (driverToken) {
      navigate('/driver');
    } else if (adminToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <header className="bg-primary text-primary-foreground px-6 py-12 rounded-b-[3rem] shadow-elevated">
        <div className="text-center max-w-md mx-auto">
          <div className="absolute right-6 top-6">
            <LanguageToggle />
          </div>

          <div className="w-24 h-24 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🛺</span>
          </div>

          <h1 className="text-3xl font-bold mb-3">
            {t.heroTitle}
          </h1>

          <p className="text-primary-foreground/80 text-lg">
            {t.heroSubtitle}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-4">

          {/* Driver Login */}
          <button
            onClick={() => navigate('/driver/login')}
            className="w-full bg-card rounded-2xl border-2 border-border p-6 shadow-medium hover:shadow-elevated hover:border-primary/30 transition-all group text-left"
          >
            <div className="flex items-start gap-4">

              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Truck className="w-7 h-7 text-primary" />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground mb-1">
                  {t.iAmDriver}
                </h2>

                <p className="text-muted-foreground text-sm mb-2">
                  {t.iAmDriver}
                </p>

                <p className="text-xs text-muted-foreground">
                  {t.dailyEarningsSubmit}
                </p>
              </div>

              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-2" />
            </div>
          </button>

          {/* Register Authorized Person */}
          <button
            onClick={() => navigate('/register')}
            className="w-full bg-card rounded-2xl border-2 border-border p-6 shadow-medium hover:shadow-elevated hover:border-green-500/30 transition-all group text-left"
          >
            <div className="flex items-start gap-4">

              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <UserPlus className="w-7 h-7 text-green-600" />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground mb-1">
                  Register New Person
                </h2>

                <p className="text-muted-foreground text-sm mb-2">
                  Register a new authorized person
                </p>

                <p className="text-xs text-muted-foreground">
                  Mobile verification using OTP
                </p>
              </div>

              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-green-600 transition-colors mt-2" />
            </div>
          </button>

          {/* NGO Dashboard */}
          <button
            onClick={() => {
              localStorage.setItem('adminToken', 'demo-admin');
              navigate('/dashboard');
            }}
            className="w-full bg-card rounded-2xl border-2 border-border p-6 shadow-medium hover:shadow-elevated hover:border-accent/50 transition-all group text-left"
          >
            <div className="flex items-start gap-4">

              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <BarChart3 className="w-7 h-7 text-accent" />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground mb-1">
                  {t.dashboardTitle}
                </h2>

                <p className="text-muted-foreground text-sm mb-2">
                  {t.dashboardSubtitle}
                </p>

                <p className="text-xs text-muted-foreground">
                  {t.viewAnalytics}
                </p>
              </div>

              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors mt-2" />
            </div>
          </button>

        </div>

        {/* Stats Preview */}
        <div className="mt-10 text-center">
          <div className="flex items-center justify-center gap-8">

            <div>
              <p className="text-3xl font-bold text-foreground">
                120+
              </p>
              <p className="text-sm text-muted-foreground">
                {t.driversLabel}
              </p>
            </div>

            <div className="w-px h-10 bg-border" />

            <div>
              <p className="text-3xl font-bold text-foreground">
                5
              </p>
              <p className="text-sm text-muted-foreground">
                {t.zonesLabel}
              </p>
            </div>

            <div className="w-px h-10 bg-border" />

            <div>
              <p className="text-3xl font-bold text-primary">
                ₹8L+
              </p>
              <p className="text-sm text-muted-foreground">
                {t.monthlyLabel}
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-xs text-muted-foreground">
          {t.footerText || t.oneTimeLogin}
        </p>
      </footer>
    </div>
  );
}