import { Box, Divider, Grid, Modal, Typography } from "@mui/material";
import { RoscoGame } from "../hooks/useRosco";
import { useTranslation } from "react-i18next";

interface RoscoModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  roscoGameState: RoscoGame;
  roscoRecord: number;
}

const RoscoModal = ({
  isModalOpen,
  closeModal,
  roscoGameState,
  roscoRecord,
}: RoscoModalProps) => {
  const { t } = useTranslation();

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
          {roscoGameState.correctAnswers == 26
            ? t("rosco.modal.finishedRosco")
            : t("rosco.modal.finishedTime")}
        </Typography>

        {(roscoGameState.correctAnswers == 26 ? 30 : 0) +
          roscoGameState.correctAnswers -
          (Number(roscoGameState.disableAntonyms) +
            Number(roscoGameState.disableSynonyms) +
            Number(roscoGameState.disableLettersQty)) -
          roscoGameState.incorrectAnswers >
          roscoGameState.previousRecord && (
          <Typography variant="body2" textAlign={"center"} color={"#4caf50"}>
            {t("rosco.modal.newRecord")}
          </Typography>
        )}
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ mt: 2 }} variant="h6" textAlign={"center"}>
            {t("rosco.modal.score")}
          </Typography>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{t("rosco.modal.completedRosco")}</Typography>
            <Typography color={"#4caf50"}>
              {roscoGameState.correctAnswers == 26 ? "30" : "0"}
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{t("rosco.modal.correctAnswers")}</Typography>
            <Typography color={"#4caf50"}>
              {roscoGameState.correctAnswers}
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{t("rosco.modal.incorrectAnswers")}</Typography>
            <Typography color={"error"}>
              -{roscoGameState.incorrectAnswers}
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{t("rosco.modal.helps")}</Typography>
            <Typography color={"error"}>
              {Number(roscoGameState.disableAntonyms) +
                Number(roscoGameState.disableSynonyms) +
                Number(roscoGameState.disableLettersQty) ==
              0
                ? ""
                : "-"}
              {Number(roscoGameState.disableAntonyms) +
                Number(roscoGameState.disableSynonyms) +
                Number(roscoGameState.disableLettersQty)}
            </Typography>
          </Grid>
          <Divider />
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Total</Typography>
            <Typography>
              {(roscoGameState.correctAnswers == 26 ? 30 : 0) +
                roscoGameState.correctAnswers -
                (Number(roscoGameState.disableAntonyms) +
                  Number(roscoGameState.disableSynonyms) +
                  Number(roscoGameState.disableLettersQty)) -
                roscoGameState.incorrectAnswers}
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Record</Typography>
            <Typography>{roscoRecord}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default RoscoModal;
