import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MobileDietaryToggle } from './DietaryToggle';

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, whileTap, layoutId, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, whileHover, whileTap, layoutId, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

describe('MobileDietaryToggle Component', () => {
  it('renders Veg and Non-Veg toggle buttons', () => {
    render(<MobileDietaryToggle value="Veg" onChange={vi.fn()} isDark={false} />);
    expect(screen.getByText('Veg')).toBeInTheDocument();
    expect(screen.getByText('Non-Veg')).toBeInTheDocument();
  });

  it('triggers onChange with selected option', () => {
    const handleChange = vi.fn();
    render(<MobileDietaryToggle value="Veg" onChange={handleChange} isDark={false} />);
    
    const nonVegBtn = screen.getByText('Non-Veg').closest('button');
    fireEvent.click(nonVegBtn);
    
    expect(handleChange).toHaveBeenCalledWith('Non-Veg');
  });
});
