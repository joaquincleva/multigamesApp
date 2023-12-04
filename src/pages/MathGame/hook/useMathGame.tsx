import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@redux/store";
import {
  setMathGameScore,
  setMathGameStats,
} from "@redux/states/mathGameState";
import { handleLocalStorage } from "@utils/handleLocalStorage";
import { useTranslation } from "react-i18next";

const useMathGame = () => {
  const [mathGameState, setMathGameState] = useState({
    runningGame: true,
    current: 0,
    responseText: "",
    activeTimer: false,
    timer: 60,
    isModalOpen: false,
    reset: false,
    correctAnswers: 0,
    incorrectAnswers: 0,
    answerText: "",
    answerNumber: 0,
    backgroundColor: "",
    previousRecord: -Infinity,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation()

  const mathGameStats = useSelector((state: AppStore) => state.mathGame);
  const mathGameRecord = mathGameStats.max;

  const decrementTimer = useCallback(() => {
    if (mathGameState.activeTimer) {
      setMathGameState((prevState) => ({
        ...prevState,
        timer: mathGameState.timer - 1,
      }));
    }
  }, [mathGameState.activeTimer, mathGameState.timer]);

  const handleEnterKey = (inputText: string) => {
    if (inputText == "Enter" && mathGameState.responseText.trim().length > 0) {
      if (mathGameState.answerNumber == Number(mathGameState.responseText)) {
        setMathGameState((prevState) => ({
          ...prevState,
          correctAnswers: mathGameState.correctAnswers + 1,
          backgroundColor: "#6fbf73",
        }));
      } else {
        setMathGameState((prevState) => ({
          ...prevState,
          incorrectAnswers: mathGameState.incorrectAnswers + 1,
          backgroundColor: "#f6685e",
        }));
      }
      setMathGameState((prevState) => ({
        ...prevState,
        responseText: "",
        current: mathGameState.current + 1,
      }));
    }

    const timeoutId = setTimeout(() => {
      setMathGameState((prevState) => ({
        ...prevState,
        backgroundColor: "",
      }));
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleReset = () => {
    setMathGameState((prevState) => ({
      ...prevState,
      current: 0,
      timer: 60,
      activeTimer: false,
      reset: !mathGameState.reset,
      correctAnswers: 0,
      incorrectAnswers: 0,
      runningGame: true,
      responseText: "",
    }));
  };

  useEffect(() => {
    if (mathGameState.timer <= 0) {
      dispatch(
        setMathGameScore(
          mathGameState.correctAnswers - mathGameState.incorrectAnswers
        )
      );

      setMathGameState((prevState) => ({
        ...prevState,
        activeTimer: false,
        runningGame: false,
        timer: 60,
      }));
      const localStorageRecord = window.localStorage.getItem("mathGame");
      const parsedRecord = localStorageRecord
        ? JSON.parse(localStorageRecord)
        : {};

      setMathGameState((prevState) => ({
        ...prevState,
        previousRecord: Number(parsedRecord?.max || -Infinity),
      }));
      setMathGameState((prevState) => ({
        ...prevState,
        isModalOpen: true,
      }));
      setIsModalOpen(true);
      return;
    }
    const timeoutFunction = setInterval(decrementTimer, 1000);
    return () => clearInterval(timeoutFunction);
    //eslint-disable-next-line
  }, [decrementTimer, mathGameState.timer]);

  useEffect(() => {
    if (mathGameStats.results.length != 0) {
      handleLocalStorage("set", "mathGame", mathGameStats);
    }
  }, [mathGameStats]);

  useEffect(() => {
    const localStorageRecord = handleLocalStorage("get", "mathGame");
    if (localStorageRecord) {
      dispatch(setMathGameStats(JSON.parse(localStorageRecord)));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    let boolean = true;
    while (boolean) {
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      const num3 = Math.floor(Math.random() * 10);
      const num4 = Math.floor(Math.random() * 10);

      const operators = ["+", "-", "*", "/"];
      const operator1 = operators[Math.floor(Math.random() * operators.length)];
      const operator2 = operators[Math.floor(Math.random() * operators.length)];
      const operator3 = operators[Math.floor(Math.random() * operators.length)];

      const expression = `${num1} ${operator1} ${num2} ${operator2} ${num3} ${operator3} ${num4}`;
      const result = eval(expression);
      if (Number.isInteger(result) && Number.isInteger(result)) {
        boolean = false;
        setMathGameState((prevState) => ({
          ...prevState,
          answerText: expression,
          answerNumber: result,
        }));
      }
    }
    //eslint-disable-next-line
  }, [mathGameState.current]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    mathGameState,
    setMathGameState,
    isModalOpen,
    setIsModalOpen,
    mathGameStats,
    mathGameRecord,
    handleEnterKey,
    handleReset,
    closeModal,
    t
  };
};

export default useMathGame;
