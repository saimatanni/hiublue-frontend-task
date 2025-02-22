import * as React from "react";

import { CheckboxProps } from "@mui/material/Checkbox";
import { BpCheckBoxIcon, CheckBoxBpIcon } from "./style";
import Checkbox from "@mui/material/Checkbox";

export function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{ "&:hover": { bgcolor: "transparent" } }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckBoxIcon />}
      icon={<CheckBoxBpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}
