import React from "react";
import Link from "../link";
import Navbar from "./Navbar";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./language-switcher";
import AuthButtons from "./AuthButtons";
import { getServerSession } from "next-auth";

const Header = async () => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const initialSession = await getServerSession()
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between gap-6 lg:gap-10">   
           <Link className="text-2xl text-primary" href={`/${locale}`}>
        🍕 {translations.logo}{" "}
      </Link>
      <Navbar initialSession={initialSession} translations={translations} />
      <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="hidden lg:flex lg:items-center lg:gap-6 ">
            <AuthButtons
             translations={translations}
             initialSession={initialSession}
            />
            <LanguageSwitcher />
          </div>
          </div>
          </div>
    </header>
  );
};

export default Header;
