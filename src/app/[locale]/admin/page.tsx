import { Pages, Routes } from "@/components/constants/enums";
import { Locale } from "@/i18n.config";
import { authOption } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function adminPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const session = await getServerSession(authOption);
  const { locale } = await params;
  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }

  console.log(session.user);
  if (session && session.user.role !== UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.PROFILE}`);
  }
  return <main>adminPage</main>;
}

export default adminPage;
