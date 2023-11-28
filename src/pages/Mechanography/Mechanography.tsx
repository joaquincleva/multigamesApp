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
import MechanographyModal from "./components/MechanographyModal";
import useMechanography from "./hook/useMechanography";
import { mechanographyGameStyles } from "./styles/MechanographyGame.styles";

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
  } = useMechanography();

  return (
    <Box sx={mechanographyGameStyles.boxContainer}>
      <Grid container sx={mechanographyGameStyles.gridContainer}>
        <Grid
          item
          xs={12}
          md={8}
          sx={mechanographyGameStyles.leftSideContainer}
        >
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
              sx={mechanographyGameStyles.wordsArrayContainerFather}
            >
              <Grid
                sx={{
                  ...mechanographyGameStyles.wordsArrayContainerChild,
                  bottom: `${mechanographyGameState.lines * 2.175}em`,
                }}
              >
                {mechanographyGameState.wordsArray.map((item, index) => (
                  <span
                    key={index}
                    style={{
                      ...mechanographyGameStyles.wordsArray,
                      backgroundColor: `${
                        index == mechanographyGameState.current &&
                        item == mechanographyGameState.responseText.trim()
                          ? "#6fbf73"
                          : index == mechanographyGameState.current &&
                            !item.startsWith(
                              mechanographyGameState.responseText.trim()
                            )
                          ? "pink"
                          : mode == "dark" &&
                            index == mechanographyGameState.current
                          ? "#333"
                          : mode == "light" &&
                            index == mechanographyGameState.current
                          ? "lightgray"
                          : ""
                      }`,
                      color: `${
                        index == mechanographyGameState.current &&
                        !item.startsWith(
                          mechanographyGameState.responseText.trim()
                        )
                          ? "black"
                          : mechanographyGameState.answerArray[index] === 0
                          ? "#ab003c"
                          : mechanographyGameState.answerArray[index] === 1
                          ? "#357a38"
                          : mode == "dark"
                          ? "white"
                          : "black"
                      }`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ width: "100%", margin: "0px", display: "flex", gap: 2 }}>
            <FormControl
              fullWidth
              sx={{
                display: "flex",
              }}
            >
              <TextField
                disabled={!mechanographyGameState.runningGame}
                fullWidth
                placeholder={`${
                  mechanographyGameState.current == 0 ? "Escribir" : ""
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
                  style: {
                    fontSize: "30px",
                    letterSpacing: "3px",
                  },
                }}
                sx={{ width: "100%" }}
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
          sx={mechanographyGameStyles.rightSideContainer}
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
                  strokeColor={"#2979ff"}
                  trailColor={"lightGrey"}
                  style={mechanographyGameStyles.progressStyle}
                  percent={100 - 100 * (mechanographyGameState.timer / 60)}
                  format={() =>
                    `${Math.floor(mechanographyGameState.timer / 60)}:${
                      mechanographyGameState.timer % 60 < 10
                        ? "0" + (mechanographyGameState.timer % 60)
                        : mechanographyGameState.timer % 60
                    }`
                  }
                />
              </ConfigProvider>
            </Col>
          </Grid>
          <Grid sx={{ width: "75%", mb: 1 }}>
            <Grid display={"flex"} sx={{ justifyContent: "space-between" }}>
              <Typography variant="h6">Record: </Typography>
              <Typography variant="h6">{mechanographyRecord}</Typography>
            </Grid>
            <Divider />
            <Grid display={"flex"} sx={{ justifyContent: "space-between" }}>
              <Typography variant="h6">Puntuación Actual: </Typography>
              <Typography variant="h6">
                {mechanographyGameState.answerArray.reduce(
                  (acc, val) => acc + val,
                  0
                ) -
                  mechanographyGameState.answerArray
                    .slice(0, mechanographyGameState.current + 1)
                    .filter((num) => num === 0).length}
              </Typography>
            </Grid>
          </Grid>
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
      />
    </Box>
  );
};

export default Mechanography;
