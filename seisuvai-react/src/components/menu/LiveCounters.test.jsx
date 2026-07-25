import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LiveCounters from './LiveCounters';

// Mock store
const mockToggleItem = vi.fn();
const mockOpenEnquiry = vi.fn();
let mockSelectedItems = [];

vi.mock('../../store/useStore', () => ({
  useThemeStore: () => ({ isDark: false }),
  useMenuStore: () => ({
    selectedItems: mockSelectedItems,
    toggleItem: mockToggleItem,
    openEnquiry: mockOpenEnquiry,
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

describe('LiveCounters Component', () => {
  it('should render header and categories', () => {
    render(<LiveCounters />);
    expect(screen.getByText('Interactive')).toBeInTheDocument();
    expect(screen.getByText('Live Counters')).toBeInTheDocument();
    expect(screen.getByText('Pani Puri')).toBeInTheDocument();
    expect(screen.getByText('Popcorn')).toBeInTheDocument();
    expect(screen.getByText('Chocolate Fountain')).toBeInTheDocument();
  });

  it('should call toggleItem when a card is clicked', () => {
    render(<LiveCounters />);
    
    const card = screen.getByText('Pani Puri');
    fireEvent.click(card);
    
    expect(mockToggleItem).toHaveBeenCalled();
  });
});
