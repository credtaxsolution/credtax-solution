import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { sendContactFormNotificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      firm,
      email,
      country,
      role,
      website,
      need,
      workload,
      support_structure,
      message,
    } = body;

    if (!name?.trim() || !firm?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'Name, firm, and email are required.' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // 1. Insert into Supabase contact_submissions table
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: name.trim(),
          firm: firm.trim(),
          email: email.trim(),
          country: country || 'United States',
          role: role || 'Firm owner / partner',
          website: website?.trim() || null,
          need: need || 'Tax',
          workload: workload?.trim() || null,
          support_structure: support_structure || null,
          message: message?.trim() || null,
          status: 'new',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database insert error in contact form:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Trigger email notification via Resend
    await sendContactFormNotificationEmail({
      name,
      firm,
      email,
      country,
      role,
      website,
      need,
      workload,
      support_structure,
      message,
    });

    return NextResponse.json({ success: true, submission: data });
  } catch (err: unknown) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: (err as Error).message || 'Server error' },
      { status: 500 }
    );
  }
}
