import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'kn';

interface Translations {
  // Common
  submit: string;
  ok: string;
  logout: string;
  back: string;
  heroTitle: string;
  heroSubtitle: string;
  
  // Login
  enterPhone: string;
  enterPhoneSubtitle: string;
  sendOtp: string;
  enterOtp: string;
  otpSentTo: string;
  verify: string;
  changeNumber: string;
  verifying: string;
  oneTimeLogin: string;
  
  // Driver App
  todaysEarnings: string;
  enterNumbersOnly: string;
  locationCapture: string;
  submitting: string;
  successTitle: string;
  successSubtitle: string;
  thankYou: string;
  alreadySubmittedTitle: string;
  alreadySubmittedSubtitle: string;
  seeYouTomorrow: string;
  
  // Home
  iAmDriver: string;
  dailyEarningsSubmit: string;
  viewAnalytics: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  driversLabel: string;
  zonesLabel: string;
  monthlyLabel: string;

  // Footer / misc
  footerText: string;
  
  // Offline
  offline: string;
  syncing: string;
}

const translations: Record<Language, Translations> = {
  en: {
    submit: 'Submit',
    ok: 'OK',
    logout: 'Logout',
    back: 'Back',
    
    enterPhone: 'Enter Phone Number',
    enterPhoneSubtitle: 'We\'ll send you a one-time password',
    sendOtp: 'Send OTP',
    enterOtp: 'Enter OTP',
    otpSentTo: 'Enter the OTP sent to',
    verify: 'Verify',
    changeNumber: 'Change Number',
    verifying: 'Verifying...',
    oneTimeLogin: 'One-time login • Your data is secure',

    heroTitle: 'United Ways Bengaluru',
    heroSubtitle: 'Empowering e-auto drivers with income tracking and livelihood monitoring',
    
    todaysEarnings: "Today's Earnings",
    enterNumbersOnly: 'Enter numbers only',
    locationCapture: 'Location will be captured on submit',
    submitting: 'Submitting...',
    successTitle: 'Successfully Submitted!',
    successSubtitle: 'Your earnings have been recorded',
    thankYou: 'Thank you! See you tomorrow.',
    alreadySubmittedTitle: "Today's data already submitted",
    alreadySubmittedSubtitle: 'You have already submitted for today',
    seeYouTomorrow: 'See you tomorrow!',
    
    iAmDriver: 'I am a Driver',
    dailyEarningsSubmit: 'Submit daily earnings',
    viewAnalytics: 'View analytics & reports',
    dashboardTitle: 'NGO Dashboard',
    dashboardSubtitle: 'Monitor & manage',
    driversLabel: 'Drivers',
    zonesLabel: 'Zones',
    monthlyLabel: 'Monthly',
    footerText: 'Built with ❤️ for social impact',
    
    offline: 'Offline - Data will sync when connected',
    syncing: 'Syncing pending entries...',
  },
  hi: {
    submit: 'जमा करें',
    ok: 'ठीक है',
    logout: 'लॉग आउट',
    back: 'वापस',
    
    enterPhone: 'फ़ोन नंबर दर्ज करें',
    enterPhoneSubtitle: 'हम आपको एक OTP भेजेंगे',
    sendOtp: 'OTP भेजें',
    enterOtp: 'OTP दर्ज करें',
    otpSentTo: 'OTP भेजा गया',
    verify: 'सत्यापित करें',
    changeNumber: 'नंबर बदलें',
    verifying: 'सत्यापित हो रहा है...',
    oneTimeLogin: 'एक बार लॉगिन • आपका डेटा सुरक्षित है',

    heroTitle: 'यूनाइटेड वेज़ बेंगलुरु',
    heroSubtitle: 'e-auto ड्राइवरों को आय ट्रैकिंग और आजीविका मॉनिटरिंग के साथ सशक्त बनाना',
    
    todaysEarnings: 'आज की कमाई',
    enterNumbersOnly: 'केवल संख्या दर्ज करें',
    locationCapture: 'जमा करने पर लोकेशन लिया जाएगा',
    submitting: 'जमा हो रहा है...',
    successTitle: 'सफलतापूर्वक जमा!',
    successSubtitle: 'आपकी कमाई दर्ज हो गई',
    thankYou: 'धन्यवाद! कल फिर मिलेंगे।',
    alreadySubmittedTitle: 'आज का डेटा जमा हो गया',
    alreadySubmittedSubtitle: 'आपने आज के लिए पहले ही जमा कर दिया है',
    seeYouTomorrow: 'कल फिर मिलेंगे!',
    
    iAmDriver: 'मैं ड्राइवर हूं',
    dailyEarningsSubmit: 'दैनिक कमाई जमा करें',
    viewAnalytics: 'रिपोर्ट देखें',
    dashboardTitle: 'NGO डैशबोर्ड',
    dashboardSubtitle: 'निगरानी और प्रबंधन',
    driversLabel: 'ड्राइवर',
    zonesLabel: 'ज़ोन',
    monthlyLabel: 'मासिक',
    footerText: 'सामाजिक प्रभाव के लिए बनाया गया',
    
    offline: 'ऑफलाइन - कनेक्ट होने पर सिंक होगा',
    syncing: 'सिंक हो रहा है...',
  },
  kn: {
    submit: 'ಸಲ್ಲಿಸಿ',
    ok: 'ಸರಿ',
    logout: 'ಲಾಗ್ ಔಟ್',
    back: 'ಹಿಂಭಾಗಕ್ಕೆ',

    enterPhone: 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ',
    enterPhoneSubtitle: 'ನಾವು ನಿಮಗೆ ಒಂದು ಸಮಯದ OTP ಕಳುಹಿಸುತ್ತೇವೆ',
    sendOtp: 'OTP ಕಳುಹಿಸಿ',
    enterOtp: 'OTP ನಮೂದಿಸಿ',
    otpSentTo: 'OTP ಕಳುಹಿಸಲಾಗಿದೆ',
    verify: 'ಪರಿಶೀಲಿಸಿ',
    changeNumber: 'ಸಂಖ್ಯೆ ಬದಲಿಸಿ',
    verifying: 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    oneTimeLogin: 'ಒಮ್ಮೆ ಲಾಗಿನ್ • ನಿಮ್ಮ ಡೇಟಾ ಸುರಕ್ಷಿತವಾಗಿದೆ',

    heroTitle: 'ಯುನೈಟೆಡ್ ವೇಸ್ ಬೆಂಗಳೂರು',
    heroSubtitle: 'ಏ-ಆಟೋ ಚಾಲಕರಿಗೆ ಆದಾಯ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಜೀವನೋಪಾಯ ಮಾನಿಟರಿಂಗ್ ಮೂಲಕ ಶಕ್ತಿ ನೀಡಿ',

    todaysEarnings: 'ಇಂದಿನ ಆದಾಯ',
    enterNumbersOnly: 'ನಂಬರ್‌ಗಳು ಮಾತ್ರ',
    locationCapture: 'ಸಲ್ಲಿಸುವಾಗ ಸ್ಥಳವನ್ನು ಕ್ಯಾಪ್ಚರ್ ಮಾಡಲಾಗುತ್ತದೆ',
    submitting: 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...',
    successTitle: 'ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ!',
    successSubtitle: 'ನಿಮ್ಮ ಆದಾಯವನ್ನು ದಾಖಲಿಸಲಾಗಿದೆ',
    thankYou: 'ಧನ್ಯವಾದಗಳು! ನಾಳೆ ಭೇಟಿಯಾಗೋಣ.',
    alreadySubmittedTitle: 'ಇಂದಿನ ಡೇಟಾ ಈಗಾಗಲೇ ಸಲ್ಲಿಸಲಾಗಿದೆ',
    alreadySubmittedSubtitle: 'ನೀವು ಈಗಾಗಲೇ ಇಂದಿನಿಗಾಗಿ ಸಲ್ಲಿಸಿದ್ದೀರಿ',
    seeYouTomorrow: 'ನಾಳೆ भेटೋಣ!',

    iAmDriver: 'ನಾನು ಚಾಲಕನು',
    dailyEarningsSubmit: 'ದೈನಂದಿನ ಆದಾಯ ಸಲ್ಲಿಸಿ',
    viewAnalytics: 'ವಿಶ್ಲೇಷಣೆ ನೋಡಿ',
    dashboardTitle: 'NGO ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    dashboardSubtitle: 'ನಿರೀಕ್ಷಣೆ ಮತ್ತು ನಿರ್ವಹಣೆ',
    driversLabel: 'ಚಾಲಕರು',
    zonesLabel: 'ಝೋನ್‌ಗಳು',
    monthlyLabel: 'ಮಾಸಿಕ',
    footerText: 'ಸಾಮಾಜಿಕ ಪ್ರಭಾವಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ',

    offline: 'ಆಫ್‌ಲೈನ್ - ಸಂಪರ್ಕವಾದಾಗ ಸಿಂಕ್ ಆಗುತ್ತದೆ',
    syncing: 'ಬಾಕಿ ದಾಖಲಾವನ್ನು ಸಿಂಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('appLanguage');
    // Default to English for first-time users; toggle available on first page
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('appLanguage', lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
