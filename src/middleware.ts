import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'construction_company_secure_jwt_secret_key_change_in_production_2026'
const key = new TextEncoder().encode(JWT_SECRET)
const AUTH_COOKIE_NAME = 'construction_admin_token'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value

    if (!token) {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      await jwtVerify(token, key)
      return NextResponse.next()
    } catch {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('next', pathname)
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete(AUTH_COOKIE_NAME)
      return response
    }
  }

  // Redirect authenticated users away from /admin/login directly to /admin/dashboard
  if (pathname === '/admin/login') {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value
    if (token) {
      try {
        await jwtVerify(token, key)
        return NextResponse.redirect(new URL('/admin/dashboard', req.url))
      } catch {
        // Token invalid, proceed to login page
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
