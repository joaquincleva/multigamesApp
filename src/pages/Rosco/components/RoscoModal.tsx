import { Box, Divider, Grid, Modal, Typography } from "@mui/material";
import { RoscoGame } from "../hooks/useRosco";
import { commonStyles } from "@styles/commonStyles";

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
  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={commonStyles().displayFlex}>
        <Typography variant="h5" textAlign={"center"}>
          {roscoGameState.correctAnswers == 26
            ? "Felicitaciones! Has completado el rosco"
            : "EL juego ha terminado"}
        </Typography>

        {(roscoGameState.correctAnswers == 26 ? 30 : 0) +
          roscoGameState.correctAnswers -
          (Number(roscoGameState.disableAntonyms) +
            Number(roscoGameState.disableSynonyms) +
            Number(roscoGameState.disableLettersQty)) -
          roscoGameState.incorrectAnswers >
          roscoGameState.previousRecord && (
          <Typography variant="body2" textAlign={"center"} color={"#4caf50"}>
            ¡Nuevo record!
          </Typography>
        )}
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ mt: 2 }} variant="h6" textAlign={"center"}>
            Puntuación
          </Typography>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Rosco completado</Typography>
            <Typography color={"#4caf50"}>
              {roscoGameState.correctAnswers == 26 ? "30" : "0"}
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Respuestas Correctas</Typography>
            <Typography color={"#4caf50"}>
              {roscoGameState.correctAnswers}
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Respuestas Inorrectas</Typography>
            <Typography color={"error"}>
              -{roscoGameState.incorrectAnswers}
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Ayudas</Typography>
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
