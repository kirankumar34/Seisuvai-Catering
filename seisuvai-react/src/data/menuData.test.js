import { describe, it, expect } from 'vitest';
import { MENU_DATA } from './menuData';

describe('Menu Data Audit & Extraction (Phase 0/1)', () => {
  it('should extract exactly 16 menus from V1', () => {
    expect(MENU_DATA.cateringMenus).toBeInstanceOf(Array);
    expect(MENU_DATA.cateringMenus.length).toBe(16);
  });

  it('should have correct fields in all menu objects', () => {
    MENU_DATA.cateringMenus.forEach((menu) => {
      expect(menu.id).toBeDefined();
      expect(typeof menu.id).toBe('string');
      expect(menu.mainTitle).toBeDefined();
      expect(menu.subtitle).toBeDefined();
      expect(menu.image).toBeDefined();
      expect(menu.category).toBeDefined();
      expect(menu.type).toBeDefined();
      expect(['Veg', 'Non-Veg']).toContain(menu.type);
      expect(menu.sections).toBeInstanceOf(Array);
      expect(menu.sections.length).toBeGreaterThan(0);

    });
  });

  it('should map categories to allowed V2 values: Breakfast, Lunch, Dinner, Baby Shower', () => {
    const allowedCategories = ['Breakfast', 'Lunch', 'Dinner', 'Baby Shower'];
    MENU_DATA.cateringMenus.forEach((menu) => {
      expect(allowedCategories).toContain(menu.category);
    });
  });

  it('should have valid sections and items', () => {
    MENU_DATA.cateringMenus.forEach((menu) => {
      menu.sections.forEach((section) => {
        expect(section.title).toBeDefined();
        expect(section.items).toBeInstanceOf(Array);
        expect(section.items.length).toBeGreaterThan(0);
        section.items.forEach((item) => {
          expect(typeof item).toBe('string');
          expect(item.length).toBeGreaterThan(0);
        });
      });
    });
  });
});
