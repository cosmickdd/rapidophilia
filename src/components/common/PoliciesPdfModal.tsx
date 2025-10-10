import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
// We'll render the canonical pages into a detached container for PDF generation
const HTML2PDF_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
// Lazy import the page components so they are not eagerly bundled into the modal
const TermsComponent = React.lazy(() => import('../../pages/TermsOfUsePage'));
const PrivacyComponent = React.lazy(() => import('../../pages/PrivacyPolicyPage'));
const RefundComponent = React.lazy(() => import('../../pages/RefundPolicyPage'));

const PoliciesPdfModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleDownload = async () => {
    setLoading(true);
    // Try to dynamically import html2pdf; fall back to loading CDN script if import fails
    const ensureScript = () => {
      return new Promise<void>((resolve) => {
        if ((window as any).html2pdf) return resolve();
        const s = document.createElement('script');
        s.src = HTML2PDF_CDN;
        s.onload = () => resolve();
        s.onerror = () => resolve();
        document.head.appendChild(s);
      });
    };

    // create an offscreen container and render the canonical pages into it
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0px';
    wrapper.style.width = '800px';
    wrapper.style.background = '#fff';
    document.body.appendChild(wrapper);

    // Render React components into the offscreen wrapper using a client root
    const root = createRoot(wrapper);
    // We'll render a simple wrapper that contains the three pages stacked
    root.render(
      <React.Suspense fallback={<div />}>
        <div style={{ padding: 24, fontFamily: 'Arial, Helvetica, sans-serif', color: '#111' }}>
          <div id="pdf-terms"><TermsComponent /></div>
          <div style={{ height: 24, pageBreakAfter: 'always' }} />
          <div id="pdf-privacy"><PrivacyComponent /></div>
          <div style={{ height: 24, pageBreakAfter: 'always' }} />
          <div id="pdf-refund"><RefundComponent /></div>
        </div>
      </React.Suspense>
    );

    // call html2pdf and wait for completion, then cleanup
    try {
      const opt = {
        margin:       0.5,
        filename:     'Rapidophilia-policies.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      } as any;
  let used = false;
      try {
        const mod = await import('html2pdf.js');
        const lib = (mod && (mod as any).default) ? (mod as any).default : (mod as any);
        if (lib && typeof lib === 'function') {
          const gen = lib().set(opt).from(wrapper);
          if (gen && typeof gen.save === 'function') {
            await gen.save();
            used = true;
          }
        }
      } catch (e) {
        // dynamic import failed; try CDN
      }

      if (!used) {
        await ensureScript();
        if ((window as any).html2pdf) {
          const generator = (window as any).html2pdf().set(opt).from(wrapper);
          if (generator && typeof generator.save === 'function') {
            await generator.save();
            used = true;
          } else {
            (window as any).html2pdf().set(opt).from(wrapper).save();
            used = true;
          }
        } else {
          throw new Error('html2pdf library not available');
        }
      }
    } catch (e) {
      console.error('PDF generation failed', e);
      alert('PDF generation failed. Please try again.');
    } finally {
      // cleanup appended element and unmount the react root
      try { root.unmount(); } catch (e) { /* ignore */ }
      try { document.body.removeChild(wrapper); } catch (e) { /* ignore */ }
      setLoading(false);
      onClose();
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 z-10">
        <h3 className="text-lg font-semibold mb-3">Download Policies (PDF)</h3>
        <p className="text-sm text-gray-600 mb-4">Please review and accept the Terms & Conditions before downloading the combined policies PDF.</p>

        <div className="flex items-start space-x-3 mb-4">
          <input id="pol-accept" type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 h-4 w-4" />
          <label htmlFor="pol-accept" className="text-sm text-gray-700">I have read and accept the <a href="/terms" target="_blank" rel="noreferrer" className="text-purple-600 underline">Terms & Conditions</a>.</label>
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
          <button onClick={handleDownload} disabled={!accepted || loading} className={`px-4 py-2 rounded-lg bg-purple-600 text-white ${(!accepted || loading) ? 'opacity-60 cursor-not-allowed' : 'hover:bg-purple-700'}`}>
            {loading ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PoliciesPdfModal;
