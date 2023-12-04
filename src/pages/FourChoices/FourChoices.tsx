import { Box, Button, Grid } from "@mui/material";
import { Loop } from "@mui/icons-material";
import FourChoicesModal from "./components/FourChoicesModal";
import useFourChoices from "./hook/useFourChoicesGame";
import { fourChoicesStyles } from "./styles/FourChoices.styles";
import { commonStyles } from "@styles/commonStyles";
import SelfProgress from "@generalComponents/SelfProgress";
import Score from "@generalComponents/Score";

const FourChoices = () => {
  const {
    fourChoicesState,
    isModalOpen,
    fourChoicesRecord,
    handleEnterKey,
    handleReset,
    closeModal,
  } = useFourChoices();

  return (
    <Box sx={commonStyles().boxContainer}>
      <Grid container sx={commonStyles().gridContainer}>
        <Grid item xs={12} md={8} sx={commonStyles().leftSideContainer}>
          <Grid container id="wordsContainer" sx={{ width: "100%" }}>
            <Grid item xs={12} sx={fourChoicesStyles().ecuationContainer}>
              {fourChoicesState.definition || (
                <Loop
                  fontSize="large"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  onClick={() => handleReset()}
                />
              )}
            </Grid>
          </Grid>
          <Grid sx={fourChoicesStyles().inputContainer} container>
            {fourChoicesState.runningGame &&
              fourChoicesState.fourWords.map((item) => (
                <Grid
                  xs={6}
                  sm={6}
                  key={item}
                  sx={{ padding: "0px 10px 10px 10px" }}
                >
                  <Button
                    color="info"
                    sx={
                      fourChoicesStyles(
                        !fourChoicesState.sendedAnswer,
                        item,
                        fourChoicesState.answerText,
                        fourChoicesState.answerText.toLowerCase()
                      ).resetButtonInText
                    }
                    onClick={() => {
                      handleEnterKey(item);
                    }}
                    fullWidth
                    variant="contained"
                  >
                    {item}
                  </Button>
                </Grid>
              ))}
            <Button
              fullWidth
              variant="contained"
              color="info"
              sx={{ borderRadius: "5px", marginX: "10px", bgcolor: "#0288d1" }}
              onClick={handleReset}
            >
              <Loop fontSize="large" />
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={4}
          sx={fourChoicesStyles().rightSideContainer}
        >
          <SelfProgress
            format={`${Math.floor(fourChoicesState.timer / 60)}:${
              fourChoicesState.timer % 60 < 10
                ? "0" + (fourChoicesState.timer % 60)
                : fourChoicesState.timer % 60
            }`}
            percent={100 - 100 * (fourChoicesState.timer / 60)}
            style={commonStyles().progressStyle}
            size={150}
          />
          <Score
            gridStyles={{ width: "75%", mb: 3 }}
            record={fourChoicesRecord}
            actualScore={
              fourChoicesState.correctAnswers -
              fourChoicesState.incorrectAnswers
            }
          />
        </Grid>
      </Grid>
      <FourChoicesModal
        previousRecord={fourChoicesState.previousRecord}
        isModalOpen={isModalOpen}
        fourChoicesRecord={fourChoicesRecord}
        closeModal={closeModal}
        correctAnswers={fourChoicesState.correctAnswers}
        incorrectAnswers={fourChoicesState.incorrectAnswers}
      />
    </Box>
  );
};

export default FourChoices;
