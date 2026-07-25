import { Link } from 'react-router-dom';
import { useThemeStore } from '../store/useStore';
import LiveCounters from '../components/menu/LiveCounters';

export default function LiveCountersPage() {
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
          <span>Live Food Counters</span>
        </nav>
      </div>

      {/* Header */}
      <div className="container-luxury py-10 text-center">
        <div className="label-badge mb-4">Live Food Counters</div>
        <h1 className="heading-section mb-4" style={{ color: textPrimary }}>
          Fresh food made right in front of your guests
        </h1>
        <p className="text-base sm:text-lg mx-auto" style={{ color: textMuted, maxWidth: '580px' }}>
          Add a live counter to your event and watch your guests enjoy the experience of seeing their food prepared fresh.
          From Dosa and Chaat to Mocktails and Biryani — we bring the counter to your venue.
        </p>
      </div>

      {/* LiveCounters component (unchanged) */}
      <div className="pb-20">
        <LiveCounters />
      </div>

    </div>
  );
}
