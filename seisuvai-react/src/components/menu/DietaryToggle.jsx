import { motion } from 'framer-motion';

const TOGGLE_OPTIONS = [
  {
    id: 'All',
    label: 'All / Mixed',
    icon: (
      <span className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
        <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
      </span>
    ),
    activeGradient: 'linear-gradient(135deg, #c8a24b 0%, #e6c878 100%)',
    activeTextColor: '#0a0a0a',
    glowColor: 'rgba(200, 162, 75, 0.35)',
  },
  {
    id: 'Veg',
    label: 'Pure Veg',
    icon: (
      <span className="w-3.5 h-3.5 border-1.5 border-green-600 rounded-[3px] flex items-center justify-center bg-white/90">
        <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
      </span>
    ),
    activeGradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
    activeTextColor: '#ffffff',
    glowColor: 'rgba(22, 163, 74, 0.4)',
  },
  {
    id: 'Non-Veg',
    label: 'Non-Veg',
    icon: (
      <span className="w-3.5 h-3.5 border-1.5 border-red-600 rounded-[3px] flex items-center justify-center bg-white/90">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
      </span>
    ),
    activeGradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    activeTextColor: '#ffffff',
    glowColor: 'rgba(220, 38, 38, 0.4)',
  },
];

export default function DietaryToggle({ value, onChange, isDark, layoutGroup = 'default' }) {
  const activeOpt = TOGGLE_OPTIONS.find((opt) => opt.id === value) || TOGGLE_OPTIONS[0];

  return (
    <div
      className="relative inline-flex items-center rounded-2xl p-1.5 transition-all duration-300"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(20,20,20,0.95), rgba(12,12,12,0.95))'
          : 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(250,245,235,0.95))',
        border: `1.5px solid ${isDark ? 'rgba(200,162,75,0.2)' : 'rgba(200,162,75,0.3)'}`,
        boxShadow: isDark
          ? `0 4px 20px rgba(0,0,0,0.5), 0 0 15px ${activeOpt.glowColor}`
          : `0 4px 20px rgba(0,0,0,0.06), 0 0 15px ${activeOpt.glowColor}`,
      }}
    >
      {TOGGLE_OPTIONS.map((option) => {
        const isActive = value === option.id;

        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className="relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer select-none"
            style={{
              minHeight: '40px',
              color: isActive
                ? option.activeTextColor
                : isDark
                ? 'rgba(200,180,140,0.65)'
                : 'rgba(90,70,40,0.7)',
              zIndex: 1,
            }}
          >
            {/* Sliding Pill Background with Framer Motion layoutId */}
            {isActive && (
              <motion.div
                layoutId={`active-dietary-pill-${layoutGroup}`}
                className="absolute inset-0 rounded-xl shadow-md"
                style={{
                  background: option.activeGradient,
                  boxShadow: `0 2px 10px ${option.glowColor}`,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}

            {/* Content Icon & Label */}
            <span className="relative z-10 flex items-center gap-1.5">
              {option.icon}
              <span>{option.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function MobileDietaryToggle({ value, onChange, isDark }) {
  const options = [
    {
      id: 'Veg',
      label: 'Veg',
      icon: (
        <span className="w-3.5 h-3.5 border-1.5 border-green-600 rounded-[3px] flex items-center justify-center bg-white/90 shadow-sm flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
        </span>
      ),
    },
    {
      id: 'Non-Veg',
      label: 'Non-Veg',
      icon: (
        <span className="w-3.5 h-3.5 border-1.5 border-red-600 rounded-[3px] flex items-center justify-center bg-white/90 shadow-sm flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
        </span>
      ),
    },
  ];

  return (
    <div
      className="relative w-full p-1 rounded-full flex items-center transition-all duration-[250ms] select-none"
      style={{
        minHeight: '54px',
        background: isDark
          ? 'rgba(18, 18, 18, 0.85)'
          : 'rgba(255, 255, 255, 0.85)',
        border: `1.5px solid ${isDark ? 'rgba(200, 162, 75, 0.25)' : 'rgba(200, 162, 75, 0.3)'}`,
        boxShadow: isDark
          ? '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(200, 162, 75, 0.15)'
          : '0 4px 20px rgba(0, 0, 0, 0.08), 0 0 15px rgba(200, 162, 75, 0.15)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {options.map((option) => {
        const isActive = value === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className="relative flex-1 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-colors duration-[250ms] cursor-pointer outline-none z-10"
            style={{
              minHeight: '48px',
              color: isActive
                ? '#0a0a0a'
                : isDark
                ? 'rgba(200, 180, 140, 0.75)'
                : 'rgba(90, 70, 40, 0.75)',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeMobileVegPill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #c8a24b 0%, #e6c878 50%, #c8a24b 100%)',
                  boxShadow: '0 4px 18px rgba(200, 162, 75, 0.45), 0 0 10px rgba(200, 162, 75, 0.3)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}

            <span className="relative z-10 flex items-center justify-center gap-2">
              {option.icon}
              <span className="tracking-wide font-luxury font-bold text-sm">{option.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
