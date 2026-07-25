import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitEnquiry } from './api';

describe('API Utility tests', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should return success response when backend succeeds', async () => {
    const mockResponse = { success: true, data: { id: '123' } };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await submitEnquiry({ name: 'Test User' });
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it('should catch error and return failed state when backend fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network failure'));

    const result = await submitEnquiry({ name: 'Test User' });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Network failure');
  });
});
