import { Box, FormControl, Grid, TextField } from "@mui/material";
import { Loop } from "@mui/icons-material";
import MathModal from "./components/MathModal";
import useMathGame from "./hook/useMathGame";
import { mathGameStyles } from "./styles/MathGame.styles";
import { commonStyles } from "@styles/commonStyles";
import SelfProgress from "@generalComponents/SelfProgress";
import Score from "@generalComponents/Score";
import ResetButton from "@generalComponents/ResetButton";

const MathGame = () => {
  const {
    mathGameState,
    setMathGameState,
    isModalOpen,
    mathGameRecord,
    handleEnterKey,
    handleReset,
    closeModal,
  } = useMathGame();

  return (
    <Box sx={commonStyles().boxContainer}>
      <Grid container sx={commonStyles().gridContainer}>
        <Grid item xs={12} md={8} sx={commonStyles().leftSideContainer}>
          <Grid container id="wordsContainer" sx={commonStyles().width100}>
            <Grid
              item
              xs={12}
              sx={
                mathGameStyles(mathGameState.backgroundColor).ecuationContainer
              }
            >
              {mathGameState.runningGame ? (
                mathGameState.answerText
              ) : (
                <Loop
                  fontSize="large"
                  sx={mathGameStyles().resetButtonInArrayText}
                  onClick={() => handleReset()}
                />
              )}
            </Grid>
          </Grid>
          <Grid sx={mathGameStyles().inputContainer}>
            <FormControl fullWidth sx={commonStyles().displayFlex}>
              <TextField
                disabled={!mathGameState.runningGame}
                fullWidth
                placeholder={`${mathGameState.current == 0 ? "Calcular" : ""}`}
                value={mathGameState.responseText.trim()}
                onChange={(e) => {
                  setMathGameState((prevState) => ({
                    ...prevState,
                    activeTimer: true,
                    responseText: e.target.value,
                  }));
                }}
                onKeyDown={(e) => {
                  handleEnterKey(e.key);
                }}
                inputProps={{
                  style: {
                    fontSize: "30px",
                    letterSpacing: "3px",
                    textAlign: "center",
                  },
                }}
                sx={mathGameStyles().input}
              ></TextField>
            </FormControl>
            <ResetButton
              resetStyles={commonStyles().resetButtonSmall}
              handleReset={handleReset}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} sx={commonStyles().rightSideContainer}>
          <SelfProgress
            size={150}
            format={`${Math.floor(mathGameState.timer / 60)}:${
              mathGameState.timer % 60 < 10
                ? "0" + (mathGameState.timer % 60)
                : mathGameState.timer % 60
            }`}
            percent={100 - 100 * (mathGameState.timer / 60)}
            style={commonStyles().progressStyle}
          />
          <Score
            gridStyles={{ width: "75%", mb: 3 }}
            record={mathGameRecord}
            actualScore={
              mathGameState.correctAnswers - mathGameState.incorrectAnswers
            }
          />
        </Grid>
      </Grid>
      <MathModal
        previousRecord={mathGameState.previousRecord}
        isModalOpen={isModalOpen}
        mathGameRecord={mathGameRecord}
        closeModal={closeModal}
        correctAnswers={mathGameState.correctAnswers}
        incorrectAnswers={mathGameState.incorrectAnswers}
      />
    </Box>
  );
};

export default MathGame;
