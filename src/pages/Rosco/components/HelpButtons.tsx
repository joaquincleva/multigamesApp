import { Button, Tooltip } from "@mui/material";
import { commonStyles } from "@styles/commonStyles";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation()
  return (
    <Tooltip
      title={`${
        disabled
          ? t("rosco.usedHelp")
          : timer <= 5
          ? t("rosco.lessThan5Seconds")
          : ""
      }`}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Button
        sx={commonStyles().width100}
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
