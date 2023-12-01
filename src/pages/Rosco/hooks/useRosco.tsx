import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";
import roscoGameData from "../gameData/gameData.json";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";
import {
  setRoscoScore,
  setRoscoStats,
} from "../../../redux/states/roscoReduxState";
import { handleLocalStorage } from "../../../utils/handleLocalStorage";

export interface RoscoGame {
  counter: number;
  correctAnswers: number;
  incorrectAnswers: number;
  responseText: string;
  activeTimer: boolean;
  timer: number;
  answerText: string;
  definition: string;
  message: string;
  antonyms: string[];
  synonyms: string[];
  previousRecord: number;
  disableAntonyms: boolean;
  disableSynonyms: boolean;
  disableLettersQty: boolean;
  resultsArray: string[];
}

const useRosco = () => {
  //Variables
  const mode = useTheme().palette.mode;
  const { i18n } = useTranslation();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const roscoReduxStats = useSelector(
    (state: AppStore) => state.roscoReduxState
  );
  const roscoRecord = roscoReduxStats.max;
  const dispatch = useDispatch();

  useEffect(() => {
    if (roscoReduxStats.results.length != 0) {
      handleLocalStorage("set", "rosco", roscoReduxStats);
    }
  }, [roscoReduxStats]);

  useEffect(() => {
    const localStorageRecord = handleLocalStorage("get", "rosco");
    if (localStorageRecord) {
      dispatch(setRoscoStats(JSON.parse(localStorageRecord)));
    }
    //eslint-disable-next-line
  }, []);

  //States
  const [roscoGameState, setRoscoGameState] = useState<RoscoGame>({
    counter: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    responseText: "",
    activeTimer: false,
    timer: 300,
    answerText: "",
    definition: "",
    message: "",
    previousRecord: -Infinity,
    antonyms: [],
    synonyms: [],
    disableAntonyms: false,
    disableSynonyms: false,
    disableLettersQty: false,
    resultsArray: [],
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Functions

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const closeModal = () => {
    setRoscoGameState((prevState) => ({
      ...prevState,
      timer: 300,
      counter: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      disableAntonyms: false,
      disableSynonyms: false,
      disableLettersQty: false,
    }));
    setIsModalOpen(false);
  };

  const handleSnackbar = (mensaje: string) => () => {
    if (roscoGameState.activeTimer) {
      if (mensaje == "antonyms") {
        const str1 =
          roscoGameState.antonyms[0].charAt(0).toUpperCase() +
          roscoGameState.antonyms[0].slice(1);
        const str2 =
          roscoGameState.antonyms[1].charAt(0).toUpperCase() +
          roscoGameState.antonyms[1].slice(1);
        setRoscoGameState((prevState) => ({
          ...prevState,
          message: "Antonimos: " + str1 + ", " + str2,
          disableAntonyms: true,
        }));
      }
      if (mensaje == "synonyms") {
        const str1 =
          roscoGameState.synonyms[0].charAt(0).toUpperCase() +
          roscoGameState.synonyms[0].slice(1);
        const str2 =
          roscoGameState.synonyms[1].charAt(0).toUpperCase() +
          roscoGameState.synonyms[1].slice(1);
        setRoscoGameState((prevState) => ({
          ...prevState,
          message: "Sinonimos: " + str1 + ", " + str2,
          disableSynonyms: true,
        }));
      }
      if (mensaje == "letterQty") {
        setRoscoGameState((prevState) => ({
          ...prevState,
          message: "Cantidad de letras: " + roscoGameState.answerText.length,
          disableLettersQty: true,
        }));
      }
      if (roscoGameState.timer > 5) {
        setRoscoGameState((prevState) => ({
          ...prevState,
          timer: roscoGameState.timer - 5,
        }));
        setOpenSnackbar(true);
      }
    }
  };

  const decrementTimer = useCallback(() => {
    if (roscoGameState.activeTimer) {
      setRoscoGameState((prevState) => ({
        ...prevState,
        timer: roscoGameState.timer - 1,
      }));
    }
  }, [roscoGameState.activeTimer, roscoGameState.timer]);

  const handleEnterKey = (key: string) => {
    if (roscoGameState.activeTimer) {
      if (key == "Enter" && roscoGameState.responseText.trim().length > 0) {
        if (
          roscoGameState.answerText
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") ==
          roscoGameState.responseText
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        ) {
          roscoGameState.resultsArray[roscoGameState.counter] = "#4caf50";
          setRoscoGameState((prevState) => ({
            ...prevState,
            counter: roscoGameState.counter + 1,
            responseText: "",
            correctAnswers: roscoGameState.correctAnswers + 1,
          }));
        } else {
          roscoGameState.resultsArray[roscoGameState.counter] = "#f44336";
          setRoscoGameState((prevState) => ({
            ...prevState,
            counter: roscoGameState.counter + 1,
            responseText: "",
            incorrectAnswers: roscoGameState.incorrectAnswers + 1,
          }));
        }
      } else if (key == "Escape") {
        setRoscoGameState((prevState) => ({
          ...prevState,
          responseText: "",
        }));
      }
    }
  };

  //Effects
  useEffect(() => {
    let array = [...roscoGameState.resultsArray];
    if (!roscoGameState.counter) {
      for (let i = 0; i < 26; i++) {
        array[i] = "#2979ff";
      }
      array[0] = "#ffeb3b";
      setRoscoGameState((prevState) => ({
        ...prevState,
        resultsArray: array,
      }));
    }
    if (roscoGameState.counter) {
      array = [...roscoGameState.resultsArray];
      array[roscoGameState.counter] = "#ffeb3b";
      setRoscoGameState((prevState) => ({
        ...prevState,
        resultsArray: array,
      }));
    }
    //eslint-disable-next-line
  }, [roscoGameState.counter]);

  useEffect(() => {
    if (roscoGameState.timer <= 0) {
      setRoscoGameState((prevState) => ({
        ...prevState,
        activeTimer: false,
        counter: 26,
      }));
      setIsModalOpen(true);
      return;
    }
    const timeoutFunction = setInterval(decrementTimer, 1000);
    return () => clearInterval(timeoutFunction);
    //eslint-disable-next-line
  }, [decrementTimer, roscoGameState.timer]);

  useEffect(() => {
    if (roscoGameState.counter == 26) {
      const localStorageRecord = window.localStorage.getItem("rosco");
      const parsedRecord = localStorageRecord
        ? JSON.parse(localStorageRecord)
        : {};
      const previousRecord = parsedRecord?.max;
      setRoscoGameState((prevState) => ({
        ...prevState,
        activeTimer: false,
        counter: 27,
        previousRecord: previousRecord || -Infinity,
      }));
      dispatch(
        setRoscoScore(
          (roscoGameState.correctAnswers == 26 ? 30 : 0) +
            roscoGameState.correctAnswers -
            (Number(roscoGameState.disableAntonyms) +
              Number(roscoGameState.disableSynonyms) +
              Number(roscoGameState.disableLettersQty)) -
            roscoGameState.incorrectAnswers
        )
      );
      setIsModalOpen(true);
    } else if (roscoGameState.activeTimer && (roscoGameState.counter != 27)) {
      let data = [];
      const random = Math.floor(Math.random() * 4);
      data =
        i18n.language === "fr"
          ? roscoGameData.spanishData
          : roscoGameData.englishData;
      const letter = data[roscoGameState.counter];
      const word = letter[random];
      setRoscoGameState((prevState) => ({
        ...prevState,
        answerText: Object.keys(word)[0],
        definition: Object.values(word)[0].definition,
        antonyms: Object.values(word)[0].antonyms,
        synonyms: Object.values(word)[0].synonyms,
      }));
    }
    //eslint-disable-next-line
  }, [roscoGameState.counter, i18n.language, roscoGameState.activeTimer]);

  useEffect(() => {
      setRoscoGameState((prevState) => ({
        ...prevState,
        activeTimer: false,
        timer: 300,
        counter: 0,
      }));
    //eslint-disable-next-line
  }, [i18n.language]);

  return {
    roscoGameState,
    setRoscoGameState,
    mode,
    alphabet,
    openSnackbar,
    setOpenSnackbar,
    isModalOpen,
    closeModal,
    handleSnackbar,
    handleEnterKey,
    roscoRecord,
    handleCloseSnackbar,
  };
};

export default useRosco;
