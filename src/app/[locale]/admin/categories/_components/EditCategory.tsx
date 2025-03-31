"use client";
import { Languages } from "@/components/constants/enums";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Translations } from "@/types/translations";
import { catagory } from "@prisma/client";
import { EditIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { updateCategory } from "../_action/catagory";
import { validationErrors } from "@/validations/auth";
import Loader from "@/components/ui/Loader";
import { toast } from "sonner";
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

export function EditCategory({
  translations,
  category,
}: {
  translations: Translations;
  category: catagory;
}) {
  const { locale } = useParams();
  const [state, action, pending] = useActionState(
    updateCategory.bind(null, category.id),
    initialState
  );

  useEffect(() => {
    if (state.message) {
      toast(state.message, {
        className: state.status === 200 ? "text-green-400" : "text-destructive",
      });
    }
  }, [state.message, state.status]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle
            className={`${
              locale === Languages.ARABIC ? "!text-right" : "!text-left"
            }`}
          >
            {translations.admin.categories.form.editName}
          </DialogTitle>
        </DialogHeader>
        <form action={action} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {translations.admin.categories.form.name.label}
            </Label>
            <Input
              id="name"
              defaultValue={category.name}
              className="col-span-3 "
              name="categoryName"
              placeholder={translations.admin.categories.form.name.placeholder}
            />
          </div>
          {state.error?.categoryName && (
            <p className="text-sm text-destructive">
              {state.error?.categoryName}
            </p>
          )}
          <DialogFooter>
            <Button type="submit">
              {pending ? <Loader /> : translations.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
