/*
 __        __   _ _     ____           _                 
 \ \      / /__| | |__ |___ \ _   _ __| |__   ___  _ __  
  \ \ /\ / / _ \ | '_ \  __) | | | / _` | '_ \ / _ \| '_ \ 
   \ V  V /  __/ | |_) |/ __/| |_| | (_| | |_) | (_) | | | |
    \_/\_/ \___|_|_.__/|_____|__, |__,_|_.__/ \___/|_| |_| 
                               |___/      WELL CYBER TECH AJJU
------------------------------------------------------------
  🔍 Well-Known File Scanner v1.1 (Educational Edition)
  by CyberTechAjju - for authorized reconnaissance only
------------------------------------------------------------
  This script helps security researchers enumerate public
  metadata endpoints for bug bounty & pentest scopes.
  Use only on targets where you have legal authorization.
------------------------------------------------------------
*/

const wellKnownPaths = [
  // 🌐 Standard .well-known files
  '/.well-known/security.txt',
  '/.well-known/assetlinks.json',
  '/.well-known/apple-app-site-association',
  '/.well-known/openid-configuration',
  '/.well-known/oauth-authorization-server',
  '/.well-known/jwks.json',
  '/.well-known/change-password',
  '/.well-known/dnt-policy.txt',
  '/.well-known/privacy-policy.txt',
  '/.well-known/terms-of-service.txt',
  '/.well-known/gpc.json',
  '/.well-known/webfinger',
  '/.well-known/ai-plugin.json',
  '/.well-known/csaf/provider-metadata.json',
  '/.well-known/nodeinfo',
  '/.well-known/trust.txt',
  '/.well-known/recovery',
  '/.well-known/host-meta',
  '/.well-known/apple-developer-merchantid-domain-association',
  '/.well-known/microsoft-identity-association.json',
  '/.well-known/pay',
  '/.well-known/acme-challenge',
  '/.well-known/smart-app-banner',

  // 🧭 Common metadata & index files
  '/robots.txt',
  '/humans.txt',
  '/sitemap.xml',
  '/manifest.json',
  '/ads.txt',
  '/app-ads.txt',
  '/crossdomain.xml',
  '/security.txt',
  '/server-status',
  '/.git/config',
  '/.svn/entries',

  // 💾 Cloud / app config
  '/service-worker.js',
  '/browserconfig.xml',
  '/client-access-policy.xml',
  '/cloudfoundryapplication.json',
  '/.env',
  '/env',
  '/config.json',
  '/api/config',
  '/api/info',
  '/version.json',

  // 🛡️ Vulnerability & bug bounty hints
  '/bugbounty',
  '/.well-known/bugbounty',
  '/security',
  '/.well-known/humans.txt',

  // 🧩 Miscellaneous
  '/favicon.ico',
  '/readme.md',
  '/license',
  '/package.json',
  '/yarn.lock',
  '/composer.lock',
  '/.dockerignore',
  '/.npmrc',
  '/.htaccess',
  '/.DS_Store'
];

// Powerful scan function
async function scanWellKnown(target) {
  console.log('%c[+] Starting Well-Known Discovery Scan on ' + target, 'color:#00ffff;font-weight:bold;');
  
  const results = await Promise.allSettled(
    wellKnownPaths.map(async (path) => {
      try {
        const res = await fetch(target + path, { method: "GET", mode: "cors" });
        if (res.ok) {
          console.log(`%cFOUND ➜ ${target}${path} [${res.status}]`, 'color: #00ff00');
        } else if (res.status !== 404) {
          console.warn(`EXISTS (non-200) ➜ ${target}${path} [${res.status}]`);
        }
      } catch (err) {
        console.error(`ERROR ➜ ${target}${path}: ${err.message}`);
      }
    })
  );

  console.log('%c[✓] Scan complete — keep learning, keep Hacking ⚡', 'color:#00ffff;font-weight:bold;');
}

// Usage: Replace with your target domain or prompt input
const target = prompt("Enter target domain (e.g. https://example.com):");
if (target) scanWellKnown(target);
else console.error("No target provided!");
