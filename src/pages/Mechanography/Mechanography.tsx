import { Box, FormControl, Grid, TextField } from "@mui/material";
import MechanographyModal from "./components/MechanographyModal";
import useMechanography from "./hook/useMechanography";
import { mechanographyGameStyles } from "./styles/MechanographyGame.styles";
import { commonStyles } from "../../styles/commonStyles";
import SelfProgress from "../../generalComponents/SelfProgress";
import Score from "../../generalComponents/Score";
import ResetButton from "../../generalComponents/ResetButton";

const Mechanography = () => {
  const {
    mechanographyGameState,
    setMechanographyGameState,
    handleReset,
    handleEnterKey,
    isModalOpen,
    mode,
    closeModal,
    mechanographyRecord,
    t
  } = useMechanography();

  return (
    <Box sx={commonStyles().boxContainer}>
      <Grid container sx={commonStyles().gridContainer}>
        <Grid item xs={12} md={8} sx={commonStyles().leftSideContainer}>
          <Grid container id="wordsContainer" sx={commonStyles().width100}>
            <Grid
              item
              xs={12}
              sx={mechanographyGameStyles().wordsArrayContainerFather}
            >
              <Grid
                sx={{
                  ...mechanographyGameStyles(mechanographyGameState.lines)
                    .wordsArrayContainerChild,
                }}
              >
                {mechanographyGameState.wordsArray.map((item, index) => (
                  <span
                    key={index}
                    style={{
                      ...mechanographyGameStyles(
                        0,
                        index,
                        mechanographyGameState.current,
                        item,
                        mechanographyGameState.responseText,
                        mode,
                        mechanographyGameState.answerArray
                      ).wordsArray,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={mechanographyGameStyles().formControlContaienr}>
            <FormControl fullWidth sx={commonStyles().displayFlex}>
              <TextField
                disabled={!mechanographyGameState.runningGame}
                fullWidth
                placeholder={`${
                  mechanographyGameState.current == 0 ? t("mechanography.write") : ""
                }`}
                value={mechanographyGameState.responseText.trim()}
                onChange={(e) => {
                  setMechanographyGameState((prevState) => ({
                    ...prevState,
                    activeTimer: true,
                    responseText: e.target.value,
                  }));
                }}
                onKeyDown={(e) => {
                  handleEnterKey(e.key);
                }}
                inputProps={{
                  style: mechanographyGameStyles().input,
                }}
                sx={commonStyles().width100}
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
            style={commonStyles().progressStyle}
            format={`${Math.floor(mechanographyGameState.timer / 60)}:${
              mechanographyGameState.timer % 60 < 10
                ? "0" + (mechanographyGameState.timer % 60)
                : mechanographyGameState.timer % 60
            }`}
            percent={100 - 100 * (mechanographyGameState.timer / 60)}
          />
          <Score
            gridStyles={{ width: "75%", mb: 1 }}
            actualScore={
              mechanographyGameState.answerArray.reduce(
                (acc, val) => acc + val,
                0
              ) -
              mechanographyGameState.answerArray
                .slice(0, mechanographyGameState.current + 1)
                .filter((num) => num === 0).length
            }
            record={mechanographyRecord}
          />
        </Grid>
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
        previousRecord={mechanographyGameState.previousRecord}
      />
    </Box>
  );
};

export default Mechanography;
