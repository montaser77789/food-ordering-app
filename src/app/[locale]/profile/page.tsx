import { Routes } from "@/components/constants/enums";
import { Locale } from "@/i18n.config";
import { authOption } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const session = await getServerSession(authOption);
  const { locale } = await params;
  if(session && session.user.role === UserRole.ADMIN){
    redirect(`/${locale}/${Routes.ADMIN}`)
  }
  return <main>test</main>;
}

export default ProfilePage;
