import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/siteUrl'

// Country variants under /r/ rewrite to the same homepage; list only the canonical URL.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL.origin, changeFrequency: 'monthly', priority: 1 }]
}
