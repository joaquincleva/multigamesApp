export const dashboardStyles = (mode: string = "") => {
  return {
    gridContainer: {
      display: "flex",
      width: "95%",
      height: "60%",
      flexDirection: "row",
      padding: "15px",
    },
    titleContainer: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
    },
    title: { paddingLeft: "7px" },
    statsCardsContainer: { display: "flex", justifyContent: "center" },
    statsCard: {
      borderRadius: "5px",
      border: "2px solid grey",
      padding: "15px",
      "& rect": {
        fill: `${mode === "dark" ? "#212121 !important" : "#fff !important"}`,
      },
      "& text": {
        fill: `${mode === "dark" ? "#fff !important" : "#212121 !important"}`,
      },
      height: "180px"
    },
    statsCardHeader: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "10px",
    },
    statsCardTitle: { display: "flex", alignItems: "center" },
    statsCardGameCount: { display: "flex", alignItems: "center" },
    statsCardMaxScore: { fontWeight: 500, color: "#4caf50" },
    statsCardMinScore: { fontWeight: 500, color: "#f44336" },
    emptyStatsContainer: {
      borderRadius: "5px",
      border: "2px solid grey",
      padding: "15px",
      height: "180px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    navLinkContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    navLinkButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    navLinkMessage: { marginLeft: "5px" },
  };
};
