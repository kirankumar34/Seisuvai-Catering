import { describe, it, expect } from 'vitest';
import { LIVE_COUNTERS_DATA } from './liveCountersData';

describe('Live Counters Data (Phase 0/1)', () => {
  it('should have exactly 10 live counter options', () => {
    expect(LIVE_COUNTERS_DATA).toBeInstanceOf(Array);
    expect(LIVE_COUNTERS_DATA.length).toBe(10);
  });

  it('should have valid structure for all live counters', () => {
    const validCategories = [
      'Live Food Counters',
      'Experience / Fun Stalls',
      'Premium Add-ons'
    ];

    LIVE_COUNTERS_DATA.forEach((lc) => {
      expect(lc.id).toBeDefined();
      expect(lc.name).toBeDefined();
      expect(lc.description).toBeDefined();
      expect(lc.icon).toBeDefined();
      expect(lc.category).toBeDefined();
      expect(validCategories).toContain(lc.category);
      expect(lc.tag).toBeDefined();
      expect(['Veg', 'Non-Veg', 'Both']).toContain(lc.tag);
    });
  });
});
