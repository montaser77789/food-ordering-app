export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = "ar"; // أو جلبها من `cookies` أو `headers`

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>{children}</body>
    </html>
  );
}
