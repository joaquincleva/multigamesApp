export const mechanographyGameStyles = (
  lines: number = 0,
  index: number = 0,
  current: number = 0,
  item: string = "",
  responseText: string = "",
  mode: string = "",
  answerArray: any = []
) => {
  return {
    wordsArrayContainerFather: {
      fontSize: "2em",
      lineHeight: "2em",
      border: "1px solid #8eb6d8",
      overflow: "hidden",
      borderRadius: "5px",
      marginBottom: "10px",
      padding: "6px 12px 30px 12px",
      marginTop: "0px",
      position: "relative",
      height: "5em",
      boxSizing: "border-box",
      fontFamily: "Times New Roman, Times, serif",
    },
    wordsArrayContainerChild: {
      display: "flex",
      position: "relative",
      flexDirection: "row",
      color: "#1d4851",
      flexWrap: "wrap",
      padding: "0",
      margin: "0",
      bottom: `${lines * 2.175}em`,
    },
    wordsArray: {
      padding: "3px 5px",
      borderRadius: "5px",
      backgroundColor: `${
        index == current && item == responseText.trim()
          ? "#6fbf73"
          : index == current && !item.startsWith(responseText.trim())
          ? "pink"
          : mode == "dark" && index == current
          ? "#333"
          : mode == "light" && index == current
          ? "lightgray"
          : ""
      }`,
      color: `${
        index == current && !item.startsWith(responseText.trim())
          ? "black"
          : answerArray[index] === 0
          ? "#ab003c"
          : answerArray[index] === 1
          ? "#357a38"
          : mode == "dark"
          ? "white"
          : "black"
      }`,
    },
    formControlContaienr: {
      width: "100%",
      margin: "0px",
      display: "flex",
      gap: 2,
    },
    input: {
      fontSize: "30px",
      letterSpacing: "3px",
    },
  };
};
