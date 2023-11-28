import { Box, Divider, Grid, Modal, Typography } from "@mui/material";

interface RoscoModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  correctWords: number;
  incorrectWords: number;
  mechanographyRecord: number
}

const MechanographyModal = ({
  isModalOpen,
  closeModal,
  correctWords,
  incorrectWords,
  mechanographyRecord
}: RoscoModalProps) => {
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
          El tiempo ha terminado
        </Typography>
        {correctWords - incorrectWords > 50 && (
          <Typography variant="body2" textAlign={"center"} color={"#4caf50"}>
            ¡Nuevo record!
          </Typography>
        )}
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ my: 3 }} variant="h6" textAlign={"center"}>
            Puntuación
          </Typography>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Respuestas Correctas</Typography>
            <Typography color={"#4caf50"}>{correctWords}</Typography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Respuestas Inorrectas</Typography>
            <Typography color={"error"}>{incorrectWords}</Typography>
          </Grid>

          <Divider />
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Total</Typography>
            <Typography>{correctWords - incorrectWords}</Typography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Record</Typography>
            <Typography>{mechanographyRecord}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default MechanographyModal;
