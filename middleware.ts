import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

export const locales = ["en", "uk", "ru"] as const;

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "uk",
  localeDetection: false,
});

export default function middleware(req: NextRequest) {
  const excludePattern = `^(/(${locales.join("|")}))?/user/?.*$`;
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);

  const { pathname } = req.nextUrl;
  const localeMatch = pathname.match(/^\/(en|uk|ru)/);
  const locale = localeMatch ? localeMatch[1] : 'uk';

  if (isPublicPage) {
    return intlMiddleware(req);
  }

  const token =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  if (!token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};