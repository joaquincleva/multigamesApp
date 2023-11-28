import { Box, Grid } from "@mui/material";

const MathGame = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Grid
        container
        sx={{
          isplay: "flex",
          width: "95%",
          height: "80vh",
          flexDirection: "row",
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginTop: "10px",
            width: "100%",
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{marginTop: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          justifyItems: "center",
          justifyContent: "space-around",}}
        ></Grid>
      </Grid>
      <MechanographyModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        correctWords={mechanographyGameState.answerArray.reduce(
          (acc, val) => acc + val,
          0
        )}
        incorrectWords={
          mechanographyGameState.answerArray
            .slice(0, mechanographyGameState.current + 1)
            .filter((num) => num === 0).length
        }
        mechanographyRecord={mechanographyRecord}
      />
    </Box>
  );
};

export default MathGame;
