import { TextField } from "@mui/material";
import { InputNumber } from "../../components/CustomInputs";
import { Validations } from "./InputValidations";

const InputNumberField = ({
  title,
  control,
  name,
  validations = [],
  prefix = "",
  decimalScale = 0,
}) => {
  const rules = Validations(validations);
  return (
    <div>
      <label htmlFor="" className="label">
        {title}
      </label>
      <InputNumber
        control={control}
        name={name}
        rules={rules}
        placeholder={`Ingrese: ${title.toLowerCase()}`}
        prefix={prefix}
        decimalScale={decimalScale}
      />
    </div>
  );
};
export default InputNumberField;
