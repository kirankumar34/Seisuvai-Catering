import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import MenusPage from './pages/MenusPage';
import CustomMenuPage from './pages/CustomMenuPage';
import LiveCountersPage from './pages/LiveCountersPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'menus', element: <MenusPage /> },
      { path: 'custom-menu', element: <CustomMenuPage /> },
      { path: 'live-counters', element: <LiveCountersPage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
]);

export default router;
