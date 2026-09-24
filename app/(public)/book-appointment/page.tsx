import React from 'react';
import type { Metadata } from 'next';
import { BookingEngine } from '@/components/BookingEngine';

export const metadata: Metadata = {
  title: 'Schedule Your Service | CredTax Appointment Booking',
  description:
    'Book a discovery session with CredTax Solution. Check our availability across US and international time zones and select a time that works for your CPA firm.',
};

export default function BookAppointmentPage() {
  return (
    <div className="section" style={{ background: '#FAFCFC', minHeight: 'calc(100vh - 150px)' }}>
      <div className="wrap">
        <BookingEngine />
      </div>
    </div>
  );
}
