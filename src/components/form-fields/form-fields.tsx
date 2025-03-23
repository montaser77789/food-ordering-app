import { IFormField } from "@/types/app";
import { InputTypes } from "../constants/enums";
import PasswordField from "./password-field";
import TextField from "./text-field";
import Checkbox from "./checkbox";
import { validationErrors } from "@/validations/auth";

interface Props extends IFormField {
  error: validationErrors;
}

const FormFields = (props: Props) => {
  const { type } = props;
  const renderField = (): React.ReactNode => {
    if (type === InputTypes.EMAIL || type === InputTypes.TEXT) {
      return <TextField {...props} />;
    }

    if (type === InputTypes.PASSWORD) {
      return <PasswordField {...props} />;
    }

    if (type === InputTypes.CHECKBOX) {
      return <Checkbox {...props} checked={Boolean(props.checked)} />;
    }
    

    return <TextField {...props} />;
  };

  return <>{renderField()}</>;
};

export default FormFields;
