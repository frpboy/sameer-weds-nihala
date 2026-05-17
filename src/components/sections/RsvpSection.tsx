import React, { useState } from 'react';
import SectionContainer from '../common/SectionContainer';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import PrimaryButton from '../common/PrimaryButton';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { BiCheckCircle } from 'react-icons/bi';

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    attendance: '',
    guestCount: '1',
    dietaryOrNotes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.attendance) return;
    setSubmitted(true);
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
        <GlassCard className="p-8 md:p-12 border-primary/40 shadow-xl relative overflow-hidden">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <BiCheckCircle size={64} className="text-primary mb-6 animate-bounce" />
              <h3 className="font-cinzel text-3xl text-accent font-medium mb-3">Shukran! Thank You</h3>
              <p className="font-poppins text-sm md:text-base text-text/80 font-light mb-8 max-w-md">
                Your RSVP has been beautifully received. We are so grateful and can't wait to share our joyful moments with you.
              </p>
              <PrimaryButton variant="outline" onClick={() => setSubmitted(false)}>
                Submit Another RSVP
              </PrimaryButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <PrimaryButton variant="solid" size="lg" type="submit" className="w-full py-4 text-base shadow-lg">
                  Confirm RSVP
                </PrimaryButton>
              </div>
            </form>
          )}
        </GlassCard>
      </div>
    </SectionContainer>
  );
}
