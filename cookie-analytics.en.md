# Documentation: Cookie Bar and Analytics (NameOfTheApp)

This document explains:
- That the site is an educational project and what the legal pages state.
- How the cookie bar works and how it was installed.
- How Google Analytics and Cronitor (with Cloudflare Web Analytics) are integrated, activated only after consent.

## Educational Context and Legal Pages
- This app is a **personal educational project** to learn web development; it is **not** a professional or commercial service.
- The information **does not constitute advice**. You should **always verify** with official sources and qualified professionals.
- **No guarantees** on accuracy/freshness of content; use is **at your own risk**; liability **limited to zero**.
- Hosting on Netlify or Vercel and use of third-party services (Google Analytics, Cronitor) are indicated in the policies.
- References:
  - Privacy:
  - Disclaimer:
  - Legal Notice (Impressum):
  - Terms of Service:
  - Terms:
  - Cookie Policy:

## Cookie Bar: Installation and Behavior
- **Component:** The cookie bar is implemented in [src/components/common/CookieConsent.astro](src/components/common/CookieConsent.astro) and included in the main layout [src/layouts/Layout.astro](src/layouts/Layout.astro).
- **Available buttons:**
  - **Accept All:** enables all non-essential cookies/services and calls `window.__NameOfTheApp_enableAnalytics`.
  - **Necessary Only:** allows only essential cookies; analytics are not loaded.
  - **Reject All:** blocks all non-essential; analytics are not loaded.
- **Consent persistence:** The choice is saved in `localStorage` with key `NameOfTheApp_cookie_consent` and value `all`, `necessary`, or `none`.
- **On-load behavior:** If the key is `all`, the bar stays hidden and analytics are automatically activated.
- **Google Consent Mode:** With `all`, Google consent is updated to "granted" for relevant scopes; in other cases it remains denied by default.

## Analytics Integration (only after consent)
The activation logic is in the **inline script** of the layout. It exposes `window.__NameOfTheApp_enableAnalytics`, which loads scripts only when the user has accepted "Accept All".

### Google Analytics (gtag)
- **ID configured in the project:** `GA_ID = 'G-AAAAAAA'`.
- **Bootstrap:**
  1. Initialize `window.dataLayer` and `window.gtag`.
  2. Load `https://www.googletagmanager.com/gtag/js?id=G-AAAAAAA` asynchronously.
  3. Call `gtag('js', new Date())` and update `gtag('consent', 'update', { ... 'granted' })`.
  4. Call `gtag('config', GA_ID)`.
- **Note:** In production, replace `GA_ID` with your GA4 measurement ID.

### Cronitor RUM (Real User Monitoring)
- **Client Key in the project:** `CRONITOR_CLIENT_KEY = 'AAAAAAAAAAA'`.
- **Bootstrap:**
  1. Stub `window.cronitor` and call `window.cronitor('config', { clientKey })`.
  2. Load `https://rum.cronitor.io/script.js` asynchronously.
- **Purpose:** Measures performance and reliability (e.g., load times, errors). Check Cronitor privacy for details.

### Cloudflare Web Analytics
- **Token in the project:** `'e4b24fcbfccb478487ee3914a11ce7b0'`.
- **Bootstrap:** Load `https://static.cloudflareinsights.com/beacon.min.js` with the `data-cf-beacon` attribute set to the token, using `defer`.
- **Note:** Cloudflare WA is privacy-oriented and often cookie-less, but it may process technical request data.

## Consent and Loading Flow
- The `enableAnalytics()` function is assigned to `window.__NameOfTheApp_enableAnalytics` in the layout.
- On startup, the layout attempts to read `localStorage.getItem('NameOfTheApp_cookie_consent')`:
  - If the value is **`all`**, it calls `enableAnalytics()` and enables GA/Cronitor/Cloudflare.
  - Otherwise, it **does not** load non-essential scripts.

## How to Replicate the Setup
1. **Include the Cookie Bar in the layout:** Add/import `CookieConsent`.
2. **Define `enableAnalytics()` in the layout:** Implement the function that conditionally loads GA, Cronitor, and Cloudflare.
3. **Expose the function on `window`:** `window.__NameOfTheApp_enableAnalytics = enableAnalytics`.
4. **Manage consent in localStorage:** Use the key `NameOfTheApp_cookie_consent` and values `all`, `necessary`, `none`.
5. **Replace credentials:** Set `GA_ID`, `CRONITOR_CLIENT_KEY` for your project.
6. **Verify:**
   - With **Accept All**: scripts are loaded and work.
   - With **Necessary Only**/**Reject All**: scripts do not load.

## Notes and Recommendations
- Keep analytics scripts **out of the critical path** and load them **only after consent**.
- Periodically update policies and notices to reflect regulatory changes.
- Consider using a tag manager only if necessary and configured with **consent mode**.
- In production, **do not hardcode** credentials; use environment variables or secrets.
