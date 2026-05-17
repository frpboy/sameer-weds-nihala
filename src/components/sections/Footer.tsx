import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import PrimaryButton from '../common/PrimaryButton';
import { weddingData } from '../../config/weddingData';

export default function Footer() {
  const pageUrl = window.location.href;
  const shareMessage = encodeURIComponent(`You are joyfully invited to the wedding celebration of ${weddingData.groom.fullName} & ${weddingData.bride.fullName} on July 19, 2026 at ${weddingData.wedding.venue}. View details & RSVP: ${pageUrl}`);
  
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareMessage}`;
  const instagramLink = weddingData.social.instagram || 'https://instagram.com';

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
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
            <PrimaryButton variant="glass" className="flex items-center gap-2.5 px-6 py-3 shadow-sm border-primary/50 text-accent hover:bg-primary/15 font-medium">
              <FaWhatsapp size={20} className="text-emerald-600" />
              <span className="text-xs uppercase tracking-wider font-poppins">Share on WhatsApp</span>
            </PrimaryButton>
          </a>

          <a href={instagramLink} target="_blank" rel="noopener noreferrer">
            <PrimaryButton variant="glass" className="flex items-center gap-2.5 px-6 py-3 shadow-sm border-primary/50 text-accent hover:bg-primary/15 font-medium">
              <FaInstagram size={20} className="text-rose-600" />
              <span className="text-xs uppercase tracking-wider font-poppins">Follow Instagram</span>
            </PrimaryButton>
          </a>
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
