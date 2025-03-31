import { Locale } from "@/i18n.config";
import AdminTabs from "./_components/AdminTabs";
import getTrans from "@/lib/translation";

   async function AdminLayout({
    params,
    children,
  }: {
    params: Promise<{ locale: Locale }>;
    children: React.ReactNode;
  }){
    const locale = (await params).locale;
    const translations = await getTrans(locale);
  return <>
  <AdminTabs translations={translations} />
  {children}
  </>;
}

export default AdminLayout;
