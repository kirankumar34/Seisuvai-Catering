import { describe, it, expect } from 'vitest';
import { CUSTOM_MENU_VEG, CUSTOM_MENU_NONVEG } from './customMenuData';

describe('Custom Menu Data Audit & Extraction (Phase 0/1)', () => {
  it('should have correct number of categories in Veg and Non-Veg sets', () => {
    expect(CUSTOM_MENU_VEG).toBeInstanceOf(Array);
    expect(CUSTOM_MENU_VEG.length).toBe(10);

    expect(CUSTOM_MENU_NONVEG).toBeInstanceOf(Array);
    expect(CUSTOM_MENU_NONVEG.length).toBe(8);
  });

  it('should have valid structure for all Custom Menu categories and items', () => {
    const allCategories = [...CUSTOM_MENU_VEG, ...CUSTOM_MENU_NONVEG];
    
    allCategories.forEach((cat) => {
      expect(cat.id).toBeDefined();
      expect(cat.label).toBeDefined();
      expect(cat.icon).toBeDefined();
      expect(cat.items).toBeInstanceOf(Array);
      expect(cat.items.length).toBeGreaterThan(0);

      cat.items.forEach((item) => {
        expect(item.id).toBeDefined();
        expect(item.name).toBeDefined();
        expect(item.tag).toBeDefined();
        expect(['Veg', 'Non-Veg']).toContain(item.tag);
        expect(item.image).toBeDefined();
        expect(item.image.startsWith('/')).toBe(true);

      });
    });
  });
});
