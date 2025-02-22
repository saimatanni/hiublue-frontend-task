

//radio 
import { styled } from "@mui/material";

// ✅ Default (Unselected) Radio Button Styling
export const BpIcon = styled("span")({
  borderRadius: "50%",
  width: 16,
  height: 16,
//   border:"1px solid #637381",
  boxShadow: "inset 0 0 0 1px #637381", // ✅ Border Color Updated
  backgroundColor: "#f5f8fa",
  backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
  },
});

// ✅ Selected (Active) Radio Button Styling
export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#00A76F", // ✅ Active Color Updated
  backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#00A76F",
  },
});


  // checkbox

export const CheckBoxBpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow: "inset 0 0 0 1px #637381",
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
    ...theme.applyStyles('dark', {
      backgroundColor: '#30404d',
    }),
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
    ...theme.applyStyles('dark', {
      background: 'rgba(57,75,89,.5)',
    }),
  },
  ...theme.applyStyles('dark', {
    // border:"1px solid #637381",
     boxShadow: "inset 0 0 0 1px #637381",
    backgroundColor: '#394b59',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
  }),
}));

export const BpCheckBoxIcon = styled(CheckBoxBpIcon)({
  backgroundColor: '#00A76F',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#00A76F',
  },
});
 