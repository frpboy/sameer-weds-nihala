import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiCheck, BiX, BiSend, BiMinus, BiPlus, BiLoaderAlt, BiCheckCircle } from 'react-icons/bi';
import { RsvpEntry } from './types';

interface RsvpFormProps {
  onAddEntry: (entry: RsvpEntry) => void;
  themeCard: string;
}

export default function RsvpForm({ onAddEntry, themeCard }: RsvpFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    attendance: 'yes',
    guestCount: 1,
    dietaryOrNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, guestCount: String(formData.guestCount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit RSVP');
      
      const newEntry: RsvpEntry = {
        fullName: formData.fullName,
        attendance: formData.attendance,
        guestCount: String(formData.guestCount),
        dietaryOrNotes: formData.dietaryOrNotes,
        created_at: new Date().toISOString(),
      };

      onAddEntry(newEntry);
      setSubmitted(true);
      setFormData({ fullName: '', attendance: 'yes', guestCount: 1, dietaryOrNotes: '' });
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to connect. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestChange = (delta: number) =>
    setFormData((p) => ({ ...p, guestCount: Math.max(1, Math.min(10, p.guestCount + delta)) }));

  return (
    <div className={`${themeCard} p-7`}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-10 min-h-[300px]"
          >
            <BiCheckCircle size={52} className="text-primary mb-4" />
            <h3 className="font-cinzel text-2xl text-accent font-medium mb-2 tracking-wide">Shukran!</h3>
            <p className="font-poppins text-sm text-text/70 mb-6 leading-relaxed max-w-xs">
              Your RSVP was beautifully received. We can't wait to celebrate with you!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="border border-primary/50 text-primary font-poppins text-xs px-5 py-2.5 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer"
            >
              Submit Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/30 text-red-500 text-xs text-center">{errorMsg}</div>
            )}

            {/* Name */}
            <div className="space-y-1.5">
              <label className="block font-poppins text-[10px] uppercase tracking-widest text-primary font-semibold">Your Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className="w-full bg-secondary border border-primary/30 rounded-xl px-4 py-3 text-sm text-text placeholder-text/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all"
              />
            </div>

            {/* Attendance Toggle */}
            <div className="space-y-2">
              <label className="block font-poppins text-[10px] uppercase tracking-widest text-primary font-semibold">Will You Be Attending?</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'yes', label: 'Joyfully Accepts', Icon: BiCheck },
                  { value: 'no', label: 'Regretfully Declines', Icon: BiX },
                ].map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: value })}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border transition-all duration-300 font-poppins text-xs font-medium cursor-pointer ${
                      formData.attendance === value
                        ? 'border-primary bg-primary/15 text-accent shadow-[0_0_12px_rgba(199,169,127,0.15)]'
                        : 'border-primary/20 bg-secondary text-text/60 hover:border-primary/50'
                    }`}
                  >
                    <Icon className={`text-base ${formData.attendance === value ? 'text-primary' : 'text-text/40'}`} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Stepper */}
            <AnimatePresence>
              {formData.attendance === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <label className="block font-poppins text-[10px] uppercase tracking-widest text-primary font-semibold">Number of Guests</label>
                  <div className="flex items-center gap-4 bg-secondary border border-primary/30 rounded-xl p-2.5 w-fit">
                    <button type="button" onClick={() => handleGuestChange(-1)} className="w-8 h-8 rounded-lg border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors cursor-pointer text-sm">
                      <BiMinus />
                    </button>
                    <span className="font-cinzel text-xl text-accent font-semibold min-w-[1.5rem] text-center">{formData.guestCount}</span>
                    <button type="button" onClick={() => handleGuestChange(1)} className="w-8 h-8 rounded-lg border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors cursor-pointer text-sm">
                      <BiPlus />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Blessing */}
            <div className="space-y-1.5">
              <label className="block font-poppins text-[10px] uppercase tracking-widest text-primary font-semibold">
                Blessing / Message <span className="text-text/40 lowercase tracking-normal font-normal">(optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Write your heartfelt wishes..."
                value={formData.dietaryOrNotes}
                onChange={(e) => setFormData({ ...formData, dietaryOrNotes: e.target.value })}
                className="w-full bg-secondary border border-primary/30 rounded-xl p-4 text-sm text-text placeholder-text/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-primary hover:bg-accent text-secondary font-poppins font-semibold text-base flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_8px_24px_rgba(199,169,127,0.3)] hover:shadow-[0_12px_32px_rgba(199,169,127,0.5)] disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting
                ? <><BiLoaderAlt size={18} className="animate-spin" /><span>Sending...</span></>
                : <><BiSend size={18} /><span>Send RSVP</span></>
              }
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
