'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
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
  parseISO,
} from 'date-fns';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Settings,
  AlertCircle,
  Sliders,
  CalendarX2,
  CalendarCheck,
  UserCheck,
  Save,
  ArrowRight,
} from 'lucide-react';
import {
  AvailabilitySettings,
  DateOverride,
  DEFAULT_AVAILABILITY,
  DEFAULT_SLOTS,
  normalizeTimeString,
} from '@/lib/availability';

interface AppointmentRecord {
  id: string;
  client_name: string;
  firm_name: string | null;
  email: string;
  service_type: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
}

export default function AdminAvailabilityPage() {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const [settings, setSettings] = useState<AvailabilitySettings>(DEFAULT_AVAILABILITY);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState('');
  const [errorToast, setErrorToast] = useState('');

  // Modals state
  const [showGlobalSettingsModal, setShowGlobalSettingsModal] = useState(false);
  const [showBulkRangeModal, setShowBulkRangeModal] = useState(false);

  // Bulk range form
  const [rangeFrom, setRangeFrom] = useState('');
  const [rangeTo, setRangeTo] = useState('');
  const [rangeReason, setRangeReason] = useState('Holiday / Office Closed');

  // Custom slot input for selected day
  const [newSlotInput, setNewSlotInput] = useState('');

  // Load availability settings and appointments on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      // 1. Fetch settings from site_settings
      const { data: settingRow } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'appointment_availability')
        .maybeSingle();

      if (settingRow?.value) {
        setSettings({
          ...DEFAULT_AVAILABILITY,
          ...settingRow.value,
          date_overrides: settingRow.value.date_overrides || {},
        });
      }

      // 2. Fetch all active appointments to show bookings on calendar
      const { data: apts } = await supabase
        .from('appointments')
        .select('id, client_name, firm_name, email, service_type, appointment_date, start_time, end_time, status')
        .neq('status', 'cancelled');

      setAppointments(apts || []);
    } catch (err) {
      console.error('Failed to load availability data:', err);
      setErrorToast('Failed to load availability data. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string, isError = false) => {
    if (isError) {
      setErrorToast(msg);
      setTimeout(() => setErrorToast(''), 4000);
    } else {
      setSuccessToast(msg);
      setTimeout(() => setSuccessToast(''), 3000);
    }
  };

  const saveSettingsToSupabase = async (updatedSettings: AvailabilitySettings) => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('site_settings').upsert({
        key: 'appointment_availability',
        value: updatedSettings,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      setSettings(updatedSettings);
      showToast('Availability settings updated successfully!');
    } catch (err: unknown) {
      console.error('Error saving availability settings:', err);
      showToast((err as Error).message || 'Failed to save settings.', true);
    } finally {
      setSaving(false);
    }
  };

  // Date formatted strings
  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const selectedDateOverride = settings.date_overrides?.[selectedDateStr];

  // Calendar math
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToToday = () => {
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  // Get appointments for a date
  const getBookingsForDate = (dateStr: string) => {
    return appointments.filter((a) => a.appointment_date === dateStr);
  };

  // Determine day status for rendering badge
  const getDayStatus = (day: Date) => {
    const dStr = format(day, 'yyyy-MM-dd');
    const dayOfWeek = day.getDay();
    const override = settings.date_overrides?.[dStr];
    const bookings = getBookingsForDate(dStr);

    if (override?.status === 'blocked') {
      return {
        type: 'blocked',
        label: override.reason || 'Blocked',
        badgeColor: '#EF4444',
        badgeBg: '#FEE2E2',
        bookingsCount: bookings.length,
      };
    }

    if (override?.status === 'custom') {
      return {
        type: 'custom',
        label: `${override.available_slots?.length || 0} Custom Slots`,
        badgeColor: '#8B5CF6',
        badgeBg: '#EDE9FE',
        bookingsCount: bookings.length,
      };
    }

    const isWorking = (settings.working_days || [1, 2, 3, 4, 5]).includes(dayOfWeek);
    if (!isWorking && override?.status !== 'available') {
      return {
        type: 'off',
        label: 'Non-working',
        badgeColor: '#9CA3AF',
        badgeBg: '#F3F4F6',
        bookingsCount: bookings.length,
      };
    }

    // Default working day with possible blocked slots
    const totalSlots = settings.default_slots?.length || DEFAULT_SLOTS.length;
    const blockedCount = override?.blocked_slots?.length || 0;
    const openCount = Math.max(0, totalSlots - blockedCount - bookings.length);

    return {
      type: 'available',
      label: `${openCount} Open`,
      badgeColor: '#0D9488',
      badgeBg: '#CCFBF1',
      bookingsCount: bookings.length,
    };
  };

  // Selected Date Slot Management Helpers
  const selectedDateBookings = getBookingsForDate(selectedDateStr);
  const selectedDateBookedSlots = selectedDateBookings.map((b) => normalizeTimeString(b.start_time));

  // Determine which slots are displayed for the selected date
  const getDisplaySlotsForSelectedDate = (): Array<{
    slot: string;
    isBlocked: boolean;
    isBooked: boolean;
    bookedBy?: string;
  }> => {
    let rawSlots: string[] = [];

    if (selectedDateOverride?.status === 'custom') {
      rawSlots = selectedDateOverride.available_slots || [];
    } else {
      rawSlots = settings.default_slots || DEFAULT_SLOTS;
    }

    return rawSlots.map((slot) => {
      const norm = normalizeTimeString(slot);
      const isBooked = selectedDateBookedSlots.includes(norm);
      const bookingInfo = selectedDateBookings.find((b) => normalizeTimeString(b.start_time) === norm);

      let isBlocked = false;
      if (selectedDateOverride?.status === 'blocked') {
        isBlocked = true;
      } else if (selectedDateOverride?.blocked_slots) {
        const normBlocked = selectedDateOverride.blocked_slots.map(normalizeTimeString);
        isBlocked = normBlocked.includes(norm);
      }

      return {
        slot,
        isBlocked,
        isBooked,
        bookedBy: bookingInfo ? `${bookingInfo.client_name} (${bookingInfo.firm_name || 'Client'})` : undefined,
      };
    });
  };

  // Update selected date status (available, blocked, custom)
  const setDateStatus = (status: 'available' | 'blocked' | 'custom', reason = '') => {
    const updatedOverrides = { ...settings.date_overrides };

    if (status === 'available') {
      // Revert to default working hours (clear override or keep empty blocked slots)
      delete updatedOverrides[selectedDateStr];
    } else if (status === 'blocked') {
      updatedOverrides[selectedDateStr] = {
        status: 'blocked',
        reason: reason || 'Office Closed / Holiday',
        blocked_slots: [],
      };
    } else if (status === 'custom') {
      updatedOverrides[selectedDateStr] = {
        status: 'custom',
        reason,
        available_slots: [...(settings.default_slots || DEFAULT_SLOTS)],
      };
    }

    const updated = {
      ...settings,
      date_overrides: updatedOverrides,
    };
    saveSettingsToSupabase(updated);
  };

  // Toggle individual slot blocked state for the selected date
  const toggleSlotBlocked = (slot: string) => {
    const updatedOverrides = { ...settings.date_overrides };
    const current = updatedOverrides[selectedDateStr] || {
      status: 'available',
      blocked_slots: [],
    };

    const norm = normalizeTimeString(slot);
    let currentBlocked = (current.blocked_slots || []).map(normalizeTimeString);

    if (currentBlocked.includes(norm)) {
      // Unblock it
      currentBlocked = currentBlocked.filter((s) => s !== norm);
    } else {
      // Block it
      currentBlocked.push(norm);
    }

    updatedOverrides[selectedDateStr] = {
      ...current,
      status: 'available',
      blocked_slots: currentBlocked,
    };

    const updated = {
      ...settings,
      date_overrides: updatedOverrides,
    };
    saveSettingsToSupabase(updated);
  };

  // Block All slots on selected date
  const blockAllSlotsOnDate = () => {
    setDateStatus('blocked', 'All slots blocked by administrator');
  };

  // Enable All slots on selected date
  const enableAllSlotsOnDate = () => {
    const updatedOverrides = { ...settings.date_overrides };
    delete updatedOverrides[selectedDateStr];
    saveSettingsToSupabase({
      ...settings,
      date_overrides: updatedOverrides,
    });
  };

  // Add custom slot to selected date
  const handleAddSlotToDate = () => {
    if (!newSlotInput.trim()) return;
    const slotToAdd = newSlotInput.trim();

    const updatedOverrides = { ...settings.date_overrides };
    const current = updatedOverrides[selectedDateStr];

    if (current?.status === 'custom') {
      const existing = current.available_slots || [];
      if (!existing.includes(slotToAdd)) {
        updatedOverrides[selectedDateStr] = {
          ...current,
          available_slots: [...existing, slotToAdd],
        };
      }
    } else {
      // Switch to custom with standard slots + new slot
      const base = settings.default_slots || DEFAULT_SLOTS;
      const combined = Array.from(new Set([...base, slotToAdd]));
      updatedOverrides[selectedDateStr] = {
        status: 'custom',
        available_slots: combined,
      };
    }

    setNewSlotInput('');
    saveSettingsToSupabase({
      ...settings,
      date_overrides: updatedOverrides,
    });
  };

  // Bulk block date range
  const handleApplyBulkRange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rangeFrom || !rangeTo) {
      showToast('Please select both start and end dates.', true);
      return;
    }

    const start = parseISO(rangeFrom);
    const end = parseISO(rangeTo);

    if (isBefore(end, start)) {
      showToast('End date must be after start date.', true);
      return;
    }

    const days = eachDayOfInterval({ start, end });
    const updatedOverrides = { ...settings.date_overrides };

    days.forEach((day) => {
      const dStr = format(day, 'yyyy-MM-dd');
      updatedOverrides[dStr] = {
        status: 'blocked',
        reason: rangeReason || 'Office Closed',
        blocked_slots: [],
      };
    });

    saveSettingsToSupabase({
      ...settings,
      date_overrides: updatedOverrides,
    });

    setShowBulkRangeModal(false);
    showToast(`Successfully blocked ${days.length} days from ${rangeFrom} to ${rangeTo}.`);
  };

  return (
    <div style={{ maxWidth: '1440px', marginInline: 'auto' }}>
      {/* Top Banner / Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Link href="/admin/appointments" style={{ fontSize: '0.88rem', color: 'var(--muted)', textDecoration: 'none' }}>
              &larr; Back to Appointments List
            </Link>
          </div>
          <h1 style={{ fontSize: '1.9rem', color: 'var(--navy-900)', margin: '0 0 6px 0' }}>
            Appointment Availability Calendar
          </h1>
          <p className="muted" style={{ margin: 0, fontSize: '0.98rem' }}>
            Manage available booking dates, working hours, blocked holidays, and time slots in real time.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowBulkRangeModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', padding: '9px 16px' }}
          >
            <CalendarX2 size={16} />
            <span>Block Date Range</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowGlobalSettingsModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', padding: '9px 16px' }}
          >
            <Settings size={16} />
            <span>Working Days &amp; Hours</span>
          </button>
        </div>
      </div>

      {/* Notifications / Toast */}
      {successToast && (
        <div
          style={{
            padding: '12px 18px',
            background: '#ECFDF5',
            border: '1.5px solid #10B981',
            borderRadius: '6px',
            color: '#065F46',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 500,
          }}
        >
          <CheckCircle2 size={18} style={{ color: '#10B981' }} />
          <span>{successToast}</span>
        </div>
      )}

      {errorToast && (
        <div
          style={{
            padding: '12px 18px',
            background: '#FEF2F2',
            border: '1.5px solid #EF4444',
            borderRadius: '6px',
            color: '#991B1B',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 500,
          }}
        >
          <AlertCircle size={18} style={{ color: '#EF4444' }} />
          <span>{errorToast}</span>
        </div>
      )}

      {/* Overview Stat Ribbon */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          marginBottom: '28px',
        }}
      >
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '16px 20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Weekly Working Days
          </span>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy-900)', marginTop: '4px' }}>
            {(settings.working_days || []).length === 5 ? 'Monday – Friday' : `${(settings.working_days || []).length} Days / Week`}
          </div>
          <span style={{ fontSize: '0.85rem', color: '#0D9488', fontWeight: 600 }}>Active in Public Engine</span>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '16px 20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Daily Slot Schedule
          </span>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy-900)', marginTop: '4px' }}>
            {settings.default_slots?.length || DEFAULT_SLOTS.length} Slots / Day
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
            {settings.default_slots?.[0] || '10:00 am'} &ndash; {settings.default_slots?.[settings.default_slots.length - 1] || '5:00 pm'}
          </span>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '16px 20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Calendar Overrides
          </span>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy-900)', marginTop: '4px' }}>
            {Object.keys(settings.date_overrides || {}).length} Custom Dates
          </div>
          <span style={{ fontSize: '0.85rem', color: '#6366F1', fontWeight: 600 }}>Holidays &amp; Custom Slots</span>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '16px 20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Confirmed Client Bookings
          </span>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#D97706', marginTop: '4px' }}>
            {appointments.length} Total Active
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Automatically reserved</span>
        </div>
      </div>

      {/* Main 2-Column Section: Calendar (Left) + Selected Day Slot Manager (Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '24px',
          alignItems: 'start',
        }}
        className="availability-split"
      >
        {/* ========================================================
            LEFT COLUMN: INTERACTIVE MONTHLY BOOKING CALENDAR
            ======================================================== */}
        <div
          style={{
            background: '#fff',
            border: '1px solid var(--line)',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 4px 20px -8px rgba(47, 97, 111, 0.08)',
          }}
        >
          {/* Calendar Header Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--line)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0 }}>
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={goToToday}
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 650,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: '1px solid var(--line)',
                  background: '#fff',
                  cursor: 'pointer',
                  color: 'var(--navy-900)',
                }}
              >
                Today
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={prevMonth}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '34px',
                  height: '34px',
                  borderRadius: '6px',
                  border: '1px solid var(--line)',
                  background: '#fff',
                  cursor: 'pointer',
                }}
                aria-label="Previous month"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '34px',
                  height: '34px',
                  borderRadius: '6px',
                  border: '1px solid var(--line)',
                  background: '#fff',
                  cursor: 'pointer',
                }}
                aria-label="Next month"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Legend */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '16px',
              fontSize: '0.82rem',
              color: 'var(--muted)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0D9488' }} />
              <span>Available</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
              <span>Blocked / Off</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8B5CF6' }} />
              <span>Custom Hours</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
              <span>Has Bookings</span>
            </div>
          </div>

          {/* Weekday Labels */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '6px',
              textAlign: 'center',
              fontWeight: 650,
              fontSize: '0.82rem',
              color: 'var(--muted)',
              marginBottom: '8px',
            }}
          >
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          {/* Calendar Days Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '6px',
            }}
          >
            {calendarDays.map((day) => {
              const dStr = format(day, 'yyyy-MM-dd');
              const isSelected = isSameDay(day, selectedDate);
              const isCurrent = isSameMonth(day, currentMonth);
              const isPast = isBefore(day, today);
              const dayStatus = getDayStatus(day);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => setSelectedDate(day)}
                  style={{
                    minHeight: '82px',
                    padding: '8px 6px',
                    borderRadius: '8px',
                    border: isSelected ? '2px solid var(--navy-900)' : '1px solid var(--line)',
                    background: isSelected
                      ? '#F0FDF4'
                      : isCurrent
                      ? '#fff'
                      : '#FAFCFC',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isSelected ? '0 0 0 1px var(--navy-900)' : 'none',
                    opacity: isCurrent ? 1 : 0.45,
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontWeight: isSelected ? 800 : 600,
                        fontSize: '0.95rem',
                        color: isSelected ? 'var(--navy-900)' : isPast ? '#9CA3AF' : 'var(--ink)',
                      }}
                    >
                      {format(day, 'd')}
                    </span>
                    {dayStatus.bookingsCount > 0 && (
                      <span
                        title={`${dayStatus.bookingsCount} booking(s)`}
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          background: '#FEF3C7',
                          color: '#B45309',
                          padding: '2px 5px',
                          borderRadius: '4px',
                        }}
                      >
                        {dayStatus.bookingsCount} booked
                      </span>
                    )}
                  </div>

                  {/* Status chip inside cell */}
                  <div style={{ marginTop: '4px' }}>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.72rem',
                        fontWeight: 650,
                        padding: '3px 5px',
                        borderRadius: '4px',
                        background: dayStatus.badgeBg,
                        color: dayStatus.badgeColor,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {dayStatus.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: SELECTED DATE INSPECTOR & SLOT MANAGER
            ======================================================== */}
        <div
          style={{
            background: '#fff',
            border: '1px solid var(--line)',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 4px 20px -8px rgba(47, 97, 111, 0.08)',
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '16px', marginBottom: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Day Inspector &amp; Slot Controls
            </span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--navy-900)', margin: '4px 0 0 0' }}>
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h2>
          </div>

          {/* 1. Date Status Switcher */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 650, color: 'var(--navy-900)', marginBottom: '8px' }}>
              Day Availability Mode:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setDateStatus('available')}
                style={{
                  padding: '10px 8px',
                  borderRadius: '6px',
                  border: `1.5px solid ${!selectedDateOverride || selectedDateOverride.status === 'available' ? '#0D9488' : 'var(--line)'}`,
                  background: !selectedDateOverride || selectedDateOverride.status === 'available' ? '#CCFBF1' : '#fff',
                  color: !selectedDateOverride || selectedDateOverride.status === 'available' ? '#0F766E' : 'var(--navy-900)',
                  fontWeight: 650,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                🟢 Standard
              </button>

              <button
                type="button"
                onClick={() => setDateStatus('blocked', 'Holiday / Office Closed')}
                style={{
                  padding: '10px 8px',
                  borderRadius: '6px',
                  border: `1.5px solid ${selectedDateOverride?.status === 'blocked' ? '#EF4444' : 'var(--line)'}`,
                  background: selectedDateOverride?.status === 'blocked' ? '#FEE2E2' : '#fff',
                  color: selectedDateOverride?.status === 'blocked' ? '#B91C1C' : 'var(--navy-900)',
                  fontWeight: 650,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                🔴 Block Day
              </button>

              <button
                type="button"
                onClick={() => setDateStatus('custom')}
                style={{
                  padding: '10px 8px',
                  borderRadius: '6px',
                  border: `1.5px solid ${selectedDateOverride?.status === 'custom' ? '#8B5CF6' : 'var(--line)'}`,
                  background: selectedDateOverride?.status === 'custom' ? '#EDE9FE' : '#fff',
                  color: selectedDateOverride?.status === 'custom' ? '#6D28D9' : 'var(--navy-900)',
                  fontWeight: 650,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                🟣 Custom Hours
              </button>
            </div>
          </div>

          {/* Reason Input if Blocked or Custom */}
          {selectedDateOverride && selectedDateOverride.status === 'blocked' && (
            <div style={{ marginBottom: '22px', padding: '14px', background: '#FEF2F2', borderRadius: '6px', border: '1px solid #FECACA' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 650, color: '#991B1B', marginBottom: '6px' }}>
                Block Reason / Public Label:
              </label>
              <input
                type="text"
                value={selectedDateOverride.reason || ''}
                onChange={(e) => {
                  const updatedOverrides = { ...settings.date_overrides };
                  updatedOverrides[selectedDateStr] = {
                    ...selectedDateOverride,
                    reason: e.target.value,
                  };
                  setSettings({ ...settings, date_overrides: updatedOverrides });
                }}
                onBlur={() => saveSettingsToSupabase(settings)}
                placeholder="e.g. Labor Day, Firm Training, Annual Leave"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #FCA5A5',
                  fontSize: '0.9rem',
                }}
              />
              <p style={{ margin: '6px 0 0', fontSize: '0.78rem', color: '#991B1B' }}>
                This date will be disabled and unselectable on the public appointment booking calendar.
              </p>
            </div>
          )}

          {/* 2. Slot Matrix & Toggles */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0 }}>
                Time Slots for this Date
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={enableAllSlotsOnDate}
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#0D9488',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Enable All
                </button>
                <button
                  type="button"
                  onClick={blockAllSlotsOnDate}
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#EF4444',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Block All
                </button>
              </div>
            </div>

            <p className="muted" style={{ fontSize: '0.85rem', margin: '0 0 12px 0' }}>
              Click any time slot below to toggle it between Open and Blocked.
            </p>

            {/* Slots Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                gap: '8px',
                maxHeight: '300px',
                overflowY: 'auto',
                paddingRight: '4px',
              }}
            >
              {getDisplaySlotsForSelectedDate().map(({ slot, isBlocked, isBooked, bookedBy }) => {
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isBooked}
                    onClick={() => toggleSlotBlocked(slot)}
                    title={isBooked ? `Booked by ${bookedBy}` : isBlocked ? 'Click to unblock slot' : 'Click to block slot'}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 650,
                      cursor: isBooked ? 'not-allowed' : 'pointer',
                      textAlign: 'center',
                      border: isBooked
                        ? '1.5px solid #F59E0B'
                        : isBlocked
                        ? '1.5px solid #FECACA'
                        : '1.5px solid #A7F3D0',
                      background: isBooked
                        ? '#FEF3C7'
                        : isBlocked
                        ? '#FEF2F2'
                        : '#ECFDF5',
                      color: isBooked
                        ? '#92400E'
                        : isBlocked
                        ? '#991B1B'
                        : '#065F46',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px',
                      textDecoration: isBlocked ? 'line-through' : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span>{slot}</span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                      {isBooked ? '🔒 Booked' : isBlocked ? '✕ Blocked' : '✓ Open'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Add Custom Slot */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <input
              type="text"
              value={newSlotInput}
              onChange={(e) => setNewSlotInput(e.target.value)}
              placeholder="Add slot (e.g. 9:00 am, 5:30 pm)"
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--line)',
                fontSize: '0.88rem',
              }}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddSlotToDate}
              style={{ padding: '8px 14px', fontSize: '0.88rem' }}
            >
              Add Slot
            </button>
          </div>

          {/* 4. Booked Appointments List for Selected Date */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '10px' }}>
              Client Bookings on this Day ({selectedDateBookings.length})
            </h3>
            {selectedDateBookings.length === 0 ? (
              <p className="muted" style={{ fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>
                No client bookings on this date yet.
              </p>
            ) : (
              <div style={{ display: 'grid', gap: '8px' }}>
                {selectedDateBookings.map((apt) => (
                  <div
                    key={apt.id}
                    style={{
                      padding: '12px 14px',
                      background: '#FFFBEB',
                      border: '1px solid #FCD34D',
                      borderRadius: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#92400E' }}>
                        {apt.start_time} &ndash; {apt.client_name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '2px' }}>
                        {apt.firm_name || 'Individual'} &bull; {apt.service_type}
                      </div>
                    </div>
                    <Link
                      href={`/admin/appointments`}
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--navy-900)',
                        textDecoration: 'underline',
                      }}
                    >
                      View &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          MODAL 1: GLOBAL WORKING DAYS & MASTER SLOTS CONFIGURATION
          ======================================================== */}
      {showGlobalSettingsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(24, 57, 65, 0.6)',
            zIndex: 60,
            display: 'grid',
            placeItems: 'center',
            padding: '20px',
          }}
          onClick={() => setShowGlobalSettingsModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              maxWidth: '620px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0 }}>
                Weekly Schedule &amp; Master Slots
              </h3>
              <button
                type="button"
                onClick={() => setShowGlobalSettingsModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
              >
                ✕
              </button>
            </div>

            {/* Working days checkboxes */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 650, fontSize: '0.92rem', marginBottom: '8px' }}>
                Default Working Days (Open for Bookings):
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { day: 0, label: 'Sun' },
                  { day: 1, label: 'Mon' },
                  { day: 2, label: 'Tue' },
                  { day: 3, label: 'Wed' },
                  { day: 4, label: 'Thu' },
                  { day: 5, label: 'Fri' },
                  { day: 6, label: 'Sat' },
                ].map(({ day, label }) => {
                  const isChecked = (settings.working_days || []).includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        const current = settings.working_days || [];
                        const updatedDays = isChecked
                          ? current.filter((d) => d !== day)
                          : [...current, day].sort();
                        setSettings({ ...settings, working_days: updatedDays });
                      }}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '6px',
                        border: `1.5px solid ${isChecked ? 'var(--navy-900)' : 'var(--line)'}`,
                        background: isChecked ? 'var(--navy-900)' : '#fff',
                        color: isChecked ? '#fff' : 'var(--ink)',
                        fontWeight: 650,
                        cursor: 'pointer',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Default Daily Slot List */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 650, fontSize: '0.92rem', marginBottom: '8px' }}>
                Default Daily Time Slots ({settings.default_slots?.length || 0}):
              </label>
              <p className="muted" style={{ fontSize: '0.85rem', margin: '0 0 10px 0' }}>
                These slots automatically apply to all regular working days unless overridden on specific dates.
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  maxHeight: '180px',
                  overflowY: 'auto',
                  padding: '10px',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  background: '#FAFCFC',
                }}
              >
                {(settings.default_slots || DEFAULT_SLOTS).map((slot) => (
                  <span
                    key={slot}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      background: '#fff',
                      border: '1px solid var(--line)',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    <span>{slot}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (settings.default_slots || DEFAULT_SLOTS).filter((s) => s !== slot);
                        setSettings({ ...settings, default_slots: updated });
                      }}
                      style={{ border: 'none', background: 'none', color: '#EF4444', cursor: 'pointer', padding: 0 }}
                      title="Remove this default slot"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Advance Booking Limit */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Minimum Notice Required (Hours):
                </label>
                <input
                  type="number"
                  min="0"
                  max="48"
                  value={settings.notice_hours_required || 1}
                  onChange={(e) => setSettings({ ...settings, notice_hours_required: parseInt(e.target.value, 10) || 0 })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--line)', borderRadius: '4px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Max Advance Window (Days):
                </label>
                <input
                  type="number"
                  min="7"
                  max="365"
                  value={settings.max_advance_days || 60}
                  onChange={(e) => setSettings({ ...settings, max_advance_days: parseInt(e.target.value, 10) || 60 })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--line)', borderRadius: '4px' }}
                />
              </div>
            </div>

            {/* Modal Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowGlobalSettingsModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={saving}
                onClick={async () => {
                  await saveSettingsToSupabase(settings);
                  setShowGlobalSettingsModal(false);
                }}
              >
                {saving ? 'Saving...' : 'Save Global Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: BULK DATE RANGE BLOCKER
          ======================================================== */}
      {showBulkRangeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(24, 57, 65, 0.6)',
            zIndex: 60,
            display: 'grid',
            placeItems: 'center',
            padding: '20px',
          }}
          onClick={() => setShowBulkRangeModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0 }}>
                Block Date Range (Holidays / Leave)
              </h3>
              <button
                type="button"
                onClick={() => setShowBulkRangeModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplyBulkRange}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
                  From Date:
                </label>
                <input
                  type="date"
                  required
                  value={rangeFrom}
                  onChange={(e) => setRangeFrom(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--line)', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
                  To Date:
                </label>
                <input
                  type="date"
                  required
                  value={rangeTo}
                  onChange={(e) => setRangeTo(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--line)', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
                  Reason / Label:
                </label>
                <input
                  type="text"
                  required
                  value={rangeReason}
                  onChange={(e) => setRangeReason(e.target.value)}
                  placeholder="e.g. Christmas Vacation, Office Retreat"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--line)', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowBulkRangeModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Blocking...' : 'Block Entire Range'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
