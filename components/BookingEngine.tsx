'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfToday,
  isWeekend,
} from 'date-fns';
import {
  AvailabilitySettings,
  DEFAULT_AVAILABILITY,
  DEFAULT_SLOTS,
  getAvailableSlotsForDate,
  normalizeTimeString,
} from '@/lib/availability';

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (EDT/EST)' },
  { value: 'America/Chicago', label: 'Central Time (CDT/CST)' },
  { value: 'America/Denver', label: 'Mountain Time (MDT/MST)' },
  { value: 'America/Los_Angeles', label: 'Pacific Daylight Time (PDT/PST)' },
  { value: 'America/Toronto', label: 'Eastern Canada (Toronto)' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
  { value: 'UTC', label: 'Coordinated Universal Time (UTC)' },
];

const SERVICES = [
  {
    id: 'tax',
    title: 'US Tax Services',
    description: 'Individual (1040) and Business (1065, 1120, 1120-S) preparation support with workpapers and review notes.',
  },
  {
    id: 'review',
    title: 'Tax Review & QC',
    description: 'Senior-level quality control, review notes, missing-information identification and accuracy checks before CPA sign-off.',
  },
  {
    id: 'accounting',
    title: 'Bookkeeping & Accounting',
    description: 'Month-end close, account reconciliations, general ledger cleanup, and financial reporting inside QuickBooks or Xero.',
  },
  {
    id: 'workflow',
    title: 'CPA Firm Workflow Support',
    description: 'TaxDome coordination, client document chasing, inbox support, and pipeline scheduling.',
  },
  {
    id: 'pod',
    title: 'CredTax Pod (Full Function)',
    description: 'A dedicated multi-disciplinary team (Preparer, Senior Reviewer, Coordinator) built around your firm’s workflow.',
  },
  {
    id: 'succession',
    title: 'Succession & Continuity Consultation',
    description: 'Long-term operating partnership discussion for CPA firm owners looking to reduce day-to-day production.',
  },
];

const TIME_SLOTS = [
  '10:00 am', '10:30 am', '11:00 am', '11:30 am',
  '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
  '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm',
  '4:00 pm', '4:30 pm', '5:00 pm'
];

const COUNTRY_CODES = [
  { code: '+1', country: 'US / CA' },
  { code: '+91', country: 'IN' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'AU' },
  { code: '+64', country: 'NZ' },
];

