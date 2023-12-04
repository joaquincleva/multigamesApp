import {
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import {
  BrightnessAuto,
  Calculate,
  Flaky,
  Keyboard,
} from "@mui/icons-material";
import useDashboard from "./hook/useDashboard";
import { dashboardStyles } from "./styles/dashboardStyles.styles";
import StatsCard from "./components/StatsCard";
import EmptyStatsCard from "./components/emptyStatsCard";
import { commonStyles } from "../../styles/commonStyles";

export default function Dashboard() {
  const { reduxData, dashboardState, setDashboardState, mode, t } =
    useDashboard();

  console.log("dashboardState.recordsScore.rosco", dashboardState.roscoData);

  const statsArray = [
    [
      dashboardState.roscoData,
      dashboardState.recordsScore.rosco,
      "Rosco",
      <BrightnessAuto />,
      reduxData.roscoReduxState.results.length,
      "rosco",
    ],
    [
      dashboardState.mechanographyData,
      dashboardState.recordsScore.mechanography,
      "Mechanography",
      <Keyboard />,
      reduxData.mechanography.results.length,
      "mechanography",
    ],
    [
      dashboardState.mathGameData,
      dashboardState.recordsScore.mathGame,
      "Math Game",
      <Calculate />,
      reduxData.mathGame.results.length,
      "mathgame",
    ],
    [
      dashboardState.fourChoicesData,
      dashboardState.recordsScore.fourChoices,
      "Four Choices",
      <Flaky />,
      reduxData.fourChoices.results.length,
      "fourchoices",
    ],
  ];

  return (
    <Box sx={commonStyles().boxContainer}>
      <Grid container sx={dashboardStyles().gridContainer} gap={1}>
        <Grid xs={12} sx={dashboardStyles().titleContainer}>
          <Typography sx={dashboardStyles().title} variant="h4">
            {t("dashboard.score")}
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              {t("dashboard.timeSelect.timeRange")}
            </InputLabel>
            <Select
              value={dashboardState.dateFrame}
              label={t("dashboard.timeSelect.timeRange")}
              onChange={(e) => {
                setDashboardState((prevState) => ({
                  ...prevState,
                  dateFrame: e.target.value,
                }));
              }}
            >
              <MenuItem value={"days"}>
                {t("dashboard.timeSelect.days")}
              </MenuItem>
              <MenuItem value={"weeks"}>
                {t("dashboard.timeSelect.weeks")}
              </MenuItem>
              <MenuItem value={"months"}>
                {t("dashboard.timeSelect.months")}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          container
          gap={2}
          sx={dashboardStyles().statsCardsContainer}
          xs={12}
        >
          {statsArray.map((item, index) => {
            {
              return item[0] ? (
                <StatsCard
                  index={index}
                  mode={mode}
                  name={item[2]}
                  gamesQty={item[4]}
                  icon={item[3]}
                  minMax={item[1]}
                  resultsData={item[0]}
                />
              ) : (
                <EmptyStatsCard
                  icon={item[3]}
                  index={index}
                  mode={mode}
                  name={item[2]}
                  path={item[5]}
                />
              );
            }
          })}
        </Grid>
      </Grid>
    </Box>
  );
}
