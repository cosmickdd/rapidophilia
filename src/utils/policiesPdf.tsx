import React from 'react';
import { createRoot } from 'react-dom/client';

// Import canonical pages directly for PDF rendering (top-level imports)
import TermsOfUsePage from '../pages/TermsOfUsePage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import RefundPolicyPage from '../pages/RefundPolicyPage';

const HTML2PDF_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';

export async function generatePoliciesPdf(filename = 'Rapidophilia-policies.pdf') {
  console.debug('[policiesPdf] generatePoliciesPdf() start', { filename });
  // helper to load CDN fallback
  const ensureScript = () => {
    return new Promise<void>((resolve) => {
      if ((window as any).html2pdf) return resolve();
      const s = document.createElement('script');
      s.src = HTML2PDF_CDN;
      s.onload = () => { console.debug('[policiesPdf] html2pdf CDN loaded'); resolve(); };
      s.onerror = (err) => { console.warn('[policiesPdf] failed to load html2pdf CDN', err); resolve(); };
      document.head.appendChild(s);
    });
  };

  // create a hidden but in-viewport container so html2canvas can measure fonts & layout
  const wrapper = document.createElement('div');
  // Keep it positioned inside the viewport but invisible to the user
  wrapper.style.position = 'fixed';
  wrapper.style.left = '0px';
  wrapper.style.top = '0px';
  wrapper.style.width = '800px';
  wrapper.style.height = 'auto';
  wrapper.style.overflow = 'visible';
  wrapper.style.pointerEvents = 'none';
  wrapper.style.opacity = '0';
  wrapper.style.zIndex = '2147483647';
  wrapper.style.background = '#fff';
  // allow page-breaks and printing styles
  wrapper.setAttribute('data-pdf-render', 'true');
  document.body.appendChild(wrapper);

  const root = createRoot(wrapper);
  try {
    root.render(
    <div style={{ padding: 24, fontFamily: 'Arial, Helvetica, sans-serif', color: '#111' }}>
      <div><TermsOfUsePage /></div>
      <div style={{ height: 24, pageBreakAfter: 'always' }} />
      <div><PrivacyPolicyPage /></div>
      <div style={{ height: 24, pageBreakAfter: 'always' }} />
      <div><RefundPolicyPage /></div>
    </div>
    );
  } catch (renderErr) {
    console.error('[policiesPdf] error rendering offscreen PDF content', renderErr);
    try { root.unmount(); } catch (e) { /* ignore */ }
    try { document.body.removeChild(wrapper); } catch (e) { /* ignore */ }
    throw renderErr;
  }

  // wait a tick for layout, fonts and images to load
  const waitForPaint = (ms = 350) => new Promise((res) => setTimeout(res, ms));
  try {
    console.debug('[policiesPdf] waiting for layout/paint...');
    await waitForPaint(500);
    // Also force a reflow/read to ensure fonts are applied
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    wrapper.getBoundingClientRect();
    console.debug('[policiesPdf] layout/paint likely complete');
  } catch (e) {
    console.warn('[policiesPdf] waitForPaint error', e);
  }

  try {
    const opt = {
      margin:       0.5,
      filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    } as any;

    let used = false;
    try {
      // @ts-ignore - dynamic import of html2pdf might not have types installed in the workspace
      const mod = await import('html2pdf.js');
      console.debug('[policiesPdf] imported html2pdf module', { mod });
      const lib = (mod && (mod as any).default) ? (mod as any).default : (mod as any);
      if (lib && typeof lib === 'function') {
        const gen = lib().set(opt).from(wrapper);
        if (gen && typeof gen.save === 'function') {
          await gen.save();
          console.debug('[policiesPdf] pdf saved via dynamic import');
          used = true;
        }
      }
    } catch (e) {
      console.warn('[policiesPdf] dynamic import of html2pdf failed', e);
    }

    if (!used) {
      await ensureScript();
      console.debug('[policiesPdf] ensureScript completed, html2pdf on window =', !!(window as any).html2pdf);
      if ((window as any).html2pdf) {
        const generator = (window as any).html2pdf().set(opt).from(wrapper);
        if (generator && typeof generator.save === 'function') {
          await generator.save();
          console.debug('[policiesPdf] pdf saved via window.html2pdf');
        } else {
          (window as any).html2pdf().set(opt).from(wrapper).save();
        }
      } else {
        throw new Error('html2pdf library not available');
      }
    }
  } finally {
    try { root.unmount(); } catch (e) { /* ignore */ }
    try { document.body.removeChild(wrapper); } catch (e) { /* ignore */ }
  }
}

export default generatePoliciesPdf;
// (duplicate content removed)
