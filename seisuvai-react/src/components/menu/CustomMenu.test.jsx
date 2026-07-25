import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CustomMenu from './CustomMenu';

// Mock store
const mockToggleItem = vi.fn();
const mockOpenEnquiry = vi.fn();
const mockClearItems = vi.fn();
let mockSelectedItems = [];

vi.mock('../../store/useStore', () => ({
  useThemeStore: () => ({ isDark: false }),
  useMenuStore: () => ({
    selectedItems: mockSelectedItems,
    toggleItem: mockToggleItem,
    openEnquiry: mockOpenEnquiry,
    clearItems: mockClearItems,
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

describe('CustomMenu Component', () => {
  it('should render header and toggles', () => {
    render(<CustomMenu />);
    expect(screen.getByText('Build Your')).toBeInTheDocument();
    expect(screen.getByText('Custom Menu')).toBeInTheDocument();
    
    // Veg vs Non-Veg toggle tabs
    expect(screen.getByText('🌿 Vegetarian')).toBeInTheDocument();
    expect(screen.getByText('🍖 Non-Vegetarian')).toBeInTheDocument();
  });

  it('should render Veg categories by default', () => {
    render(<CustomMenu />);
    expect(screen.getByText('Sweet Items')).toBeInTheDocument();
    expect(screen.getByText('Dosa Varieties')).toBeInTheDocument();
  });

  it('should toggle to Non-Veg and display Non-Veg categories', async () => {
    render(<CustomMenu />);
    
    const nonVegTab = screen.getByText('🍖 Non-Vegetarian');
    fireEvent.click(nonVegTab);
    
    expect(mockClearItems).toHaveBeenCalled();
    expect(screen.getByText('Rice & Biryani')).toBeInTheDocument();
    expect(screen.getByText('Indian Breads')).toBeInTheDocument();
  });
});
