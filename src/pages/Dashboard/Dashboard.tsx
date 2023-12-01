import { Chart } from "react-google-charts";
import {
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { setMathGameStats } from "../../redux/states/mathGameState";
import { handleLocalStorage } from "../../utils/handleLocalStorage";
import { setFourChoicesStats } from "../../redux/states/fourChoicesState";
import { setRoscoStats } from "../../redux/states/roscoReduxState";
import { setMechanographyStats } from "../../redux/states/mechanographyState";
import {
  BrightnessAuto,
  Calculate,
  Flaky,
  Keyboard,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

interface minMax {
  max: number;
  min: number;
}

interface recordsScoreType {
  mechanography: minMax;
  mathGame: minMax;
  fourChoices: minMax;
  rosco: minMax;
}

export default function Dashboard() {
  const reduxData = useSelector((state: AppStore) => state);

  const dispatch = useDispatch();

  const [dateFrame, setDateFrame] = useState<string>("days");
  const [mathGameData, setMathGameData] = useState<any>();
  const [roscoData, setRoscoData] = useState<any>();
  const [mechanographyData, setMechanographyData] = useState<any>();
  const [fourChoicesData, setFourChoicesData] = useState<any>();
  const [recordsScore, setRecordsScore] = useState<recordsScoreType>({
    mechanography: { max: 0, min: 0 },
    mathGame: { max: 0, min: 0 },
    fourChoices: { max: 0, min: 0 },
    rosco: { max: 0, min: 0 },
  });

  function getLastWeeksData(
    data: any,
    currentDate: Date,
    _: string[],
    count: number
  ) {
    return Array.from({ length: count }, (_, index) => {
      const startDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - (index + 1) * 7); // Restar semanas completas
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() - index * 7); // Fin de la semana actual

      const weekData = data.filter((item: any) => {
        const itemDate = item.date;
        return itemDate >= startDate && itemDate < endDate;
      });

      const weekLabel = `Semana ${4 - index}`;

      if (weekData.length > 0) {
        const maxScore = Math.max(...weekData.map((item: any) => item.score));
        return [weekLabel, maxScore];
      } else {
        return [weekLabel, null];
      }
    }).reverse();
  }

  function getLastMonthsData(
    data: any,
    currentDate: Date,
    monthNames: string[],
    count: number
  ) {
    return Array.from({ length: count }, (_, index) => {
      const startDate = new Date(currentDate);
      startDate.setMonth(startDate.getMonth() - index);
      const endDate = new Date(currentDate);
      endDate.setMonth(endDate.getMonth() - (index - 1));

      const monthData = data.filter((item: any) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate < endDate;
      });

      const monthLabel = monthNames[currentDate.getMonth() - index];

      if (monthData.length > 0) {
        const maxScore = Math.max(...monthData.map((item: any) => item.score));
        return [monthLabel, maxScore];
      } else {
        return [monthLabel, null];
      }
    }).reverse();
  }

  
  const {mode} = useTheme().palette

  const currentDate = new Date();
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
  

  function filterData(data: any) {
    const transformedData = data.map((item: any) => ({
      date: new Date(item.date),
      score: item.score,
    }));

    let result: any[];


    switch (dateFrame) {
      case "days":
        result = getLastDaysData(transformedData, currentDate, dayNames, 8);
        break;
      case "weeks":
        result = getLastWeeksData(transformedData, currentDate, dayNames, 4);
        break;
      case "months":
        result = getLastMonthsData(transformedData, currentDate, monthNames, 5);
        break;
      default:
        result = [];
    }
    return [["", ""], ...result];
  }

  function getLastDaysData(
    data: any,
    currentDate: Date,
    dayNames: string[],
    count: number
  ) {
    return Array.from({ length: count }, (_, index) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - index);
      const formattedDate = date.toLocaleDateString();
      const dayName = dayNames[date.getDay()];
      const dayData = data.filter(
        (item: any) => item.date.toLocaleDateString() === formattedDate
      );

      if (dayData.length > 0) {
        const maxScore = Math.max(...dayData.map((item: any) => item.score));
        return [dayName, maxScore];
      } else {
        return [dayName, null];
      }
    }).reverse();
  }

  useEffect(() => {
    const localStorageRecord = handleLocalStorage("get", "mathGame");
    if (localStorageRecord) {
      const parsedData = JSON.parse(localStorageRecord);
      dispatch(setMathGameStats(parsedData));
      setMathGameData(filterData(parsedData.results));
      setRecordsScore((prevState) => ({
        ...prevState,
        mathGame: {
          max: parsedData.max,
          min: parsedData.min,
        },
      }));
    }
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const localStorageRecord = handleLocalStorage("get", "fourChoices");
    if (localStorageRecord) {
      const parsedData = JSON.parse(localStorageRecord);
      dispatch(setFourChoicesStats(parsedData));
      setFourChoicesData(filterData(parsedData.results));
      setRecordsScore((prevState) => ({
        ...prevState,
        fourChoices: {
          max: parsedData.max,
          min: parsedData.min,
        },
      }));
    }
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const localStorageRecord = handleLocalStorage("get", "rosco");
    if (localStorageRecord) {
      const parsedData = JSON.parse(localStorageRecord);
      dispatch(setRoscoStats(parsedData));
      setRoscoData(filterData(parsedData.results));
      setRecordsScore((prevState) => ({
        ...prevState,
        rosco: {
          max: parsedData.max,
          min: parsedData.min,
        },
      }));
    }
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const localStorageRecord = handleLocalStorage("get", "mechanography");
    if (localStorageRecord) {
      const parsedData = JSON.parse(localStorageRecord);
      dispatch(setMechanographyStats(parsedData));
      setMechanographyData(filterData(parsedData.results));
      setRecordsScore((prevState) => ({
        ...prevState,
        mechanography: {
          max: parsedData.max,
          min: parsedData.min,
        },
      }));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (mathGameData) {
      setMathGameData(filterData(reduxData.mathGame.results));
    }
    if (fourChoicesData) {
      setFourChoicesData(filterData(reduxData.fourChoices.results));
    }
    if (mechanographyData) {
      setMechanographyData(filterData(reduxData.mechanography.results));
    }
    if (roscoData) {
      setRoscoData(filterData(reduxData.roscoReduxState.results));
    }
    //eslint-disable-next-line
  }, [dateFrame]);

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
          display: "flex",
          width: "95%",
          height: "60%",
          flexDirection: "row",
          padding: "15px",
        }}
        gap={1}
      >
        <Grid
          xs={12}
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ paddingLeft: "7px" }} variant="h4">
            Tus puntuaciones
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Range</InputLabel>
            <Select
              value={dateFrame}
              label="Rango"
              onChange={(e) => {
                setDateFrame(e.target.value);
              }}
            >
              <MenuItem value={"days"}>Days</MenuItem>
              <MenuItem value={"weeks"}>Weeks</MenuItem>
              <MenuItem value={"months"}>Months</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          container
          gap={2}
          sx={{ display: "flex", justifyContent: "center" }}
          xs={12}
        >
          {[
            [
              roscoData,
              recordsScore.rosco,
              "Rosco",
              <BrightnessAuto />,
              reduxData.roscoReduxState.results.length,
              "rosco",
            ],
            [
              mechanographyData,
              recordsScore.mechanography,
              "Mechanography",
              <Keyboard />,
              reduxData.mechanography.results.length,
              "mechanography",
            ],
            [
              mathGameData,
              recordsScore.mathGame,
              "Math Game",
              <Calculate />,
              reduxData.mathGame.results.length,
              "mathgame",
            ],
            [
              fourChoicesData,
              recordsScore.fourChoices,
              "Four Choices",
              <Flaky />,
              reduxData.fourChoices.results.length,
              "fourchoices",
            ],
          ].map((item, index) => {
            {
              return item[0] ? (
                <Grid
                  key={index}
                  xs={12}
                  sm={5.8}
                  sx={{
                    borderRadius: "5px",
                    border: "2px solid grey",
                    padding: "15px",
                    "& rect": {
                      fill: `${mode === "dark" ? "#212121 !important" : "#fff !important"}`,
                    },
                    "& text": {
                      fill: `${mode === "dark" ? "#fff !important" : "#212121 !important"}`,
                    },
                  }}
                >
                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid sx={{ display: "flex", alignItems: "center" }}>
                      {item[3]}
                      <Typography variant="h6">{item[2]}</Typography>
                    </Grid>

                    <Grid sx={{ display: "flex", alignItems: "center" }}>
                      <Typography>Partidas: {item[4]}</Typography>
                    </Grid>
                    <Grid sx={{ display: "flex" }} gap={2}>
                      <Typography variant="subtitle1">
                        Max:{" "}
                        <span style={{ fontWeight: 500, color: "#4caf50" }}>
                          {item[1].max}
                        </span>
                      </Typography>
                      <Typography variant="subtitle1">
                        Min:{" "}
                        <span style={{ fontWeight: 500, color: "#f44336" }}>
                          {item[1].min}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Chart
                    chartType="Bar"
                    width="100%"
                    height="110px"
                    data={item[0]}
                    options={{
                      legendtitle: "Company Performance",
                      legend: { position: "none" },
                      colors: ["#ff8800"],
                    }}
                  />
                </Grid>
              ) : (
                <Grid
                  key={index}
                  xs={12}
                  sm={5.8}
                  sx={{
                    borderRadius: "5px",
                    border: "2px solid grey",
                    padding: "15px",
                    height: "30vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="caption">
                    Aun no tienes partidas en el juego {item[2]}
                  </Typography>
                  <NavLink to={`${item[5]}`}>
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        color: `${mode === "dark" ? "white" : "#666"}`
                      }}
                    >
                      <Button sx={{paddingBottom: "3px"}}>
                      {item[3]} <span style={{marginLeft: "5px"}}>Jugar {item[2]}</span></Button>
                    </Grid>
                  </NavLink>
                  <Grid></Grid>
                </Grid>
              );
            }
          })}
        </Grid>
      </Grid>
    </Box>
  );
}
