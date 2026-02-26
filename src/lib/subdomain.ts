const RESERVED_SUBDOMAINS = ['www', 'app', 'admin', 'api', 'mail', 'smtp'];

/**
 * Extract subdomain from current hostname.
 * - Production: storename.oaim.com → "storename"
 * - Development: checks ?subdomain= query parameter
 * - Returns null if no subdomain or if it's a reserved one
 */
export function getSubdomain(): string | null {
  // Development: check query parameter
  if (import.meta.env.DEV) {
    const params = new URLSearchParams(window.location.search);
    const sub = params.get('subdomain');
    if (sub && !RESERVED_SUBDOMAINS.includes(sub.toLowerCase())) {
      return sub.toLowerCase();
    }
  }

  const hostname = window.location.hostname;

  // Skip for localhost / IP addresses
  if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return null;
  }

  // Split hostname: storename.oaim.com → ["storename", "oaim", "com"]
  const parts = hostname.split('.');
  if (parts.length < 3) return null;

  const subdomain = parts[0].toLowerCase();
  if (RESERVED_SUBDOMAINS.includes(subdomain)) return null;

  return subdomain;
}
