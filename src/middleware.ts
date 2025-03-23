import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { i18n, LanguageType, Locale } from "./i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { Pages, Routes } from "./components/constants/enums";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: LanguageType[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  let locale = "";

  try {
    locale = matchLocale(languages, locales, i18n.defaultLocale);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (error: any) {
    locale = i18n.defaultLocale;
  }
  return locale;
}
export default withAuth(
  async function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathname.startsWith(`/${locale}`)
    );
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      console.log(locale);

      console.log("Detected locale:", locale);
      return NextResponse.redirect(
        new URL(`/${locale}${pathname}`, request.url)
      );
    }

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    const currentLocale = request.url.split("/")[3] as Locale;
    const isAuth = await getToken({ req: request });
    const isAuthPage = pathname.startsWith(`/${currentLocale}/${Routes.AUTH}`);
    const protectedRoutes = [Routes.PROFILE, Routes.ADMIN];

    const isProtectedRoute = protectedRoutes.some((route) => 
      pathname.startsWith(`/${currentLocale}/${route}`)
    );
       // if user not loggedin and try to acess protected route
       console.log("isAuth", isAuth , isProtectedRoute,pathname);
       if (!isAuth && isProtectedRoute) {

        return NextResponse.redirect(
          new URL(`/${currentLocale}/${Routes.AUTH}/${Pages.LOGIN}`, request.url)
        );
      }
       if (isAuthPage && isAuth) {
         console.log("isAuth", isAuth , isProtectedRoute);
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${Routes.PROFILE}`, request.url)
        );
      }
    return response;
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);
export const config = {
  // Matcher ignoring `/_next/`, `/api/`, ..etc
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
