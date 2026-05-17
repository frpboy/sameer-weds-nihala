import React, { useState } from 'react';
import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import Card from '../ui/cards/Card';
import Button from '../ui/buttons/Button';
import Input from '../ui/inputs/Input';
import Select from '../ui/inputs/Select';
import { BiCheckCircle, BiLoaderAlt } from 'react-icons/bi';

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    attendance: 'yes',
    guestCount: '1',
    dietaryOrNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.attendance) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit RSVP');
      }

      setSubmitted(true);
      setFormData({ fullName: '', attendance: 'yes', guestCount: '1', dietaryOrNotes: '' });
    } catch (err: any) {
      console.error('RSVP Error:', err);
      setErrorMsg(err.message || 'Unable to connect to RSVP server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const attendanceOptions = [
    { value: 'yes', label: 'Joyfully attending' },
    { value: 'no', label: 'Regretfully declining' },
  ];

  const guestOptions = [
    { value: '1', label: '1 (Just me)' },
    { value: '2', label: '2 Guests' },
    { value: '3', label: '3 Guests' },
    { value: '4', label: '4 Guests' },
    { value: '5+', label: '5+ Guests (Family)' },
  ];

  return (
    <SectionContainer id="rsvp" className="relative z-10">
      <SectionTitle title="Will You Attend?" subtitle="Please reply by July 1st, 2026" />

      <div className="max-w-2xl mx-auto px-4">
        <Card variant="glass" className="p-8 md:p-12 border-primary/40 shadow-xl relative overflow-hidden">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
              <BiCheckCircle size={64} className="text-primary mb-6 animate-bounce" />
              <h3 className="font-cinzel text-3xl text-accent font-medium mb-3">Shukran! Thank You</h3>
              <p className="font-poppins text-sm md:text-base text-text/80 font-light mb-8 max-w-md">
                Your RSVP has been beautifully received. We are so grateful and can't wait to share our joyful moments with you.
              </p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Submit Another RSVP
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs md:text-sm text-center font-medium">
                  {errorMsg}
                </div>
              )}

              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />

              <Select
                label="Will You Be Attending?"
                options={attendanceOptions}
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                required
              />

              {formData.attendance === 'yes' && (
                <Select
                  label="Number of Guests"
                  options={guestOptions}
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                />
              )}

              <Input
                label="Special Wishes or Dietary Notes (Optional)"
                placeholder="Share your prayers or note"
                value={formData.dietaryOrNotes}
                onChange={(e) => setFormData({ ...formData, dietaryOrNotes: e.target.value })}
              />

              <div className="pt-4">
                <Button 
                  variant="solid" 
                  size="lg" 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 text-base shadow-lg flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <BiLoaderAlt size={22} className="animate-spin text-secondary" />
                      <span>Submitting RSVP...</span>
                    </>
                  ) : (
                    <span>Confirm RSVP</span>
                  )}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </SectionContainer>
  );
}
