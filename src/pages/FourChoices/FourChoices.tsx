import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Col, ConfigProvider, Progress } from "antd";
import { Loop } from "@mui/icons-material";
import FourChoicesModal from "./components/FourChoicesModal";
import useFourChoices from "./hook/useFourChoicesGame";
import { fourChoicesStyles } from "./styles/FourChoices.styles";

const FourChoices = () => {
  const {
    fourChoicesState,
    isModalOpen,
    mode,
    fourChoicesRecord,
    handleEnterKey,
    handleReset,
    closeModal,
  } = useFourChoices();

  return (
    <Box sx={fourChoicesStyles.boxContainer}>
      <Grid container sx={fourChoicesStyles.gridContainer}>
        <Grid item xs={12} md={8} sx={fourChoicesStyles.leftSideContainer}>
          <Grid container id="wordsContainer" sx={{ width: "100%" }}>
            <Grid item xs={12} sx={{ ...fourChoicesStyles.ecuationContainer }}>
              {fourChoicesState.definition || (
                <Loop
                  fontSize="large"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  onClick={() => handleReset()}
                />
              )}
            </Grid>
          </Grid>
          <Grid
            sx={{ ...fourChoicesStyles.inputContainer }}
            display={"flex"}
            container
          >
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
                    sx={{
                      bgcolor: `${
                        !fourChoicesState.sendedAnswer
                          ? "#0288d1"
                          : item === fourChoicesState.answerText
                          ? "#4caf50"
                          : "#f44336"
                      }`,
                      "&:hover": {
                        bgcolor: `${
                          !fourChoicesState.sendedAnswer
                            ? "#0288d1"
                            : item.toLowerCase() ===
                              fourChoicesState.answerText.toLowerCase()
                            ? "#4caf50"
                            : "#f44336"
                        }`,
                      },
                    }}
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
          sx={fourChoicesStyles.rightSideContainer}
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
                  style={fourChoicesStyles.progressStyle}
                  percent={100 - 100 * (fourChoicesState.timer / 60)}
                  format={() =>
                    `${Math.floor(fourChoicesState.timer / 60)}:${
                      fourChoicesState.timer % 60 < 10
                        ? "0" + (fourChoicesState.timer % 60)
                        : fourChoicesState.timer % 60
                    }`
                  }
                />
              </ConfigProvider>
            </Col>
          </Grid>
          <Grid sx={{ width: "75%", mb: 3 }}>
            <Grid display={"flex"} sx={{ justifyContent: "space-between" }}>
              <Typography variant="h6">Record: </Typography>
              <Typography variant="h6">{fourChoicesRecord}</Typography>
            </Grid>
            <Divider />
            <Grid display={"flex"} sx={{ justifyContent: "space-between" }}>
              <Typography variant="h6">Puntuación Actual: </Typography>
              <Typography variant="h6">
                {fourChoicesState.correctAnswers -
                  fourChoicesState.incorrectAnswers}
              </Typography>
            </Grid>
          </Grid>
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
