import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AttractionsView } from './components/AttractionsView';
import { RoutesView } from './components/RoutesView';
import { Footer } from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState<string>('home');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentView={currentView} onNavigate={setCurrentView} />

      <main className="flex-1">
        {currentView === 'home' && <Hero onNavigate={setCurrentView} />}
        {currentView === 'attractions' && <AttractionsView />}
        {currentView === 'routes' && <RoutesView />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
