import { NextResponse } from 'next/server';
import { createPublicClient } from '@/lib/supabase/public';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'general')
      .single();

    const faviconUrl = data?.value?.favicon_url;

    if (faviconUrl && typeof faviconUrl === 'string') {
      // If it's a data URI (base64)
      if (faviconUrl.startsWith('data:')) {
        const matches = faviconUrl.match(/^data:([a-zA-Z0-9/+-]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const contentType = matches[1];
          const buffer = Buffer.from(matches[2], 'base64');

          return new NextResponse(buffer, {
            status: 200,
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300',
            },
          });
        }
      } else if (faviconUrl.startsWith('http://') || faviconUrl.startsWith('https://')) {
        return NextResponse.redirect(faviconUrl);
      }
    }
  } catch (err) {
    console.error('Error serving dynamic favicon:', err);
  }

  // Fallback to local favicon.ico or favicon.svg
  try {
    const icoPath = path.join(process.cwd(), 'public', 'favicon.ico');
    if (fs.existsSync(icoPath)) {
      const buffer = fs.readFileSync(icoPath);
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/x-icon',
          'Cache-Control': 'public, max-age=300',
        },
      });
    }
  } catch (err) {
    console.error('Error reading fallback favicon:', err);
  }

  return new NextResponse(null, { status: 404 });
}
