// TODO: Replace this with your actual Cloudflare Worker URL after deployment
const API_URL = 'https://portfolio-worker.your-username.workers.dev';

export const api = {
  /**
   * Fetch all site content from D1
   */
  async getContent() {
    try {
      // In development/demo mode, if API_URL is placeholder, throw to use fallbacks
      if (API_URL.includes('your-username')) throw new Error('API not configured');

      const res = await fetch(`${API_URL}/api/content`);
      if (!res.ok) throw new Error('Failed to fetch content');
      return await res.json();
    } catch (error) {
      console.warn('API Error, falling back to constants:', error);
      return null;
    }
  }
};