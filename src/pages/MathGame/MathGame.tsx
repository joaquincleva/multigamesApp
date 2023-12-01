import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Col, ConfigProvider, Progress } from "antd";
import { Loop } from "@mui/icons-material";
import MathModal from "./components/MathModal";
import useMathGame from "./hook/useMathGame";
import { mathGameStyles } from "./styles/MathGame.styles";

const MathGame = () => {
  const {
    mathGameState,
    setMathGameState,
    isModalOpen,
    mode,
    mathGameRecord,
    handleEnterKey,
    handleReset,
    closeModal,
  } = useMathGame();

  return (
    <Box sx={mathGameStyles.boxContainer}>
      <Grid container sx={mathGameStyles.gridContainer}>
        <Grid item xs={12} md={8} sx={mathGameStyles.leftSideContainer}>
          <Grid
            container
            id="wordsContainer"
            sx={{
              width: "100%",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                ...mathGameStyles.ecuationContainer,
                borderColor: `${mathGameState.backgroundColor}`,
              }}
            >
              {mathGameState.runningGame? mathGameState.answerText : (
                <Loop
                  fontSize="large"
                  sx={{"&:hover": {cursor: "pointer"}}}
                  onClick={() => handleReset()}
                />)}
            </Grid>
          </Grid>
          <Grid sx={mathGameStyles.inputContainer}>
            <FormControl
              fullWidth
              sx={{
                display: "flex",
              }}
            >
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
                sx={{ width: "100%", textAlign: "center" }}
              ></TextField>
            </FormControl>

            <Button
              variant="contained"
              color="info"
              sx={{ borderRadius: "5px", width: "15%" }}
              onClick={handleReset}
            >
              <Loop fontSize="large" />
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={mathGameStyles.rightSideContainer}
        >
          <Grid>
            <Col>
              <ConfigProvider
                theme={{
                  components: {
                    Progress: {
                      circleTextColor: `${mode == "light" ? "black" : "white"}`,
                    },
                  },
                }}
              >
                <Progress
                  size={150}
                  success={{ percent: 0, strokeColor: "#fff" }}
                  type="circle"
                  className=""
                  strokeColor={"#0288d1"}
                  trailColor={"lightGrey"}
                  style={mathGameStyles.progressStyle}
                  percent={100 - 100 * (mathGameState.timer / 60)}
                  format={() =>
                    `${Math.floor(mathGameState.timer / 60)}:${
                      mathGameState.timer % 60 < 10
                        ? "0" + (mathGameState.timer % 60)
                        : mathGameState.timer % 60
                    }`
                  }
                />
              </ConfigProvider>
            </Col>
          </Grid>
          <Grid sx={{ width: "75%", mb: 3 }}>
            <Grid display={"flex"} sx={{ justifyContent: "space-between" }}>
              <Typography variant="h6">Record: </Typography>
              <Typography variant="h6">{mathGameRecord}</Typography>
            </Grid>
            <Divider />
            <Grid display={"flex"} sx={{ justifyContent: "space-between" }}>
              <Typography variant="h6">Puntuación Actual: </Typography>
              <Typography variant="h6">
                {mathGameState.correctAnswers - mathGameState.incorrectAnswers}
              </Typography>
            </Grid>
          </Grid>
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
