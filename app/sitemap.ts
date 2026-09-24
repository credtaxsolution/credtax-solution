import { MetadataRoute } from 'next';
import { createPublicClient } from '@/lib/supabase/public';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://credtaxsolution.com';

  const staticRoutes = [
    '',
    '/services',
    '/credtax-pod',
    '/succession-continuity',
    '/how-we-work',
    '/why-credtax',
    '/about',
    '/insights',
    '/faq',
    '/contact',
    '/book-appointment',
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Fetch all published articles statically
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = createPublicClient();
    const { data: blogs } = await supabase
      .from('blogs')
      .select('slug, updated_at, published_at')
      .eq('is_published', true);

    if (blogs && blogs.length > 0) {
      blogRoutes = blogs.map((b) => ({
        url: `${baseUrl}/insights/${b.slug}`,
        lastModified: new Date(b.updated_at || b.published_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }
  } catch (err) {
    console.error('Error generating sitemap for blogs:', err);
  }

  return [...staticRoutes, ...blogRoutes];
}
