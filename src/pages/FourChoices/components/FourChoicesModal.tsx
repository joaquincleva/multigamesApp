import { Box, Divider, Grid, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface FourChoicesModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  correctAnswers: number;
  previousRecord: number;
  incorrectAnswers: number;
  fourChoicesRecord: number;
}

const FourChoicesModal = ({
  isModalOpen,
  closeModal,
  correctAnswers,
  previousRecord,
  incorrectAnswers,
  fourChoicesRecord,
}: FourChoicesModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          bgcolor: "background.paper",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          p: 2,
          borderRadius: "5px",
        }}
      >
        <Typography variant="h5" textAlign={"center"}>
          {t("modal.finishedTime")}
        </Typography>
        {fourChoicesRecord > previousRecord && (
          <Typography variant="body2" textAlign={"center"} color={"#4caf50"}>
            {t("modal.newRecord")}
          </Typography>
        )}
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ my: 3 }} variant="h6" textAlign={"center"}>
          {t("modal.score")}
          </Typography>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{t("modal.correctAnswers")}</Typography>
            <Typography color={"#4caf50"}>{correctAnswers}</Typography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{t("modal.incorrectAnswers")}</Typography>
            <Typography color={"error"}>{incorrectAnswers}</Typography>
          </Grid>

          <Divider />
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Total</Typography>
            <Typography>{correctAnswers - incorrectAnswers}</Typography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Record</Typography>
            <Typography>{fourChoicesRecord}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default FourChoicesModal;
