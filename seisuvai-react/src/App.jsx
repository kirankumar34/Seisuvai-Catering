import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useThemeStore } from './store/useStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import StickyActions from './components/StickyActions';

export default function App() {
  const { isDark } = useThemeStore();
  const { pathname } = useLocation();

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  }, [isDark]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className={isDark ? 'dark bg-gray-950' : 'bg-white'}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <EnquiryModal />
      <StickyActions />
    </div>
  );
}
