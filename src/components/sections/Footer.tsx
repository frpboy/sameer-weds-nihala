import { useState } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import PrimaryButton from '../common/PrimaryButton';
import { weddingData } from '../../config/weddingData';
import { getWhatsAppShareUrl, shareToInstagram } from '../../lib/share';

export default function Footer() {
  const [copiedToast, setCopiedToast] = useState(false);
  const webLink = 'https://shabin-weds-sana.vercel.app/';
  const rawMessage = `You are joyfully invited to the wedding celebration of Muhammed Shabin & Sana Subair on Sunday, July 19, 2026 at ${weddingData.wedding.venue}. View details & RSVP: ${webLink}`;
  
  const whatsappShareUrl = getWhatsAppShareUrl(rawMessage);

  const handleInstagramShare = async () => {
    const wasShared = await shareToInstagram(
      `You are joyfully invited to the wedding celebration of Muhammed Shabin & Sana Subair on Sunday, July 19, 2026 at ${weddingData.wedding.venue}.`,
      webLink
    );
    if (!wasShared) {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3500);
    }
  };

  return (
    <footer className="relative z-10 bg-secondary text-text pt-16 pb-20 px-6 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram */}
        <div className="w-16 h-16 rounded-full border border-primary/60 flex items-center justify-center mb-6 bg-secondary shadow-inner">
          <span className="font-cinzel text-xl text-primary font-medium tracking-tighter">
            {weddingData.monogram}
          </span>
        </div>

        <h2 className="font-cinzel text-3xl md:text-4xl text-accent font-medium mb-2 leading-tight">
          <span className="block">{weddingData.groom.fullName}</span>
          <span className="block font-cormorant italic text-primary text-xl md:text-2xl my-1 font-light">&</span>
          <span className="block">{weddingData.bride.fullName}</span>
        </h2>
        <p className="font-poppins uppercase text-xs tracking-[0.25em] text-accent/70 mb-8 font-medium">
          Sunday, July 19, 2026 | {weddingData.wedding.venue}
        </p>

        {/* Social Share Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-4">
          <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
            <PrimaryButton variant="glass" className="flex items-center gap-2.5 px-6 py-3 shadow-sm border-primary/50 text-accent hover:bg-primary/15 font-medium cursor-pointer">
              <FaWhatsapp size={20} className="text-emerald-600" />
              <span className="text-xs uppercase tracking-wider font-poppins">Share on WhatsApp</span>
            </PrimaryButton>
          </a>

          <PrimaryButton 
            variant="glass" 
            onClick={handleInstagramShare}
            className="flex items-center gap-2.5 px-6 py-3 shadow-sm border-primary/50 text-accent hover:bg-primary/15 font-medium cursor-pointer"
          >
            <FaInstagram size={20} className="text-rose-600" />
            <span className="text-xs uppercase tracking-wider font-poppins">Share to Instagram</span>
          </PrimaryButton>
        </div>

        {/* Toast notification for desktop/clipboard fallback */}
        <div className="h-8 flex items-center justify-center mb-8">
          {copiedToast && (
            <span className="font-poppins text-xs text-primary bg-primary/10 border border-primary/30 px-4 py-1.5 rounded-full animate-fade-in">
              Invitation text copied! Redirecting to Instagram...
            </span>
          )}
        </div>

        {/* Copyright & Credits */}
        <div className="font-poppins text-xs text-text/50 tracking-wider font-light space-y-1.5">
          <p>
            Made with love & prayers by{' '}
            <a 
              href="https://github.com/frpboy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline font-medium transition-colors"
            >
              Rahul
            </a>
          </p>
          <p>© 2026 {weddingData.coupleName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
