import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import {
  DEFAULT_AVAILABILITY,
  AvailabilitySettings,
  getAvailableSlotsForDate,
} from '@/lib/availability';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    const supabase = await createServerSupabaseClient();
    const { data: settingRow, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'appointment_availability')
      .maybeSingle();

    if (error) {
      console.error('Error fetching appointment availability:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const settings: AvailabilitySettings = settingRow?.value || DEFAULT_AVAILABILITY;

    // If specific date requested, calculate slots including existing bookings
    if (dateParam) {
      const { data: bookings } = await supabase
        .from('appointments')
        .select('start_time, status')
        .eq('appointment_date', dateParam)
        .neq('status', 'cancelled');

      const bookedSlots = (bookings || []).map((b) => b.start_time);
      const computed = getAvailableSlotsForDate(dateParam, settings, bookedSlots);

      return NextResponse.json({
        date: dateParam,
        ...computed,
        settings,
      });
    }

    // Return general settings
    return NextResponse.json({ settings });
  } catch (err: unknown) {
    console.error('Availability API GET error:', err);
    return NextResponse.json(
      { error: (err as Error).message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();

    // Verify session
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { settings } = body;

    if (!settings) {
      return NextResponse.json(
        { error: 'Missing settings payload' },
        { status: 400 }
      );
    }

    const { error: upsertError } = await supabase
      .from('site_settings')
      .upsert({
        key: 'appointment_availability',
        value: settings,
        updated_at: new Date().toISOString(),
      });

    if (upsertError) {
      console.error('Error updating availability settings:', upsertError);
      return NextResponse.json({ error: upsertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, settings });
  } catch (err: unknown) {
    console.error('Availability API PUT error:', err);
    return NextResponse.json(
      { error: (err as Error).message || 'Server error' },
      { status: 500 }
    );
  }
}
