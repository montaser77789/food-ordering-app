"use client";
import { Pages, Routes } from "@/components/constants/enums";
import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { FormEvent, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Translations } from "@/types/translations";
import Loader from "@/components/ui/Loader";
import { useParams, useRouter } from "next/navigation";

const Form = ({ translations }: { translations: Translations }) => {
  const router = useRouter();
  const { locale } = useParams();
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { getFormFields } = useFormFields({
    slug: Pages.LOGIN,
    translations: translations,
  });
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        const validationError = JSON.parse(res?.error).validationError;
        const resError = JSON.parse(res?.error).resError;
        setError(validationError);
        console.log(resError);
        if (resError) {
          toast(resError);
        }
      }
      if (res?.ok) {
        toast(translations.messages.loginSuccessful);
        router.replace(`/${locale}/${Routes.PROFILE}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {getFormFields().map((field: IFormField) => (
        <div key={field.id} className="mb-3">
          <FormFields {...field} error={error} />
        </div>
      ))}
      <Button disabled={isLoading} type="submit" className="w-full">
        {isLoading ? <Loader /> : translations.auth.login.submit}
      </Button>
    </form>
  );
};

export default Form;
