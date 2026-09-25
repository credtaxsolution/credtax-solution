import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching testimonials:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ testimonials: data || [] });
  } catch (err: unknown) {
    console.error('Testimonials GET error:', err);
    return NextResponse.json(
      { error: (err as Error).message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();

    // Verify session
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const body = await request.json();
    const {
      client_name,
      client_title,
      firm_name,
      quote,
      rating,
      display_order,
      is_active,
    } = body;

    if (!client_name?.trim() || !client_title?.trim() || !quote?.trim()) {
      return NextResponse.json(
        { error: 'Client name, title, and quote are required.' },
        { status: 400 }
      );
    }

    const payload = {
      client_name: client_name.trim(),
      client_title: client_title.trim(),
      firm_name: firm_name ? firm_name.trim() : null,
      quote: quote.trim(),
      rating: typeof rating === 'number' ? rating : 5,
      display_order: typeof display_order === 'number' ? display_order : 0,
      is_active: typeof is_active === 'boolean' ? is_active : true,
    };

    const { data, error } = await supabase
      .from('testimonials')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error inserting testimonial:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Purge static cache so changes appear on homepage immediately
    try {
      revalidatePath('/');
      revalidatePath('/admin/testimonials');
    } catch (e) {
      console.warn('Revalidation warning:', e);
    }

    return NextResponse.json({ success: true, testimonial: data });
  } catch (err: unknown) {
    console.error('Testimonials POST error:', err);
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
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const body = await request.json();
    const {
      id,
      client_name,
      client_title,
      firm_name,
      quote,
      rating,
      display_order,
      is_active,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required for editing.' }, { status: 400 });
    }

    const payload: Record<string, unknown> = {};
    if (client_name !== undefined) payload.client_name = client_name.trim();
    if (client_title !== undefined) payload.client_title = client_title.trim();
    if (firm_name !== undefined) payload.firm_name = firm_name ? firm_name.trim() : null;
    if (quote !== undefined) payload.quote = quote.trim();
    if (rating !== undefined) payload.rating = Number(rating) || 5;
    if (display_order !== undefined) payload.display_order = Number(display_order) || 0;
    if (is_active !== undefined) payload.is_active = Boolean(is_active);

    const { data, error } = await supabase
      .from('testimonials')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating testimonial:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Purge static cache so changes appear on homepage immediately
    try {
      revalidatePath('/');
      revalidatePath('/admin/testimonials');
    } catch (e) {
      console.warn('Revalidation warning:', e);
    }

    return NextResponse.json({ success: true, testimonial: data });
  } catch (err: unknown) {
    console.error('Testimonials PUT error:', err);
    return NextResponse.json(
      { error: (err as Error).message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();

    // Verify session
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    try {
      revalidatePath('/');
      revalidatePath('/admin/testimonials');
    } catch (e) {
      console.warn('Revalidation warning:', e);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('Testimonials DELETE error:', err);
    return NextResponse.json(
      { error: (err as Error).message || 'Server error' },
      { status: 500 }
    );
  }
}
