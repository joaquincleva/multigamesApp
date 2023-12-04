export const mathGameStyles = (backgroundColor: string = "") => {
  return {
    ecuationContainer: {
      fontSize: "2em",
      border: "3px solid #8eb6d8",
      borderRadius: "5px",
      position: "relative",
      height: "4em",
      boxSizing: "border-box",
      fontFamily: "Times New Roman, Times, serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      animation: "back",
      borderColor: `${backgroundColor}`,
    },
    inputContainer: {
      width: "100%",
      margin: "0px",
      display: "flex",
      gap: 2,
      mt: 2,
    },
    resetButtonInArrayText: { "&:hover": { cursor: "pointer" } },
    input: { width: "100%", textAlign: "center" },
  };
};
