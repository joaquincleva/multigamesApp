import { Button, Tooltip } from "@mui/material";
import { roscoGameStyles } from "../styles/roscoGame.styles";

interface HelpButtonsProps {
  disabled: boolean;
  handleSnackbar: (arg0: string) => void;
  handleSnackbarText: string;
  buttonText: string;
  timer: number;
}

const HelpButtons = ({
  disabled,
  timer,
  handleSnackbar,
  handleSnackbarText,
  buttonText,
}: HelpButtonsProps) => {
  return (
    <Tooltip
      title={`${
        disabled
          ? "Ya has usado este recurso"
          : timer <= 5
          ? "Tienes menos de 5 segundos"
          : ""
      }`}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Button
        sx={roscoGameStyles.helpButton}
        variant="contained"
        disableElevation
        color={`${disabled || timer <= 5 ? "error" : "info"}`}
        onClick={disabled? () => {} : handleSnackbar(handleSnackbarText)}
      >
        {buttonText}
      </Button>
    </Tooltip>
  );
};

export default HelpButtons;
