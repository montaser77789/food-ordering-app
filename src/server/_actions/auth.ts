"use server";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { loginSchema, signUpSchema } from "@/validations/auth";
import { db } from "../prisma";
import bcrypt from "bcrypt";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

export const login = async (
  credentials: Record<"email" | "password", string>,
  locale: Locale
) => {
  const translations = await getTrans(locale);
  const result = loginSchema(translations).safeParse(credentials);

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  } else {
    try {
      const user = await db.user.findUnique({
        where: {
          email: result.data.email,
        },
      });
      if (!user) {
        return {
          message: translations.messages.userNotFound,
          status: 401,
        };
      }
      const isValidPassword = await bcrypt.compare(
        result.data.password,
        user.password
      );
      if (!isValidPassword) {
        return {
          message: translations.messages.incorrectPassword,
          status: 401,
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        status: 200,
        message: translations.messages.loginSuccessful,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: translations.messages.unexpectedError,
      };
    }
  }
};

export const signup = async (prevState: unknown, formData: FormData) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const result = signUpSchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      formData,
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (user) {
      return {
        status: 409,
        message: translations.messages.userAlreadyExists,
        formData,
      };
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const createdUser = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
        image: "",
      },
    });

    return {
      status: 201,
      message: translations.messages.accountCreated,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
