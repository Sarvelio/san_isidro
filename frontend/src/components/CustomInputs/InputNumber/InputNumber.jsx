import NumberFormat from "react-number-format";
import { useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import React from "react";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange(values.floatValue);
      }}
      thousandSeparator
      isNumericString
    />
  );
});

export default function InputNumber({
  name,
  control,
  rules,
  className,
  placeholder = "",
  disabled = false,
  prefix = "",
  suffix = "",
  decimalScale = 2,
}) {
  const {
    field: { onChange, value },
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue: "",
  });

  return (
    <>
      <div className="flex flex-col">
        <TextField
          error={error && error.message ? true : false}
          placeholder={placeholder}
          value={value}
          inputProps={{ prefix, suffix, decimalScale }}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          onChange={(value) => {
            onChange(value);
          }}
          size="small"
          disabled={disabled}
        />

        {error && error.message && (
          <div className="text-red-600 text-sm mt-1">{error.message}</div>
        )}
      </div>
    </>
  );
}
