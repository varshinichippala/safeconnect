import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { EmergencyBanner } from './components/EmergencyBanner';
import { SafeAssistModal } from './components/SafeAssistModal';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { EmergencyDashboardPage } from './pages/EmergencyDashboardPage';
import { NearbyServicesPage } from './pages/NearbyServicesPage';
import { HospitalsPage } from './pages/HospitalsPage';
import { PoliceSafetyPage } from './pages/PoliceSafetyPage';
import { FireRescuePage } from './pages/FireRescuePage';
import { DisasterSafetyPage } from './pages/DisasterSafetyPage';
import { EmergencyContactsPage } from './pages/EmergencyContactsPage';
import { LocalAlertsPage } from './pages/LocalAlertsPage';
import { ReportProblemPage } from './pages/ReportProblemPage';
import { SafeAssistAiPage } from './pages/SafeAssistAiPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacySafetyPage } from './pages/PrivacySafetyPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { activePage } = useApp();

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <EmergencyDashboardPage />;
      case 'services':
        return <NearbyServicesPage />;
      case 'hospitals':
        return <HospitalsPage />;
      case 'police':
        return <PoliceSafetyPage />;
      case 'fire':
        return <FireRescuePage />;
      case 'disaster':
        return <DisasterSafetyPage />;
      case 'contacts':
        return <EmergencyContactsPage />;
      case 'alerts':
        return <LocalAlertsPage />;
      case 'report':
        return <ReportProblemPage />;
      case 'safeassist':
        return <SafeAssistAiPage />;
      case 'about':
        return <AboutPage />;
      case 'privacy':
        return <PrivacySafetyPage />;
      case 'admin':
        return <AdminPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* 1. Universal Emergency Disclaimer Banner */}
      <EmergencyBanner />

      {/* 2. Main Navigation Bar */}
      <Navbar />

      {/* 3. Main Dynamic Content View */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* 4. Global Floating SafeAssist AI Assistant */}
      <SafeAssistModal />

      {/* 5. Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
