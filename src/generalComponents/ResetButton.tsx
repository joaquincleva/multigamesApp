import { Loop } from "@mui/icons-material";
import { Button } from "@mui/material";

interface ResetButtonProps {
  resetStyles: any;
  handleReset: any;
}

const ResetButton = ({ resetStyles, handleReset }: ResetButtonProps) => {
  return (
    <Button
      variant="contained"
      color="info"
      sx={resetStyles}
      onClick={handleReset}
    >
      <Loop fontSize="large" />
    </Button>
  );
};

export default ResetButton;
