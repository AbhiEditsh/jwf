// Buttons.js
import React from "react";
import Button from "@mui/material/Button";
import theme from "../../theme/theme";

export const PrimaryButton = ({ text, onClick, ...rest }) => {
  return (
    <Button
      onClick={onClick ? onClick : undefined}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.white.main,
      }}
      {...rest}
    >
      {text}
    </Button>
  );
};

export const SecondaryButton = ({ text, onClick, ...rest }) => {
  return (
    <Button
      onClick={onClick ? onClick : undefined}
      sx={{
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        borderRadius:'50px'
      }}
      {...rest}
    >
      {text}
    </Button>
  );
};


export const DarkButton = ({ text, onClick, ...rest }) => {
  return (
    <Button
      onClick={onClick ? onClick : undefined}
      sx={{
        color: theme.palette.white.main,
        backgroundColor:theme.palette.black.main,
        borderRadius:'50px',
        padding:"4px 6px",

      }}
      {...rest}
    >
      {text}
    </Button>
  );
};
