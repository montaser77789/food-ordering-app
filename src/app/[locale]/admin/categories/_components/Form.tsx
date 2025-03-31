"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Loader from '@/components/ui/Loader'
import { Translations } from '@/types/translations'
import { validationErrors } from '@/validations/auth'
import React, { useActionState } from 'react'
import { addCategory } from '../_action/catagory'
type InitialStateType = {
    message?: string;
    error?: validationErrors;
    status?: number | null;
  };
  const initialState: InitialStateType = {
    message: "",
    error: {},
    status: null,
  };

const Form = ({translations} : {translations : Translations}) => {
    const [state, action, pending] = useActionState(addCategory, initialState);
    return (
    <form action={action}>
    <div className="space-y-2">
      <Label htmlFor="name">
        {translations.admin.categories.form.name.label}
      </Label>
      <div className="flex items-center gap-4">
        <Input
          type="text"
          name="name"
          id="name"
          placeholder={translations.admin.categories.form.name.placeholder}
        />
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? <Loader /> : translations.create}
        </Button>
      </div>
      {state.error?.name && (
        <p className="text-sm text-destructive">{state.error.name}</p>
      )}
    </div>
  </form>
  )
}

export default Form
