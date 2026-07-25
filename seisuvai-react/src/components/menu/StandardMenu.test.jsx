import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StandardMenu from './StandardMenu';

// Mock the zustand stores
vi.mock('../../store/useStore', () => ({
  useThemeStore: () => ({ isDark: false }),
  useMenuStore: () => ({
    openEnquiry: vi.fn(),
    mobileDietaryFilter: 'Veg',
    setMobileDietaryFilter: vi.fn(),
  }),
}));

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_, prop) => ({ children, whileHover, whileTap, layout, layoutId, ...props }) => {
        const Component = prop;
        return <Component {...props}>{children}</Component>;
      },
    }
  ),
  AnimatePresence: ({ children }) => <>{children}</>,
}));

describe('StandardMenu Component', () => {
  it('should render standard menu headers and categories', () => {
    render(<StandardMenu />);
    
    expect(screen.getByText('Curated')).toBeInTheDocument();
    expect(screen.getByText('Standard Menus')).toBeInTheDocument();
    
    // Check for categories
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.getByText('Lunch')).toBeInTheDocument();
    expect(screen.getByText('Dinner')).toBeInTheDocument();
    expect(screen.getByText('Baby Shower')).toBeInTheDocument();
  });

  it('should display economy selection card for breakfast', () => {
    render(<StandardMenu />);
    expect(screen.getAllByText('Menu 1: Economy Selection')[0]).toBeInTheDocument();
  });

  it('should open modal when View Full Menu is clicked', () => {
    render(<StandardMenu />);
    
    const viewButtons = screen.getAllByRole('button', { name: /View Full Menu/i });
    expect(viewButtons.length).toBeGreaterThan(0);
    
    // Click the first button
    fireEvent.click(viewButtons[0]);
    
    // Check if the modal content is rendered
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
