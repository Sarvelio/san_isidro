import { TextField } from "@mui/material";
import { InputSelectField, InputTextField } from "../../components/Input";
import { Validations } from "./InputValidations";

const InputMasterField = ({
  name,
  title,
  control,
  validations = ["required"],
  type = "text",
  options = [],
}) => {
  if (options && options.length > 0) {
    return (
      <InputSelectField
        name={name}
        title={title}
        control={control}
        validations={validations}
        options={options}
      />
    );
  } else if (["text", "email", "password"].includes(type)) {
    return (
      <InputTextField
        name={name}
        title={title}
        control={control}
        type={type}
        validations={validations}
      />
    );
  }
  return (
    <label htmlFor="" className="label">
      -Tipo no definido-
    </label>
  );
};
export default InputMasterField;
