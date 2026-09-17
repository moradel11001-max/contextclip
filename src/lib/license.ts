import { LicenseState } from '../types';

const STORAGE_KEY = 'contextclip_license';

// Default configuration links (can be overridden by the user with their real store URLs)
export const PAYMENT_LINKS = {
  gumroad: 'https://moradel4.gumroad.com/l/rrffjz',
  lemonSqueezy: 'https://contextclip.lemonsqueezy.com/buy/pro',
  paypal: 'https://moradel4.gumroad.com/l/rrffjz',
};

export function getLicenseState(): LicenseState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading license', e);
  }

  return {
    isPro: false,
    licenseKey: null,
    activatedAt: null,
  };
}

export function activateLicense(licenseKey: string): { success: boolean; message: string } {
  const cleanKey = licenseKey.trim().toUpperCase();

  // Validate format: e.g. PRO-XXXX-XXXX or test keys
  if (cleanKey.startsWith('PRO-') || cleanKey === 'DEV-TEST-ACCESS') {
    const state: LicenseState = {
      isPro: true,
      licenseKey: cleanKey,
      activatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return { success: true, message: 'ContextClip Pro successfully activated!' };
  }

  return { 
    success: false, 
    message: 'Invalid license key format. Use format PRO-XXXX-XXXX or use your Gumroad/LemonSqueezy receipt key.' 
  };
}

export function deactivateLicense(): void {
  localStorage.removeItem(STORAGE_KEY);
}
