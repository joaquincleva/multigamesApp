import { useTheme } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";
import {
  setFourChoicesScore,
  setFourChoicesStats,
} from "../../../redux/states/fourChoicesState";
import { handleLocalStorage } from "../../../utils/handleLocalStorage";
import gameData from "../gameData/gameData.json";
import { useTranslation } from "react-i18next";

interface WordData {
  [key: string]:
    | {
        definition: string;
        incorrectWords: string[];
      }
    | undefined;
}

interface FourChoicesStateProps {
  runningGame: boolean;
  current: number;
  responseText: string;
  activeTimer: boolean;
  timer: number;
  isModalOpen: boolean;
  reset: boolean;
  definition: string;
  correctAnswers: number;
  incorrectAnswers: number;
  answerText: string;
  sendedAnswer: boolean;
  fourWords: string[];
  previousRecord: number;
  pastWords: string[];
}

const useFourChoicesGame = () => {
  //Variables
  const mode = useTheme().palette.mode;
  const dispatch = useDispatch();

  const { i18n } = useTranslation();

  const fourChoicesStats = useSelector((state: AppStore) => state.fourChoices);
  const fourChoicesRecord = fourChoicesStats.max;

  //States
  const [fourChoicesState, setFourChoicesState] =
    useState<FourChoicesStateProps>({
      runningGame: true,
      current: 0,
      responseText: "",
      activeTimer: false,
      timer: 60,
      isModalOpen: false,
      reset: false,
      definition: "",
      correctAnswers: 0,
      incorrectAnswers: 0,
      answerText: "",
      sendedAnswer: false,
      fourWords: [],
      previousRecord: -Infinity,
      pastWords: [],
    });

  const [isModalOpen, setIsModalOpen] = useState(false);

  //Functions
  const decrementTimer = useCallback(() => {
    if (fourChoicesState.activeTimer) {
      setFourChoicesState((prevState) => ({
        ...prevState,
        timer: fourChoicesState.timer - 1,
      }));
    }
  }, [fourChoicesState.activeTimer, fourChoicesState.timer]);

  const handleEnterKey = (inputText: string) => {
    if (fourChoicesState.answerText === inputText) {
      setFourChoicesState((prevState) => ({
        ...prevState,
        correctAnswers: fourChoicesState.correctAnswers + 1,
        activeTimer: true,
        sendedAnswer: true,
      }));
    } else {
      setFourChoicesState((prevState) => ({
        ...prevState,
        incorrectAnswers: fourChoicesState.incorrectAnswers + 1,
        activeTimer: true,
        sendedAnswer: true,
      }));
    }
    const timeoutId = setTimeout(() => {
      setFourChoicesState((prevState) => ({
        ...prevState,
        answerText: "",
        current: fourChoicesState.current + 1,
        sendedAnswer: false,
      }));
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleReset = () => {
    setFourChoicesState((prevState) => ({
      ...prevState,
      current: 0,
      timer: 60,
      activeTimer: false,
      reset: !fourChoicesState.reset,
      correctAnswers: 0,
      incorrectAnswers: 0,
      runningGame: true,
      responseText: "",
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Effects

  useEffect(() => {
    if (fourChoicesState.timer <= 0) {
      dispatch(
        setFourChoicesScore(
          fourChoicesState.correctAnswers - fourChoicesState.incorrectAnswers
        )
      );

      setFourChoicesState((prevState) => ({
        ...prevState,
        activeTimer: false,
        runningGame: false,
        timer: 60,
        definition: "",
      }));
      const localStorageRecord = window.localStorage.getItem("fourChoices");
      const parsedRecord = localStorageRecord
        ? JSON.parse(localStorageRecord)
        : {};

      setFourChoicesState((prevState) => ({
        ...prevState,
        previousRecord: Number(parsedRecord?.max || -Infinity),
      }));
      setFourChoicesState((prevState) => ({
        ...prevState,
        isModalOpen: true,
      }));
      setIsModalOpen(true);
      return;
    }
    const timeoutFunction = setInterval(decrementTimer, 1000);
    return () => clearInterval(timeoutFunction);
    //eslint-disable-next-line
  }, [decrementTimer, fourChoicesState.timer, i18n.language]);

  useEffect(() => {
    if (fourChoicesStats.results.length != 0) {
      console.log(fourChoicesStats);
      handleLocalStorage("set", "fourChoices", fourChoicesStats);
    }
  }, [fourChoicesStats]);

  useEffect(() => {
    const localStorageRecord = handleLocalStorage("get", "fourChoices");
    if (localStorageRecord) {
      dispatch(setFourChoicesStats(JSON.parse(localStorageRecord)));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const data: WordData[] =
      i18n.language === "fr" ? gameData.spanishWords : gameData.englishWords;
    let boolean = true;

    while (boolean) {
      const randomElement = data[Math.floor(Math.random() * data.length)];
      if (randomElement) {
        const palabraClave = Object.keys(randomElement)[0];
        if (fourChoicesState.pastWords.includes(palabraClave)) {
          continue;
        }

        const definition = randomElement[palabraClave]?.definition;
        if (definition) {
          const incorrectWords = randomElement[palabraClave]?.incorrectWords;
          if (incorrectWords) {
            const cuatroPalabrasAleatorias = [palabraClave, ...incorrectWords];
            cuatroPalabrasAleatorias.sort(() => Math.random() - 0.5);
            setFourChoicesState((prevState) => ({
              ...prevState,
              answerText: palabraClave,
              definition: definition,
              fourWords: cuatroPalabrasAleatorias,
              pastWord: [...fourChoicesState.pastWords, palabraClave],
            }));
          }
        }
        boolean = false;
      }
    }
    //eslint-disable-next-line
  }, [fourChoicesState.current, fourChoicesState.reset]);

  useEffect(() => {
    handleReset();
    //eslint-disable-next-line
  }, [i18n.language]);

  return {
    fourChoicesState,
    setFourChoicesState,
    isModalOpen,
    setIsModalOpen,
    mode,
    fourChoicesStats,
    fourChoicesRecord,
    handleEnterKey,
    handleReset,
    closeModal,
  };
};

export default useFourChoicesGame;
