export const commonStyles = (mode: string = "") => {
  return {
    boxContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
    },
    gridContainer: {
      display: "flex",
      width: "95%",
      height: "80vh",
      flexDirection: "row",
    },
    displayFlex: {
      display: "flex",
    },
    width100: {
      width: "100%",
    },
    colorMode: {
      color: `${mode == "light" ? "black" : "white"}`,
    },
    leftSideContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      marginTop: "10px",
      width: "100%",
    },
    resetButtonSmall: {
      borderRadius: "5px",
      width: "15%",
    },
    rightSideContainer: {
      marginTop: "10px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      justifyItems: "center",
      justifyContent: "space-around",
    },
    progressStyle: {
      display: "flex",
      color: "#fff",
    },
  };
};
