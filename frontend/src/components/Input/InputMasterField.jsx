import { TextField } from "@mui/material";
import {
  InputSelectField,
  InputTextField,
  InputDateField,
} from "../../components/Input";

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
    if (type === "email") {
      validations = ["required", "email"];
      type = "text";
    }
    return (
      <InputTextField
        name={name}
        title={title}
        control={control}
        type={type}
        validations={validations}
      />
    );
  } else if (type === "date") {
    return <InputDateField name={name} title={title} control={control} />;
  }
  return (
    <label htmlFor="" className="label">
      -Tipo no definido-
    </label>
  );
};
export default InputMasterField;