export function BookingEngine() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const today = startOfToday();

  // Step 1 State
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 am');
  const [selectedService, setSelectedService] = useState<string>('US Tax Services');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('America/Los_Angeles');
  const [showServiceDetails, setShowServiceDetails] = useState(false);

  // Step 2 State (Form)
  const [clientName, setClientName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [servicesInterested, setServicesInterested] = useState<string[]>(['US Tax Preparation']);
  const [workload, setWorkload] = useState('20-50 returns / mo');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});
  const [step1Error, setStep1Error] = useState('');

  // Validate fields in booking step 2
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'clientName':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid work email (e.g. name@firm.com).';
        return '';
      case 'phoneNumber':
        if (value.trim()) {
          const clean = value.replace(/[\s().-]/g, '');
          if (clean.length < 7) return 'Please enter a valid phone number (at least 7 digits).';
        }
        return '';
      default:
        return '';
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    if (field === 'clientName') setClientName(value);
    if (field === 'email') setEmail(value);
    if (field === 'phoneNumber') setPhoneNumber(value);

    if (formTouched[field]) {
      const err = validateField(field, value);
      setFormErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleFieldBlur = (field: string, value: string) => {
    setFormTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setFormErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleProceedToStep2 = () => {
    if (!selectedSlot || currentDaySlots.slots.length === 0) {
      setStep1Error('Please select an available time slot from the list before proceeding.');
      return;
    }
    setStep1Error('');
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Live Availability & Booked Slots State
  const [availabilitySettings, setAvailabilitySettings] = useState<AvailabilitySettings>(DEFAULT_AVAILABILITY);
  const [bookedAppointments, setBookedAppointments] = useState<Array<{ appointment_date: string; start_time: string }>>([]);

  // Fetch live availability rules and booked appointments from database
  const refreshAvailability = async () => {
    try {
      const [availRes, aptRes] = await Promise.all([
        fetch('/api/availability'),
        fetch('/api/appointments'),
      ]);

      if (availRes.ok) {
        const availData = await availRes.json();
        if (availData.settings) {
          setAvailabilitySettings(availData.settings);
        }
      }

      if (aptRes.ok) {
        const aptData = await aptRes.json();
        if (aptData.bookedSlots) {
          setBookedAppointments(aptData.bookedSlots);
        }
      }
    } catch (err) {
      console.error('Error fetching live availability:', err);
    }
  };

  useEffect(() => {
    refreshAvailability();
  }, []);

  // Selected date slot calculations
  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const bookedOnSelectedDate = useMemo(() => {
    return bookedAppointments
      .filter((b) => b.appointment_date === selectedDateStr)
      .map((b) => b.start_time);
  }, [bookedAppointments, selectedDateStr]);

  const currentDaySlots = useMemo(() => {
    return getAvailableSlotsForDate(selectedDateStr, availabilitySettings, bookedOnSelectedDate);
  }, [selectedDateStr, availabilitySettings, bookedOnSelectedDate]);

  // Ensure an available slot is selected when date or schedule changes
  useEffect(() => {
    if (currentDaySlots.slots.length > 0) {
      if (!currentDaySlots.slots.includes(selectedSlot)) {
        setSelectedSlot(currentDaySlots.slots[0]);
      }
    } else {
      setSelectedSlot('');
    }
  }, [currentDaySlots, selectedSlot]);

  // Auto-detect client timezone if supported
  useEffect(() => {
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const found = TIMEZONES.find((t) => t.value === userTz);
      if (found) {
        setSelectedTimezone(found.value);
      }
    } catch {
      // Fallback to Los Angeles
    }
  }, []);

  // Calendar dates generation
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const toggleServiceInterested = (name: string) => {
    setServicesInterested((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const nameErr = validateField('clientName', clientName);
    const emailErr = validateField('email', email);
    const phoneErr = validateField('phoneNumber', phoneNumber);

    const newErrors: Record<string, string> = {};
    if (nameErr) newErrors.clientName = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (phoneErr) newErrors.phoneNumber = phoneErr;

    setFormErrors(newErrors);
    setFormTouched({
      clientName: true,
      email: true,
      phoneNumber: true,
    });

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage('Please review the highlighted fields below and provide valid information.');
      const firstKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`b-${firstKey === 'clientName' ? 'name' : firstKey === 'phoneNumber' ? 'phone' : 'email'}`);
      if (el) el.focus();
      return;
    }

    setLoading(true);

    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: clientName,
          firm_name: firmName,
          email,
          phone: `${countryCode} ${phoneNumber}`.trim(),
          service_type: selectedService,
          services_interested: servicesInterested,
          workload,
          message,
          appointment_date: formattedDate,
          start_time: selectedSlot,
          end_time: selectedSlot,
          timezone: selectedTimezone,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to confirm booking.');
      }

      setStep(3); // Success step
    } catch (err: unknown) {
      console.error('Booking failed:', err);
      setErrorMessage((err as Error).message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate .ics calendar invite
  const downloadIcsFile = () => {
    const dateStr = format(selectedDate, 'yyyyMMdd');
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CredTax Solution LLP//Appointment//EN',
      'BEGIN:VEVENT',
      `SUMMARY:CredTax Discovery Session: ${selectedService}`,
      `DESCRIPTION:Initial Consultation with CredTax Solution LLP.\\nService: ${selectedService}\\nClient: ${clientName}\\nFirm: ${firmName || 'N/A'}`,
      `DTSTART:${dateStr}T100000Z`,
      `DTEND:${dateStr}T103000Z`,
      'LOCATION:Online Meeting (Link to follow by email)',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `CredTax-Appointment-${dateStr}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentServiceObj = SERVICES.find((s) => s.title === selectedService) || SERVICES[0];

  return (
    <div className="booking-wrap">
      {/* ========================================================
          STEP 1: SELECT DATE, TIME & SERVICE
          ======================================================== */}
      {step === 1 && (
        <div>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: 'clamp(1.8rem, 1.3rem + 2vw, 3rem)', marginBottom: '8px' }}>
              Schedule your service
            </h1>
            <p className="muted" style={{ fontSize: '1.05rem', margin: 0 }}>
              Check out our availability and book the date and time that works for you
            </p>
          </div>

          <div className="booking-layout">
            {/* Left Area: Date & Time Picker */}
            <div className="booking-card">
              <div className="booking-header-row">
                <h2 style={{ fontSize: '1.3rem', margin: 0 }}>Select a Date and Time</h2>
                <div className="booking-tz-wrap">
                  <label htmlFor="tzSelect" style={{ fontSize: '0.85rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                    Time zone:
                  </label>
                  <select
                    id="tzSelect"
                    className="booking-tz-select"
                    value={selectedTimezone}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sub-grid: Month Calendar & Availability Slots */}
              <div className="booking-calendar-grid">
                {/* 1. Month Calendar */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      aria-label="Previous month"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        fontSize: '1.2rem',
                        color: 'var(--navy-900)',
                      }}
                    >
                      &lsaquo;
                    </button>
                    <span style={{ fontWeight: 650, fontSize: '1.05rem', color: 'var(--navy-900)' }}>
                      {format(currentMonth, 'MMMM yyyy')}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      aria-label="Next month"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        fontSize: '1.2rem',
                        color: 'var(--navy-900)',
                      }}
                    >
                      &rsaquo;
                    </button>
                  </div>

                  {/* Day of Week Headers */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(7, 1fr)',
                      textAlign: 'center',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--muted)',
                      marginBottom: '8px',
                    }}
                  >
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                      <div key={d} style={{ padding: '4px 0' }}>
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(7, 1fr)',
                      gap: '4px',
                      textAlign: 'center',
                    }}
                  >
                    {calendarDays.map((day) => {
                      const dStr = format(day, 'yyyy-MM-dd');
                      const isSelected = isSameDay(day, selectedDate);
                      const isCurrentMonth = isSameMonth(day, currentMonth);
                      const isPast = isBefore(day, today);

                      const bookedSlotsOnDay = bookedAppointments
                        .filter((b) => b.appointment_date === dStr)
                        .map((b) => b.start_time);

                      const daySlotInfo = getAvailableSlotsForDate(
                        dStr,
                        availabilitySettings,
                        bookedSlotsOnDay
                      );

                      const isDisabled = isPast || !daySlotInfo.isDateAvailable;
                      const isBlockedDay = daySlotInfo.status === 'blocked';

                      return (
                        <button
                          key={day.toISOString()}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => setSelectedDate(day)}
                          title={
                            isBlockedDay
                              ? `Unavailable: ${daySlotInfo.reason || 'Blocked'}`
                              : isDisabled
                              ? 'Unavailable'
                              : `${daySlotInfo.slots.length} slots available`
                          }
                          style={{
                            aspectRatio: '1',
                            display: 'grid',
                            placeItems: 'center',
                            borderRadius: '50%',
                            border: 'none',
                            fontSize: '0.92rem',
                            fontWeight: isSelected ? 700 : 500,
                            cursor: isDisabled ? 'not-allowed' : 'pointer',
                            color: isSelected
                              ? '#fff'
                              : isDisabled
                              ? '#D8E2E4'
                              : isCurrentMonth
                              ? 'var(--ink)'
                              : '#BACDD1',
                            background: isSelected
                              ? '#2F616F'
                              : isBlockedDay && !isPast
                              ? '#FEE2E2'
                              : 'transparent',
                            textDecoration: isBlockedDay && !isPast ? 'line-through' : 'none',
                            transition: 'all 0.15s',
                          }}
                        >
                          {format(day, 'd')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Availability Time Slots */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 650, color: 'var(--navy-900)', margin: 0 }}>
                      Availability for {format(selectedDate, 'EEEE, MMMM d')}
                    </h3>
                    {currentDaySlots.reason && (
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8B5CF6', background: '#EDE9FE', padding: '2px 8px', borderRadius: '4px' }}>
                        {currentDaySlots.reason}
                      </span>
                    )}
                  </div>

                  {currentDaySlots.slots.length === 0 ? (
                    <div
                      style={{
                        padding: '32px 16px',
                        background: '#FEF2F2',
                        borderRadius: '8px',
                        border: '1px solid #FECACA',
                        textAlign: 'center',
                      }}
                    >
                      <p style={{ margin: 0, color: '#991B1B', fontWeight: 600, fontSize: '0.92rem' }}>
                        {currentDaySlots.reason || 'No appointment slots available on this date.'}
                      </p>
                      <p style={{ margin: '6px 0 0 0', color: 'var(--muted)', fontSize: '0.82rem' }}>
                        Please select another open date on the calendar.
                      </p>
                    </div>
                  ) : (
                    <div className="booking-slots-grid">
                      {currentDaySlots.slots.map((slot) => {
                        const isSlotActive = slot === selectedSlot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            style={{
                              padding: '10px 14px',
                              borderRadius: '99px',
                              border: `1.5px solid ${isSlotActive ? '#2F616F' : 'var(--line)'}`,
                              background: isSlotActive ? '#2F616F' : '#fff',
                              color: isSlotActive ? '#fff' : 'var(--navy-900)',
                              fontSize: '0.88rem',
                              fontWeight: isSlotActive ? 700 : 600,
                              cursor: 'pointer',
                              textAlign: 'center',
                              transition: 'all 0.15s',
                            }}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Area: Service Details Card */}
            <div className="booking-summary-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--navy-900)' }}>
                Service Details
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="serviceSelect" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '6px' }}>
                  Select Consultation Type:
                </label>
                <select
                  id="serviceSelect"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1.5px solid #B8CACC',
                    fontSize: '0.98rem',
                    fontWeight: 600,
                    color: 'var(--navy-900)',
                    background: '#fff',
                  }}
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Collapsible Details */}
              <div style={{ marginBottom: '24px' }}>
                <button
                  type="button"
                  onClick={() => setShowServiceDetails(!showServiceDetails)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--accent)',
                    fontSize: '0.88rem',
                    fontWeight: 650,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>{showServiceDetails ? 'Hide details' : 'More details'}</span>
                  <span>{showServiceDetails ? '▴' : '▾'}</span>
                </button>
                {showServiceDetails && (
                  <p style={{ marginTop: '8px', fontSize: '0.92rem', color: 'var(--muted)', lineHeight: '1.5' }}>
                    {currentServiceObj.description}
                  </p>
                )}
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--line)',
                  paddingTop: '18px',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                  <span className="muted">Duration:</span>
                  <span style={{ fontWeight: 600 }}>30 minutes</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                  <span className="muted">Pricing:</span>
                  <span style={{ fontWeight: 700, color: 'var(--navy-900)' }}>Free (Introductory)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span className="muted">Selected Slot:</span>
                  <span style={{ fontWeight: 650, color: selectedSlot ? 'var(--navy-900)' : 'var(--muted)' }}>
                    {selectedSlot ? `${format(selectedDate, 'EEE, MMM d')} at ${selectedSlot}` : 'None chosen yet'}
                  </span>
                </div>
              </div>

              {step1Error && (
                <div
                  role="alert"
                  style={{
                    padding: '10px 14px',
                    background: '#FDF2F2',
                    border: '1px solid #F8B4B4',
                    borderRadius: '6px',
                    color: '#9B1C1C',
                    marginBottom: '16px',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{step1Error}</span>
                </div>
              )}

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleProceedToStep2}
                style={{
                  width: '100%',
                  borderRadius: '99px',
                  background: '#183941',
                  color: '#fff',
                  fontSize: '1rem',
                  padding: '12px',
                }}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 2: BOOKING FORM (CLIENT DETAILS)
          ======================================================== */}
      {step === 2 && (
        <div>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: 'clamp(1.8rem, 1.3rem + 2vw, 3rem)', marginBottom: '8px' }}>
              Booking Form
            </h1>
            <p className="muted" style={{ fontSize: '1.05rem', margin: 0 }}>
              Provide your contact information to reserve your discovery consultation
            </p>
          </div>

          {/* Top Appointment Recap Banner */}
          <div className="booking-recap-bar">
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted)', display: 'block' }}>Selected Consultation:</span>
              <strong style={{ color: 'var(--navy-900)', fontSize: '0.95rem' }}>{selectedService}</strong>
              <span style={{ color: 'var(--muted)', fontSize: '0.9rem', marginInline: '8px' }}>•</span>
              <span style={{ color: 'var(--navy-900)', fontSize: '0.9rem', fontWeight: 600 }}>
                {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedSlot}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                fontWeight: 650,
                fontSize: '0.88rem',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '4px 0',
              }}
            >
              Change slot
            </button>
          </div>

          <div className="booking-layout">
            {/* Left: Client Form */}
            <div className="booking-card">
              <h2 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>Client Details</h2>

              {errorMessage && (
                <div
                  role="alert"
                  aria-live="assertive"
                  style={{
                    padding: '12px 16px',
                    background: '#FEF2F2',
                    border: '1px solid #FCA5A5',
                    borderRadius: '6px',
                    color: '#991B1B',
                    marginBottom: '20px',
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <AlertCircle size={18} style={{ color: '#DC2626', flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleBookNow} noValidate>
                <div className="booking-form-row">
                  <div className="field">
                    <label htmlFor="b-name">
                      Full name <span className="req">*</span>
                    </label>
                    <input
                      id="b-name"
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => handleFieldChange('clientName', e.target.value)}
                      onBlur={(e) => handleFieldBlur('clientName', e.target.value)}
                      placeholder="e.g. John Miller"
                      aria-invalid={!!formErrors.clientName && formTouched.clientName}
                      style={{
                        border: formErrors.clientName && formTouched.clientName ? '1.5px solid #DC2626' : undefined,
                        background: formErrors.clientName && formTouched.clientName ? '#FFF5F5' : undefined,
                      }}
                    />
                    {formErrors.clientName && formTouched.clientName && (
                      <p style={{ color: '#DC2626', fontSize: '0.82rem', margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <AlertCircle size={13} style={{ flexShrink: 0 }} />
                        <span>{formErrors.clientName}</span>
                      </p>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="b-firm">Firm name</label>
                    <input
                      id="b-firm"
                      type="text"
                      value={firmName}
                      onChange={(e) => setFirmName(e.target.value)}
                      placeholder="e.g. Miller &amp; Associates CPAs"
                    />
                  </div>
                </div>

                <div className="booking-form-row">
                  <div className="field">
                    <label htmlFor="b-email">
                      Email <span className="req">*</span>
                    </label>
                    <input
                      id="b-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      onBlur={(e) => handleFieldBlur('email', e.target.value)}
                      placeholder="name@firmcpa.com"
                      aria-invalid={!!formErrors.email && formTouched.email}
                      style={{
                        border: formErrors.email && formTouched.email ? '1.5px solid #DC2626' : undefined,
                        background: formErrors.email && formTouched.email ? '#FFF5F5' : undefined,
                      }}
                    />
                    {formErrors.email && formTouched.email && (
                      <p style={{ color: '#DC2626', fontSize: '0.82rem', margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <AlertCircle size={13} style={{ flexShrink: 0 }} />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="b-phone">Phone</label>
                    <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                      <select
                        aria-label="Country code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        style={{
                          width: '96px',
                          flexShrink: 0,
                          padding: '0.75em 0.4em',
                          border: '1.5px solid #B8CACC',
                          borderRadius: '4px',
                          background: '#fff',
                          fontSize: '0.9rem',
                        }}
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.country} ({c.code})
                          </option>
                        ))}
                      </select>
                      <input
                        id="b-phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                        onBlur={(e) => handleFieldBlur('phoneNumber', e.target.value)}
                        placeholder="555-0199"
                        style={{
                          flex: 1,
                          minWidth: 0,
                          width: '100%',
                          border: formErrors.phoneNumber && formTouched.phoneNumber ? '1.5px solid #DC2626' : undefined,
                          background: formErrors.phoneNumber && formTouched.phoneNumber ? '#FFF5F5' : undefined,
                        }}
                        aria-invalid={!!formErrors.phoneNumber && formTouched.phoneNumber}
                      />
                    </div>
                    {formErrors.phoneNumber && formTouched.phoneNumber && (
                      <p style={{ color: '#DC2626', fontSize: '0.82rem', margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <AlertCircle size={13} style={{ flexShrink: 0 }} />
                        <span>{formErrors.phoneNumber}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Services Interested In (Checkboxes) */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontWeight: 650, fontSize: '0.93rem', color: 'var(--navy-900)', marginBottom: '12px' }}>
                    Services Interested In
                  </label>
                  <div className="booking-services-grid">
                    {[
                      'US Tax Preparation',
                      'Tax Review & QC',
                      'Bookkeeping',
                      'Virtual Assistance',
                      'CredTax Pod',
                      'Succession Partnership',
                    ].map((svc) => (
                      <label
                        key={svc}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={servicesInterested.includes(svc)}
                          onChange={() => toggleServiceInterested(svc)}
                          style={{ width: '18px', height: '18px', accentColor: 'var(--navy-900)' }}
                        />
                        <span>{svc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Approximate Workload */}
                <div className="field" style={{ marginBottom: '24px' }}>
                  <label htmlFor="b-workload">Approximate Workload</label>
                  <select
                    id="b-workload"
                    value={workload}
                    onChange={(e) => setWorkload(e.target.value)}
                  >
                    <option value="< 20 returns / mo">&lt; 20 returns / month</option>
                    <option value="20-50 returns / mo">20-50 returns / month</option>
                    <option value="50-100+ returns / mo">50-100+ returns / month</option>
                    <option value="Recurring Monthly Bookkeeping">Recurring Monthly Bookkeeping</option>
                    <option value="Cleanup Project">One-time Cleanup Project</option>
                    <option value="Custom Scope">Custom Scope / Unsure yet</option>
                  </select>
                </div>

                {/* Add your message */}
                <div className="field" style={{ marginBottom: '28px' }}>
                  <label htmlFor="b-msg">Add your message</label>
                  <textarea
                    id="b-msg"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us any specific software you use or questions you have..."
                  />
                </div>

                <div className="booking-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setStep(1)}
                  >
                    &larr; Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{
                      flex: 1,
                      background: '#183941',
                      borderRadius: '99px',
                      color: '#fff',
                    }}
                  >
                    {loading ? 'Confirming...' : 'Book Now'}
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Booking Summary Sidebar */}
            <div className="booking-summary-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--navy-900)' }}>
                Booking Details
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--navy-900)' }}>
                  {selectedService}
                </strong>
                <span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.95rem', marginTop: '4px' }}>
                  {format(selectedDate, 'MMMM d, yyyy')} at {selectedSlot} ({selectedTimezone.split('/')[1] || 'UTC'})
                </span>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--line)',
                  paddingTop: '16px',
                  marginBottom: '16px',
                }}
              >
                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '4px' }}>
                  Payment Details
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-900)' }}>Free</span>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: '1.5', marginBottom: '24px' }}>
                By completing your booking, you agree to receive related meeting notifications and updates.
              </p>

              <button
                type="button"
                className="btn btn-primary"
                disabled={loading || !clientName || !email}
                onClick={handleBookNow}
                style={{
                  width: '100%',
                  borderRadius: '99px',
                  background: '#183941',
                  color: '#fff',
                  fontSize: '1rem',
                  padding: '12px',
                }}
              >
                {loading ? 'Confirming...' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 3: CONFIRMATION / SUCCESS SCREEN
          ======================================================== */}
      {step === 3 && (
        <div className="booking-success-card">
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(47, 97, 111, 0.15)',
              color: 'var(--accent)',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 20px',
              fontSize: '2rem',
            }}
          >
            ✓
          </div>

          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 1.4rem + 1.5vw, 2.3rem)', color: 'var(--navy-900)', marginBottom: '12px' }}>
            Your Session Is Scheduled!
          </h2>
          <p className="muted" style={{ fontSize: '1.05rem', marginBottom: '28px' }}>
            We have reserved your appointment and sent confirmation details to <strong>{email}</strong>.
          </p>

          <div
            style={{
              background: 'var(--mist)',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'left',
              marginBottom: '32px',
            }}
          >
            <div className="booking-success-detail-row">
              <span className="muted" style={{ minWidth: '110px' }}>Service:</span>
              <strong>{selectedService}</strong>
            </div>
            <div className="booking-success-detail-row">
              <span className="muted" style={{ minWidth: '110px' }}>Date &amp; Time:</span>
              <strong>{format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedSlot}</strong>
            </div>
            <div className="booking-success-detail-row">
              <span className="muted" style={{ minWidth: '110px' }}>Timezone:</span>
              <span>{selectedTimezone}</span>
            </div>
            <div className="booking-success-detail-row">
              <span className="muted" style={{ minWidth: '110px' }}>Attendee:</span>
              <span>{clientName} {firmName ? `(${firmName})` : ''}</span>
            </div>
          </div>

          <div className="booking-actions" style={{ justifyContent: 'center', marginTop: '24px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={downloadIcsFile}
            >
              📅 Download Calendar Invite (.ics)
            </button>
            <Link className="btn btn-primary" href="/">
              Return to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
