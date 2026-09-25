export interface DateOverride {
  status: 'available' | 'blocked' | 'custom';
  reason?: string;
  available_slots?: string[];
  blocked_slots?: string[];
}

export interface AvailabilitySettings {
  working_days: number[]; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  default_slots: string[];
  slot_duration_minutes: number;
  timezone: string;
  notice_hours_required: number;
  max_advance_days: number;
  date_overrides: Record<string, DateOverride>;
}

export const DEFAULT_SLOTS = [
  '10:00 am', '10:30 am', '11:00 am', '11:30 am',
  '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
  '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm',
  '4:00 pm', '4:30 pm', '5:00 pm',
];

export const DEFAULT_AVAILABILITY: AvailabilitySettings = {
  working_days: [1, 2, 3, 4, 5], // Monday - Friday
  default_slots: DEFAULT_SLOTS,
  slot_duration_minutes: 30,
  timezone: 'America/Los_Angeles',
  notice_hours_required: 1,
  max_advance_days: 60,
  date_overrides: {},
};

/**
 * Standardize time string formatting (e.g. "10:00:00" -> "10:00 am", "14:30:00" -> "2:30 pm")
 */
export function normalizeTimeString(timeStr: string): string {
  if (!timeStr) return '';
  const trimmed = timeStr.trim().toLowerCase();
  
  // If already in "10:00 am" format
  if (trimmed.includes('am') || trimmed.includes('pm')) {
    return trimmed.replace(/\s+/g, ' ');
  }

  // If in 24hr "HH:mm" or "HH:mm:ss" format
  const parts = trimmed.split(':');
  if (parts.length >= 2) {
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  return trimmed;
}

/**
 * Compute the exact available time slots for a given date string (yyyy-MM-dd)
 */
export function getAvailableSlotsForDate(
  dateStr: string,
  settings: AvailabilitySettings,
  bookedSlotsOnDate: string[] = []
): {
  isDateAvailable: boolean;
  status: 'available' | 'blocked' | 'custom' | 'non_working';
  reason?: string;
  slots: string[];
} {
  const override = settings.date_overrides?.[dateStr];

  // 1. Explicitly blocked by admin
  if (override?.status === 'blocked') {
    return {
      isDateAvailable: false,
      status: 'blocked',
      reason: override.reason || 'Blocked by administrator',
      slots: [],
    };
  }

  // Parse day of week (yyyy-MM-dd)
  const [year, month, day] = dateStr.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const dayOfWeek = dateObj.getDay();

  // 2. Custom slots for this specific date
  if (override?.status === 'custom') {
    const customList = override.available_slots || [];
    const normalizedBooked = bookedSlotsOnDate.map(normalizeTimeString);
    const openSlots = customList.filter(
      (slot) => !normalizedBooked.includes(normalizeTimeString(slot))
    );

    return {
      isDateAvailable: openSlots.length > 0,
      status: 'custom',
      reason: override.reason,
      slots: openSlots,
    };
  }

  // 3. Regular working days check
  const isWorkingDay = (settings.working_days || [1, 2, 3, 4, 5]).includes(dayOfWeek);
  if (!isWorkingDay && override?.status !== 'available') {
    return {
      isDateAvailable: false,
      status: 'non_working',
      reason: 'Non-working day',
      slots: [],
    };
  }

  // 4. Default slots minus blocked slots & booked slots
  let baseSlots = [...(settings.default_slots || DEFAULT_SLOTS)];
  if (override?.blocked_slots && override.blocked_slots.length > 0) {
    const normBlocked = override.blocked_slots.map(normalizeTimeString);
    baseSlots = baseSlots.filter((s) => !normBlocked.includes(normalizeTimeString(s)));
  }

  const normalizedBooked = bookedSlotsOnDate.map(normalizeTimeString);
  const openSlots = baseSlots.filter(
    (slot) => !normalizedBooked.includes(normalizeTimeString(slot))
  );

  return {
    isDateAvailable: openSlots.length > 0,
    status: 'available',
    reason: override?.reason,
    slots: openSlots,
  };
}
