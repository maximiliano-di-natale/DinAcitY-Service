import React, { useState } from 'react';
import { ViewMode } from './types';
import { useBusinesses } from './hooks/useBusinesses';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { UserView } from './views/UserView';
import { OnboardingView } from './views/OnboardingView';
import { DashboardView } from './views/DashboardView';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  
  const {
    businesses,
    filteredBusinesses,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedBusiness,
    openBusinessDetail,
    closeBusinessDetail,
    contactViaWhatsApp,
    registerBusiness,
    updateBusiness,
    currentDashboardBusiness,
    setDashboardBusinessId
  } = useBusinesses();

  const handleRegister = (payload: Parameters<typeof registerBusiness>[0]) => {
    const created = registerBusiness(payload);
    // After 1.5s, switch view to dashboard to show newly registered business metrics
    setTimeout(() => {
      setDashboardBusinessId(created.id);
      setCurrentView('dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-500 selection:text-white">
      {/* Sticky Modern Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        businessCount={businesses.length}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {currentView === 'explore' && (
          <UserView
            businesses={businesses}
            filteredBusinesses={filteredBusinesses}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedBusiness={selectedBusiness}
            onSelectBusiness={openBusinessDetail}
            onCloseDetail={closeBusinessDetail}
            onContactWhatsApp={contactViaWhatsApp}
            onNavigateToRegister={() => setCurrentView('register')}
          />
        )}

        {currentView === 'register' && (
          <OnboardingView
            onRegister={handleRegister}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            businesses={businesses}
            currentBusiness={currentDashboardBusiness}
            onSelectBusiness={setDashboardBusinessId}
            onUpdateBusiness={updateBusiness}
            onNavigate={setCurrentView}
            onContactWhatsApp={contactViaWhatsApp}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={setCurrentView} />
    </div>
  );
};

export default App;
