import { Environments, Pages, Routes } from "@/components/constants/enums";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./prisma";
import { login } from "./_actions/auth";
import { Locale } from "@/i18n.config";

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === Environments.DEV,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "MMM@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      authorize: async (credentials, req) => {
        const currentUrl = req?.headers?.referer;
        const Locale = currentUrl?.split("/")[3] as Locale;
        const res = await login(credentials!, Locale);
        if (res.status === 200 && res.user) {
          return res.user;
        } else {
          throw new Error(
            JSON.stringify({
              validationError: res.error,
              resError: res.message,
            })
          );
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: `/${Routes.AUTH}/${Pages.LOGIN}`,
  },
};
