// API integration utility for Seisuvai V2
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000'
  : 'https://seisuvai-api.onrender.com';

export const submitEnquiry = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API submission failed, falling back to WhatsApp:', error);
    // Return a failed flag so the component can handle it if needed
    return { success: false, error: error.message };
  }
};
