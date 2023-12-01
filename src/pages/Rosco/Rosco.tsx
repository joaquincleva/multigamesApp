import { Col, ConfigProvider } from "antd";
import {
  Alert,
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Progress } from "antd";
import { roscoGameStyles } from "./styles/roscoGame.styles";
import HelpButtons from "./components/HelpButtons";
import useRosco from "./hooks/useRosco";
import RoscoModal from "./components/RoscoModal";

const Rosco = () => {
  const {
    roscoGameState,
    setRoscoGameState,
    mode,
    alphabet,
    openSnackbar,
    handleCloseSnackbar,
    isModalOpen,
    closeModal,
    handleSnackbar,
    handleEnterKey,
    roscoRecord,
  } = useRosco();

  return (
    <Box sx={roscoGameStyles.boxContainer}>
      <Grid container sx={roscoGameStyles.gridContainer}>
        <Grid item xs={12} md={3} sx={roscoGameStyles.leftSide}>
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
                  size={window.innerWidth <= 576 ? "small" : 200}
                  success={{ percent: 0, strokeColor: "#fff" }}
                  type="circle"
                  className=""
                  strokeColor={"#0288d1"}
                  trailColor={"lightGrey"}
                  style={{
                    ...roscoGameStyles.progress,
                    zIndex: `${window.innerWidth <= 576 ? 4 : 0}`,
                    right: `${window.innerWidth <= 576 ? "15px" : "0"}`,
                    bottom: `${window.innerWidth <= 576 ? "225px" : "0"}`,
                    position: `${
                      window.innerWidth <= 576 ? "fixed" : "relative"
                    }`,
                  }}
                  percent={100 - 100 * (roscoGameState.timer / 300)}
                  format={() =>
                    `${Math.floor(roscoGameState.timer / 60)}:${
                      roscoGameState.timer % 60 < 10
                        ? "0" + (roscoGameState.timer % 60)
                        : roscoGameState.timer % 60
                    }`
                  }
                />
              </ConfigProvider>
            </Col>
          </Grid>
          <Grid display={"flex"} gap={2}>
            <Avatar
              sx={{
                ...roscoGameStyles,
                bgcolor: `#4caf50`,
              }}
            >
              {roscoGameState.correctAnswers}
            </Avatar>

            <Avatar
              sx={{
                ...roscoGameStyles,
                bgcolor: `#f44336`,
              }}
            >
              {roscoGameState.incorrectAnswers}
            </Avatar>
          </Grid>
          <Grid sx={roscoGameStyles.helpButtons}>
            <HelpButtons
              timer={roscoGameState.timer}
              buttonText="Mostrar Sinónimos"
              disabled={roscoGameState.disableSynonyms}
              handleSnackbar={handleSnackbar}
              handleSnackbarText="synonyms"
            />

            <HelpButtons
              timer={roscoGameState.timer}
              buttonText="Mostrar Antónimos"
              disabled={roscoGameState.disableAntonyms}
              handleSnackbar={handleSnackbar}
              handleSnackbarText="antonyms"
            />

            <HelpButtons
              timer={roscoGameState.timer}
              buttonText="Cantidad de Letras"
              disabled={roscoGameState.disableLettersQty}
              handleSnackbar={handleSnackbar}
              handleSnackbarText="letterQty"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={9} sx={roscoGameStyles.rightSide}>
          <Grid sx={roscoGameStyles.avatarLettersContainer}>
            {alphabet.split("").map((letter, index) => {
              return (
                <Avatar
                  key={index}
                  sx={{
                    ...roscoGameStyles.avatarLetters,
                    bgcolor: `${roscoGameState.resultsArray[index]}`,
                    color: `${
                      index == roscoGameState.counter ? "black" : "white"
                    }`,
                  }}
                >
                  {letter}
                </Avatar>
              );
            })}
          </Grid>
          {roscoGameState.activeTimer && (
            <Typography
              variant="h5"
              style={{
                color: `${mode == "light" ? "black" : "white"}`,
              }}
            >
              {roscoGameState.definition}
            </Typography>
          )}
          {!roscoGameState.activeTimer ? (
            <Button
              sx={roscoGameStyles.startGameButton}
              variant="contained"
              color="success"
              fullWidth
              onClick={() => {
                setRoscoGameState((prevState) => ({
                  ...prevState,
                  activeTimer: true,
                  timer: 300,
                  counter: 0,
                  correctAnswers: 0,
                  incorrectAnswers: 0,
                  disableAntonyms: false,
                  disableSynonyms: false,
                  disableLettersQty: false,
                }));
              }}
            >
              Comenzar Juego
            </Button>
          ) : (
            <Grid sx={{ width: "100%", display: "flex" }} container>
              <Grid item xs={9}>
                <FormControl fullWidth sx={roscoGameStyles.formControl}>
                  <TextField
                    fullWidth
                    placeholder="Ingresar respuesta"
                    value={roscoGameState.responseText}
                    onChange={(e) => {
                      setRoscoGameState((prevState) => ({
                        ...prevState,
                        responseText: e.target.value,
                      }));
                    }}
                    onKeyDown={(e) => {
                      handleEnterKey(e.key);
                    }}
                    inputProps={{
                      style: {
                        ...roscoGameStyles.textFieldInputProps,
                        textAlign: "center",
                      },
                    }}
                    sx={roscoGameStyles.textField}
                  ></TextField>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={() => handleEnterKey("Enter")}
                  sx={{
                    ...roscoGameStyles.checkAnswerButton,
                    fontSize: `${window.innerWidth > 650 && "30px"}`,
                  }}
                >
                  Ingresar
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Snackbar
          sx={roscoGameStyles.snackBar}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={`${roscoGameState.message}`}
          key={"center" + "center"}
        >
          <Alert icon={false} sx={roscoGameStyles.snackbarAlert}>
            {roscoGameState.message}
          </Alert>
        </Snackbar>
        <RoscoModal
          {...{
            isModalOpen,
            roscoGameState,
            closeModal,
            roscoRecord,
          }}
        />
      </Grid>
    </Box>
  );
};

export default Rosco;
