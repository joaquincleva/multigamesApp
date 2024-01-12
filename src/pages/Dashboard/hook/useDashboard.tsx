import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { handleLocalStorage } from "../../../utils/handleLocalStorage";
import { setMathGameStats } from "../../../redux/states/mathGameState";
import { setFourChoicesStats } from "../../../redux/states/fourChoicesState";
import { setRoscoStats } from "../../../redux/states/roscoReduxState";
import { setMechanographyStats } from "../../../redux/states/mechanographyState";
import {
  dayNamesSp,
  dayNamesEn,
  getLastDaysData,
  getLastMonthsData,
  getLastWeeksData,
  monthNamesEn,
  monthNamesSp,
} from "../utils/datesFunctions";
import { useTranslation } from "react-i18next";

export interface minMax {
  max: number;
  min: number;
}

interface recordsScoreType {
  mechanography: minMax;
  mathGame: minMax;
  fourChoices: minMax;
  rosco: minMax;
}

interface dashboardStateType {
  dateFrame: string;
  mathGameData: any;
  roscoData: any;
  mechanographyData: any;
  fourChoicesData: any;
  recordsScore: recordsScoreType;
}

const useDashboard = () => {
  //Variables

  const reduxData = useSelector((state: AppStore) => state);
  const dispatch = useDispatch();
  const { mode } = useTheme().palette;
  const { t, i18n } = useTranslation();

  //States

  const [dashboardState, setDashboardState] = useState<dashboardStateType>({
    dateFrame: "days",
    mathGameData: undefined,
    roscoData: undefined,
    mechanographyData: undefined,
    fourChoicesData: undefined,
    recordsScore: {
      mechanography: { max: 0, min: 0 },
      mathGame: { max: 0, min: 0 },
      fourChoices: { max: 0, min: 0 },
      rosco: { max: 0, min: 0 },
    },
  });

  //Functions

  function filterData(data: any) {
    const currentDate = new Date();
    const transformedData = data.map((item: any) => ({
      date: new Date(item.date),
      score: item.score,
    }));

    let result: any[];

    const dayNames = i18n.language === "en" ? dayNamesEn : dayNamesSp;
    const monthNames = i18n.language === "en" ? monthNamesEn : monthNamesSp;

    switch (dashboardState.dateFrame) {
      case "days":
        result = getLastDaysData(transformedData, currentDate, dayNames, 8);
        break;
      case "weeks":
        result = getLastWeeksData(transformedData, currentDate, dayNames, 4);
        break;
      case "months":
        result = getLastMonthsData(transformedData, monthNames);
        break;
      default:
        result = [];
    }
    console.log(result);
    
    return [["", ""], ...result];
  }

  //Effects

  useEffect(() => {
    const localStorageRoscoRecord = handleLocalStorage("get", "rosco");
    if (localStorageRoscoRecord) {
      const parsedData = JSON.parse(localStorageRoscoRecord);
      dispatch(setRoscoStats(parsedData));
      setDashboardState((prevState) => ({
        ...prevState,
        roscoData: filterData(parsedData.results),
        recordsScore: {
          ...prevState.recordsScore,
          rosco: {
            max: parsedData.max,
            min: parsedData.min,
          },
        },
      }));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const localStorageMechanographyRecord = handleLocalStorage(
      "get",
      "mechanography"
    );
    if (localStorageMechanographyRecord) {
      const parsedData = JSON.parse(localStorageMechanographyRecord);
      dispatch(setMechanographyStats(parsedData));
      setDashboardState((prevState) => ({
        ...prevState,
        mechanographyData: filterData(parsedData.results),
        recordsScore: {
          ...prevState.recordsScore,
          mechanography: {
            max: parsedData.max,
            min: parsedData.min,
          },
        },
      }));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const localStorageFourChoicesRecord = handleLocalStorage(
      "get",
      "fourChoices"
    );
    if (localStorageFourChoicesRecord) {
      const parsedData = JSON.parse(localStorageFourChoicesRecord);
      console.log(parsedData);
      
      dispatch(setFourChoicesStats(parsedData));
      setDashboardState((prevState) => ({
        ...prevState,
        fourChoicesData: filterData(parsedData.results),
        recordsScore: {
          ...prevState.recordsScore,
          fourChoices: {
            max: parsedData.max,
            min: parsedData.min,
          },
        },
      }));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const localStorageMathGameRecord = handleLocalStorage("get", "mathGame");
    if (localStorageMathGameRecord) {
      const parsedData = JSON.parse(localStorageMathGameRecord);
      dispatch(setMathGameStats(parsedData));
      setDashboardState((prevState) => ({
        ...prevState,
        mathGameData: filterData(parsedData.results),
        recordsScore: {
          ...prevState.recordsScore,
          mathGame: {
            max: parsedData.max,
            min: parsedData.min,
          },
        },
      }));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (dashboardState.mathGameData) {
      setDashboardState((prevState) => ({
        ...prevState,
        mathGameData: filterData(reduxData.mathGame.results),
      }));
    }
    if (dashboardState.fourChoicesData) {
      setDashboardState((prevState) => ({
        ...prevState,
        fourChoicesData: filterData(reduxData.fourChoices.results),
      }));
    }
    if (dashboardState.mechanographyData) {
      setDashboardState((prevState) => ({
        ...prevState,
        mechanographyData: filterData(reduxData.mechanography.results),
      }));
    }
    if (dashboardState.roscoData) {
      setDashboardState((prevState) => ({
        ...prevState,
        roscoData: filterData(reduxData.roscoReduxState.results),
      }));
    }
    //eslint-disable-next-line
  }, [dashboardState.dateFrame]);

  return {
    reduxData,
    dashboardState,
    setDashboardState,
    mode,
    t,
  };
};

export default useDashboard;
