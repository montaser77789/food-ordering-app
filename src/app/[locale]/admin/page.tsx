import { Pages, Routes } from "@/components/constants/enums";
import EditUserForm from "@/components/Edit-user-form";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { authOption } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function adminPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const session = await getServerSession(authOption);
  const { locale } = await params;
  const translations = await getTrans(locale)

  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }

  if (session && session.user.role !== UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.PROFILE}`);
  }
  return     <main>
  <section className="section-gap">
    <div className="container">
      <EditUserForm user={session?.user} translations={translations} />
    </div>
  </section>
</main>
}

export default adminPage;
