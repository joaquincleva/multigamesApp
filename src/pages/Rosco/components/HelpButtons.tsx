import { Button, Tooltip } from "@mui/material";
import { roscoGameStyles } from "../styles/roscoGame.styles";

interface HelpButtonsProps {
  disabled: boolean;
  handleSnackbar: (arg0: string) => void;
  handleSnackbarText: string;
  buttonText: string;
}

const HelpButtons = ({
  disabled,
  handleSnackbar,
  handleSnackbarText,
  buttonText,
}: HelpButtonsProps) => {
  return (
    <Tooltip title={`${disabled ? "Ya has usado este recurso" : ""}`}>
      <Button
        sx={roscoGameStyles.helpButton}
        variant="contained"
        disableElevation
        color={`${disabled ? "error" : "info"}`}
        onClick={disabled ? () => {} : handleSnackbar(handleSnackbarText)}
      >
        {buttonText}
      </Button>
    </Tooltip>
  );
};

export default HelpButtons;
