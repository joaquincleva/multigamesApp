export const fourChoicesStyles = (
  sendedAnswer: boolean = false,
  item: string = "",
  answerText: string = "",
  sendedAnswerLowerCase: string = ""
) => {
  return {
    ecuationContainer: {
      padding: "5px 10px",
      border: "3px solid #8eb6d8",
      fontSize: "1.7em",
      borderRadius: "5px",
      position: "relative",
      height: "5.5em",
      boxSizing: "border-box",
      fontFamily: "Times New Roman, Times, serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      animation: "back",
    },
    inputContainer: { margin: "0px", display: "flex", mt: 1 },
    rightSideContainer: {
      marginTop: "10px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignContent: "space-around",
      justifyContent: "space-around",
    },
    resetButtonInText: {
      bgcolor: `${
        sendedAnswer ? "#0288d1" : item === answerText ? "#4caf50" : "#f44336"
      }`,
      "&:hover": {
        bgcolor: `${
          sendedAnswer
            ? "#0288d1"
            : item.toLowerCase() === sendedAnswerLowerCase
            ? "#4caf50"
            : "#f44336"
        }`,
      },
    },
  };
};
