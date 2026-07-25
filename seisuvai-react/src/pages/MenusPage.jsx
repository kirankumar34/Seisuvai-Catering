import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useThemeStore } from '../store/useStore';
import StandardMenu from '../components/menu/StandardMenu';

export default function MenusPage() {
  const { isDark } = useThemeStore();
  const bg = isDark ? '#0a0a0a' : '#fdf8f0';
  const textPrimary = isDark ? 'rgba(253,248,240,0.95)' : '#1a0f00';
  const textMuted = isDark ? 'rgba(200,180,140,0.6)' : 'rgba(80,60,20,0.65)';

  return (
    <div style={{ background: bg, paddingTop: '80px', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div className="container-luxury pt-8 pb-2">
        <nav className="flex items-center gap-2 text-xs" style={{ color: textMuted }}>
          <Link to="/" style={{ color: '#c8a24b', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span>Standard Menus</span>
        </nav>
      </div>

      {/* Header */}
      <div className="container-luxury py-10 text-center">
        <div className="label-badge mb-4">Our Menu Collection</div>
        <h1 className="heading-section mb-4" style={{ color: textPrimary }}>
          Ready-made menus for every occasion
        </h1>
        <p className="text-base sm:text-lg mx-auto" style={{ color: textMuted, maxWidth: '580px' }}>
          Choose from our carefully planned menu packages — Breakfast, Lunch, Dinner, Wedding, and more.
          Each one is designed to work well for the occasion.
        </p>
      </div>

      {/* Standard Menu component (unchanged) */}
      <div className="pb-20">
        <StandardMenu />
      </div>

      {/* CTA to Custom Menu */}
      <div className="container-luxury pb-20">
        <div
          className="rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: isDark ? 'rgba(26,26,26,0.8)' : '#ffffff',
            border: '1.5px solid rgba(200,162,75,0.2)',
          }}
        >
          <div>
            <h3 className="font-bold text-xl mb-2" style={{ color: textPrimary }}>
              Want to build your own menu?
            </h3>
            <p className="text-sm" style={{ color: textMuted }}>
              Pick exactly the dishes you want using our Custom Menu Builder. Mix breakfast items, lunch dishes, or non-veg options.
            </p>
          </div>
          <Link
            to="/custom-menu"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-black btn-gold"
            style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            Build Custom Menu <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
