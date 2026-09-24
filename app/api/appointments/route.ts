import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { sendBookingNotificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      client_name,
      firm_name,
      email,
      phone,
      service_type,
      services_interested,
      workload,
      message,
      appointment_date,
      start_time,
      end_time,
      timezone,
    } = body;

    if (!client_name || !email || !appointment_date || !start_time) {
      return NextResponse.json(
        { error: 'Missing required appointment fields (name, email, date, time)' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // 1. Insert into Supabase appointments table
    const { data: appointment, error: insertError } = await supabase
      .from('appointments')
      .insert([
        {
          client_name,
          firm_name: firm_name || null,
          email,
          phone: phone || null,
          service_type: service_type || 'US Tax Services',
          services_interested: services_interested || [],
          workload: workload || null,
          message: message || null,
          appointment_date,
          start_time,
          end_time: end_time || start_time,
          timezone: timezone || 'UTC',
          status: 'confirmed',
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // 2. Trigger email notification via Resend
    await sendBookingNotificationEmail({
      client_name,
      firm_name,
      email,
      phone,
      service_type: service_type || 'US Tax Services',
      services_interested,
      appointment_date,
      start_time,
      timezone: timezone || 'UTC',
      message,
    });

    return NextResponse.json({ success: true, appointment });
  } catch (err: unknown) {
    console.error('Appointment API error:', err);
    return NextResponse.json({ error: (err as Error).message || 'Server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    const supabase = await createServerSupabaseClient();
    let query = supabase.from('appointments').select('appointment_date, start_time, end_time, status');

    if (date) {
      query = query.eq('appointment_date', date);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ bookedSlots: data });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
