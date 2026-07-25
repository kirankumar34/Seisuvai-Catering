import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MenuDetailModal from './MenuDetailModal';

// Mock Framer Motion since it can be problematic in JSDOM tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, whileTap, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, whileHover, whileTap, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

const mockMenu = {
  id: 'tiffin_veg_1',
  mainTitle: 'Tiffin Menu - Veg',
  name: 'Menu 1: Economy Selection',
  price: '₹170 – ₹200',
  sections: [
    { title: '🍬 Sweet', items: ['Pineapple Kesari'] },
    { title: '🍽️ Breakfast Items', items: ['Idli', 'Medu Vada'] },
  ],
  image: '/images/menu-1-south-indian.png',
};

describe('MenuDetailModal Component', () => {
  it('should render nothing when isOpen is false', () => {
    const { container } = render(
      <MenuDetailModal isOpen={false} onClose={() => {}} menu={mockMenu} onSelect={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render menu details when isOpen is true', () => {
    render(
      <MenuDetailModal isOpen={true} onClose={() => {}} menu={mockMenu} onSelect={() => {}} />
    );

    expect(screen.getByText('Tiffin Menu - Veg')).toBeInTheDocument();
    expect(screen.getByText('Menu 1: Economy Selection')).toBeInTheDocument();
    expect(screen.getByText('Custom quote on enquiry')).toBeInTheDocument();
    expect(screen.getByText('🍬 Sweet')).toBeInTheDocument();

    expect(screen.getByText('Pineapple Kesari')).toBeInTheDocument();
    expect(screen.getByText('🍽️ Breakfast Items')).toBeInTheDocument();
    expect(screen.getByText('Idli')).toBeInTheDocument();
  });

  it('should trigger onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <MenuDetailModal isOpen={true} onClose={handleClose} menu={mockMenu} onSelect={() => {}} />
    );

    const closeBtn = screen.getByLabelText('Close modal');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledOnce();
  });

  it('should trigger onSelect and onClose when Book This Menu is clicked', () => {
    const handleSelect = vi.fn();
    const handleClose = vi.fn();
    render(
      <MenuDetailModal isOpen={true} onClose={handleClose} menu={mockMenu} onSelect={handleSelect} />
    );

    const bookBtn = screen.getByRole('button', { name: /Book This Menu/i });
    fireEvent.click(bookBtn);
    expect(handleSelect).toHaveBeenCalledWith(mockMenu);
    expect(handleClose).toHaveBeenCalledOnce();
  });
});
