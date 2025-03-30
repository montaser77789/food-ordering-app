import { Pages, Routes } from "@/components/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";
import { Translations } from "@/types/translations";

interface propse extends IFormFieldsVariables {
  translations: Translations;
}

const useFormFields = ({ slug, translations }: propse) => {
  const loginFields = (): IFormField[] => [
    {
      label: translations.auth.login.email.label,
      name: "email",
      type: "email",
      placeholder: translations.auth.login.email.placeholder,
      autoFocus: true,
    },
    {
      label: translations.auth.login.password.label,
      name: "password",
      placeholder: translations.auth.login.password.placeholder,
      type: "password",
    },
  ];

  const signupFields = (): IFormField[] => [
    {
      label: translations.auth.register.name.label,
      name: "name",
      type: "text",
      placeholder: translations.auth.register.name.placeholder,
      autoFocus: true,
    },
    {
      label: translations.auth.register.email.label,
      name: "email",
      type: "email",
      placeholder: translations.auth.register.email.placeholder,
    },
    {
      label: translations.auth.register.password.label,
      name: "password",
      type: "password",
      placeholder: translations.auth.register.password.placeholder,
    },
    {
      label: translations.auth.register.confirmPassword.label,
      name: "confirmPassword",
      type: "password",
      placeholder: translations.auth.register.confirmPassword.placeholder,
    },
  ];
  const profileFields = (): IFormField[] => [
    {
      label: translations.profile.form.name.label,
      name: "name",
      type: "text",
      placeholder: translations.profile.form.name.placeholder,
      autoFocus: true,
    },
    {
      label: translations.profile.form.email.label,
      name: "email",
      type: "email",
      placeholder: translations.profile.form.email.placeholder,
    },
    {
      label: translations.profile.form.phone.label,
      name: "phone",
      type: "text",
      placeholder: translations.profile.form.phone.placeholder,
    },
    {
      label: translations.profile.form.address.label,
      name: "streetAddress",
      type: "text",
      placeholder: translations.profile.form.address.placeholder,
    },
    {
      label: translations.profile.form.postalCode.label,
      name: "postalCode",
      type: "text",
      placeholder: translations.profile.form.postalCode.placeholder,
    },
    {
      label: translations.profile.form.city.label,
      name: "city",
      type: "text",
      placeholder: translations.profile.form.city.placeholder,
    },
    {
      label: translations.profile.form.country.label,
      name: "country",
      type: "text",
      placeholder: translations.profile.form.country.placeholder,
    },
  ];

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN:
        return loginFields();
      case Pages.Register:
        return signupFields();
      case Routes.PROFILE:
        return profileFields();
      default:
        return [];
    }
  };

  return { getFormFields };
};

export default useFormFields;
