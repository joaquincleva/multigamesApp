import { useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import gameData from "../gameData/gameData.json";
import { useDispatch, useSelector } from "react-redux";
import {
  setMechanographyScore,
  setMechanographyStats,
} from "../../../redux/states/mechanographyState";
import { AppStore } from "../../../redux/store";
import { handleLocalStorage } from "../../../utils/handleLocalStorage";

export interface mechanographyGame {
  activeTimer: boolean;
  timer: number;
  wordsArray: string[];
  responseText: string;
  current: number;
  answerArray: number[];
  lines: number;
  runningGame: boolean;
  previousRecord: number;
  reset: boolean;
}

const useMechanography = () => {
  //Variables
  const { i18n } = useTranslation();
  const mode = useTheme().palette.mode;
  const dispatch = useDispatch();
  const mechanographyStats = useSelector(
    (state: AppStore) => state.mechanography
  );
  const mechanographyRecord = mechanographyStats.max;

  //States

  const [mechanographyGameState, setMechanographyGameState] =
    useState<mechanographyGame>({
      activeTimer: false,
      timer: 60,
      wordsArray: [],
      responseText: "",
      current: 0,
      answerArray: [],
      previousRecord: -Infinity,
      lines: 0,
      runningGame: true,
      reset: true,
    });

  const [isModalOpen, setIsModalOpen] = useState(false);

  //Functions
  const isLastSpanInLine = () => {
    const spans = document.querySelectorAll("#wordsContainer span");
    const currentSpan = spans[mechanographyGameState.current - 1];
    const nextSpan = spans[mechanographyGameState.current];

    if (currentSpan && nextSpan) {
      const currentSpanRect = currentSpan.getBoundingClientRect();
      const nextSpanRect = nextSpan.getBoundingClientRect();
      return currentSpanRect.bottom !== nextSpanRect.bottom;
    }
    return false;
  };

  const decrementTimer = useCallback(() => {
    if (mechanographyGameState.activeTimer) {
      setMechanographyGameState((prevState) => ({
        ...prevState,
        timer: mechanographyGameState.timer - 1,
      }));
    }
  }, [mechanographyGameState.activeTimer, mechanographyGameState.timer]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEnterKey = (inputText: string) => {
    if (inputText == " " && mechanographyGameState.responseText.length == 0) {
      setMechanographyGameState((prevState) => ({
        ...prevState,
        responseText: "",
      }));
      return;
    }
    if (
      (inputText == " " || inputText == "Enter") &&
      mechanographyGameState.responseText.trim().length > 0
    ) {
      if (
        mechanographyGameState.wordsArray[mechanographyGameState.current] ==
        mechanographyGameState.responseText
      ) {
        setMechanographyGameState((prevState) => ({
          ...prevState,
          answerArray: [
            ...mechanographyGameState.answerArray,
            (mechanographyGameState.answerArray[
              mechanographyGameState.current
            ] = 1),
          ],
        }));
      } else {
        setMechanographyGameState((prevState) => ({
          ...prevState,
          answerArray: [
            ...mechanographyGameState.answerArray,
            (mechanographyGameState.answerArray[
              mechanographyGameState.current
            ] = 0),
          ],
        }));
      }

      setMechanographyGameState((prevState) => ({
        ...prevState,
        current: mechanographyGameState.current + 1,
        responseText: "",
      }));
    }
  };

  const handleReset = () => {
    setMechanographyGameState((prevState) => ({
      ...prevState,
      current: 0,
      timer: 60,
      lines: 0,
      activeTimer: false,
      reset: !mechanographyGameState.reset,
      runningGame: true,
      responseText: "",
      answerArray: [],
    }));
  };

  //Effects

  useEffect(() => {
    if (mechanographyStats.results.length != 0) {
      handleLocalStorage("set", "mechanography", mechanographyStats);
    }
  }, [mechanographyStats]);

  useEffect(() => {
    const localStorageRecord = handleLocalStorage("get", "mechanography");
    if (localStorageRecord) {
      dispatch(setMechanographyStats(JSON.parse(localStorageRecord)));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLastSpanInLine()) {
      setMechanographyGameState((prevState) => ({
        ...prevState,
        lines: mechanographyGameState.lines + 1,
      }));
    }
    //eslint-disable-next-line
  }, [mechanographyGameState.current]);

  useEffect(() => {
    if (mechanographyGameState.timer <= 0) {
      const localStorageRecord = window.localStorage.getItem("mechanography");
      const parsedRecord = localStorageRecord
        ? JSON.parse(localStorageRecord)
        : {};

      setMechanographyGameState((prevState) => ({
        ...prevState,
        activeTimer: false,
        runningGame: false,
        timer: 60,
        previousRecord: Number(parsedRecord?.max || -Infinity),
      }));

      dispatch(
        setMechanographyScore(
          mechanographyGameState.answerArray.reduce(
            (acc, val) => acc + val,
            0
          ) -
            mechanographyGameState.answerArray
              .slice(0, mechanographyGameState.current + 1)
              .filter((num) => num === 0).length
        )
      );

      setIsModalOpen(true);
      return;
    }
    const timeoutFunction = setInterval(decrementTimer, 1000);
    return () => clearInterval(timeoutFunction);
    //eslint-disable-next-line
  }, [decrementTimer, mechanographyGameState.timer]);

  useEffect(() => {
    const data =
      i18n.language === "fr" ? gameData.spanishWords : gameData.englishWords;
    const array: string[] = [];
    for (let i = 0; i < 1000; i++) {
      array.push(data[Math.floor(Math.random() * data.length)]);
    }
    setMechanographyGameState((prevState) => ({
      ...prevState,
      wordsArray: array,
    }));
    //eslint-disable-next-line
  }, [mechanographyGameState.reset, i18n.language]);

  useEffect(() => {
    handleReset();
    //eslint-disable-next-line
  }, [i18n.language]);

  return {
    mode,
    mechanographyGameState,
    setMechanographyGameState,
    isModalOpen,
    setIsModalOpen,
    isLastSpanInLine,
    closeModal,
    handleEnterKey,
    handleReset,
    mechanographyRecord,
  };
};

export default useMechanography;
