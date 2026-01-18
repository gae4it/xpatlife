# Documentazione: Cookie Bar e Analytics (NameOfTheApp)

Questo documento spiega:
- Che il sito è un progetto educational e cosa riportano le pagine legali.
- Come funziona e come è stata installata la cookie bar.
- Come sono stati integrati Google Analytics e Cronitor (con Cloudflare Web Analytics), attivati solo dopo consenso.

## Contesto Educational e Pagine Legali
- Questa app è un **progetto personale educativo** per imparare lo sviluppo web; **non** è un servizio professionale o commerciale.
- Le informazioni **non costituiscono consulenza**. Si raccomanda di **verificare sempre** con fonti ufficiali e professionisti qualificati.
- **Nessuna garanzia** su accuratezza/aggiornamento dei contenuti; l'uso è **a proprio rischio**; responsabilità **limitata a zero**.
- Hosting su Netlify o Vercel e uso di servizi terzi (Google Analytics, Cronitor) sono indicati nelle policy.
- Riferimenti:
  - Privacy: 
  - Disclaimer: 
  - Legal Notice (Impressum): 
  - Terms of Service: 
  - Terms: 
  - Cookie Policy: 

## Cookie Bar: Installazione e Funzionamento
- **Componente:** La barra cookie è implementata in [src/components/common/CookieConsent.astro](src/components/common/CookieConsent.astro) e inclusa nel layout principale [src/layouts/Layout.astro](src/layouts/Layout.astro).
- **Pulsanti disponibili:**
  - **Accept All**: abilita tutti i cookie/servizi non essenziali e invoca `window.__NameOfTheApp_enableAnalytics`.
  - **Necessary Only**: consente solo i cookie necessari; non carica analytics.
  - **Reject All**: blocca tutti i non essenziali; non carica analytics.
- **Persistenza del consenso:** La scelta viene salvata in `localStorage` con chiave `NameOfTheApp_cookie_consent` e valore `all`, `necessary` o `none`.
- **On-load behavior:** Se la chiave è `all`, la barra rimane nascosta e gli analytics vengono attivati automaticamente.
- **Google Consent Mode:** Con `all`, viene aggiornata la modalità di consenso di Google a "granted" per gli ambiti rilevanti; negli altri casi resta negata di default.

## Integrazione Analytics (solo dopo consenso)
La logica di attivazione è nello **script inline** del layout. Viene esposta la funzione `window.__NameOfTheApp_enableAnalytics` che carica gli script solo quando l'utente ha accettato "Accept All".

### Google Analytics (gtag)
- **ID configurato nel progetto:** `GA_ID = 'G-AAAAAAA'`.
- **Bootstrap:**
  1. Inizializzazione `window.dataLayer` e `window.gtag`.
  2. Caricamento di `https://www.googletagmanager.com/gtag/js?id=G-AAAAAAA` in asincrono.
  3. `gtag('js', new Date())` e aggiornamento `gtag('consent', 'update', { ... 'granted' })`.
  4. `gtag('config', GA_ID)`.
- **Nota:** In produzione, sostituire `GA_ID` con il vostro ID di misura (GA4).

### Cronitor RUM (Real User Monitoring)
- **Client Key nel progetto:** `CRONITOR_CLIENT_KEY = 'AAAAAAAAAAA'`.
- **Bootstrap:**
  1. Stub `window.cronitor` e `window.cronitor('config', { clientKey })`.
  2. Caricamento di `https://rum.cronitor.io/script.js` in asincrono.
- **Funzione:** Misura prestazioni e affidabilità (es. tempi di caricamento, errori). Consultare la privacy di Cronitor per i dettagli.

### Cloudflare Web Analytics
- **Token nel progetto:** `'e4b24fcbfccb478487ee3914a11ce7b0'`.
- **Bootstrap:** Caricamento `https://static.cloudflareinsights.com/beacon.min.js` con attributo `data-cf-beacon` impostato al token, in modalità `defer`.
- **Nota:** Cloudflare WA è orientato alla privacy e spesso cookie-less, ma può trattare dati tecnici della richiesta.

## Flusso di Consenso e Caricamento
- La funzione `enableAnalytics()` è assegnata a `window.__NameOfTheApp_enableAnalytics` nel layout.
- All'avvio, il layout tenta di leggere `localStorage.getItem('NameOfTheApp_cookie_consent')`:
  - Se il valore è **`all`**, chiama `enableAnalytics()` e abilita GA/Cronitor/Cloudflare.
  - In caso contrario, **non** carica script non essenziali.

## Come replicare l'installazione
1. **Includi la Cookie Bar nel layout:** Aggiungi/importa `CookieConsent`.
2. **Definisci `enableAnalytics()` nel layout:** Implementa la funzione che carica condizionalmente GA, Cronitor e Cloudflare.
3. **Espone la funzione al `window`:** `window.__NameOfTheApp_enableAnalytics = enableAnalytics`.
4. **Gestisci il consenso in localStorage:** Usa la chiave `NameOfTheApp_cookie_consent` e i valori `all`, `necessary`, `none`.
5. **Sostituisci le credenziali:** Imposta `GA_ID`, `CRONITOR_CLIENT_KEY` per il tuo progetto.
6. **Verifica:**
   - Con **Accept All**: gli script vengono caricati e funzionano.
   - Con **Necessary Only**/**Reject All**: gli script non vengono caricati.

## Note e Raccomandazioni
- Mantieni gli script analytics **fuori dal critical path** e caricali **solo dopo consenso**.
- Aggiorna periodicamente le policy e le informative per riflettere cambiamenti normativi.
- Valuta l'uso di un tag manager solo se necessario e configurato con **consent mode**.
- In produzione, **non hardcodare** credenziali; usa variabili d'ambiente o segreti.

