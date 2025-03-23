"use client";
import { Menu, XIcon } from "lucide-react";
import { Routes } from "../constants/enums";
import Link from "../link";
import { Button } from "../ui/button";
import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import LanguageSwitcher from "./language-switcher";
import AuthButtons from "./AuthButtons";
import { Translations } from "@/types/translations";
import { Session } from "next-auth";

const Navbar = ({
  translations,
  initialSession,
}: {
  translations: Translations;
  initialSession: Session | null;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const links = [
    {
      id: crypto.randomUUID(),
      title: translations.navbar.menu,
      href: Routes.MENU,
    },
    {
      id: crypto.randomUUID(),
      title: translations.navbar.about,
      href: Routes.ABOUT,
    },
    {
      id: crypto.randomUUID(),
      title: translations.navbar.contact,
      href: Routes.CONTACT,
    },
  ];

  const { locale } = useParams();

  const Pathname = usePathname();
  return (
    <nav className="order-last lg:order-none">
      <Button
        variant="secondary"
        size="sm"
        className="lg:hidden"
        onClick={() => setOpenMenu(true)}
      >
        <Menu className="!w-6 !h-6" />
      </Button>
      <ul
        className={`fixed lg:static ${
          openMenu ? "left-0 z-50" : "-left-full"
        } top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}
      >
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 lg:hidden"
          onClick={() => setOpenMenu(false)}
        >
          <XIcon className="!w-6 !h-6" />
        </Button>
        {links.map((link) => (
          <li key={link.id}>
            <Link
            onClick={() => setOpenMenu(false)}
              className={`font-semibold  hover:text-primary duration-200 transition-colors ${
                Pathname === `/${locale}/${link.href}`
                  ? "text-primary"
                  : "text-accent"
              }`}
              href={`/${locale}/${link.href}`}
            >
              {link.title}
            </Link>
          </li>
        ))}
        <li className="lg:hidden flex flex-col gap-4">
          <div onClick={() => setOpenMenu(false)}>
            <AuthButtons
              translations={translations}
              initialSession={initialSession}
            />
          </div>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
