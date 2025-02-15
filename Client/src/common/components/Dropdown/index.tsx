import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface DropdownProps {
  valueKey: string;
  displayKey: string;
  value: string;
  initialOptions: { [key: string]: any }[];
  onChange: (e: any) => void;
  label: string;
  readonly?: boolean;
  disabled?: boolean;
  variant?: "filled" | "outlined" | "standard";
}
function Dropdown(props: DropdownProps) {
  const {
    value,
    onChange,
    readonly,
    disabled,
    variant,
    initialOptions,
    label,
    displayKey,
    valueKey,
  } = props;
  const [selectedValue, setSelectedValue] = React.useState(value);
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label={label}
          onChange={handleChange}
          variant={variant}
          readOnly={readonly}
          disabled={disabled}
        >
          <MenuItem>
            <em>None</em>
          </MenuItem>
          {initialOptions?.map((item, i) => (
            <MenuItem value={item[valueKey]}>{item[displayKey]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export { Dropdown };
