import { TextField } from "@mui/material";
import { InputSelectField, InputTextField } from "../../components/Input";
import { Validations } from "./InputValidations";

const InputMasterField = ({
  name,
  title,
  control,
  validations,
  type = "text",
  options = [],
}) => {
  const rules = Validations(validations);
  console.log("rules", options.length);
  if (type === "select" || options.length > 0) {
    <InputSelectField
      name={name}
      title={title}
      control={control}
      type="select"
      validations={validations}
      options={options}
    />;
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
    <label htmlFor="test" className="label">
      Tipo no definido
    </label>
  );
};
export default InputMasterField;
