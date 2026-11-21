import { NextResponse, type NextRequest } from 'next/server'
import { pickRegion } from './lib/regionRouting'

/**
 * Serves the country variant of the home page. Vercel adds `x-vercel-ip-country`; a `?country=`
 * query param overrides it (useful for links sent to a specific recruiter, and for testing).
 * Unknown countries and crawlers fall through to the neutral page at `/`.
 */
export function proxy(request: NextRequest) {
  const region = pickRegion({
    override: request.nextUrl.searchParams.get('country'),
    header: request.headers.get('x-vercel-ip-country'),
    userAgent: request.headers.get('user-agent'),
  })

  if (!region) return NextResponse.next()

  return NextResponse.rewrite(new URL(`/r/${region}`, request.url))
}

export const config = {
  matcher: '/',
}
