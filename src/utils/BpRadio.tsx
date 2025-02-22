import { Radio, RadioProps } from "@mui/material";
import { BpCheckedIcon, BpIcon } from "./style";

export function BpRadio(props: RadioProps) {
  return (
    <Radio
      sx={{
        color: "#00A76F", // ✅ Set Default Color
        "&.Mui-checked": {
          color: "#00A76F", // ✅ Ensure Active Color Matches Design
        },
      }}
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}