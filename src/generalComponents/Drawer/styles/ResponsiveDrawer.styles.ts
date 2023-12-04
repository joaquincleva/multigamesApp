export const ResponsiveDrawerStyles = (
  currentBreakpoint: string = "",
  open: boolean = false,
  mode: string = ""
) => {
  return {
    drawerContainer: {
      display: "flex",
      width: "100%",
      height: "100% !important",
    },
    appbarContainer: {
      position: "fixed",
      display: "flex",
      boxShadow: "none",
      borderBottom: 2,
    },
    appbarTitleContainer: {
      width: "100%",
      justifyItems: "start",
      display: "flex",
      ml: 3,
    },
    appbarTitle:
      currentBreakpoint == "xs" || currentBreakpoint == "sm" ? 25 : 42,
    appBarTitleFont: { fontFamily: "'Montserrat Subrayada', sans-serif" },
    themeContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "text.primary",
    },
    lenguageFormControl: { margin: 0, padding: 0, mx: 0, my: 0 },
    lenguagePaper: {
      width: "100%",
      padding: 0,
      border: "none",
      boxShadow: "none",
    },
    lenguageMenuList: { width: 200, padding: 0 },
    responsiveDrawerHeader: {
      ...(open
        ? {}
        : {
            height: "65px",
          }),
      backgroundColor: "white",
      width: "100%",
      height: "100%",
      transition: "0.3s",
      boxShadow: "inset -2px 0px 0px 0px rgba(0,0,0,0.2)",
      borderRadius: "0px",

      display: "flex",
      alignItems: "center",
      justifyContent: "start",
    },
    responsiveDrawerHeaderStyled: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      backgroundColor: "white",
      height: 65,
      boxShadow: "inset -2px 0px 0px 0px rgba(0,0,0,0.2)",
      borderRadius: "0px",
    },
    responsiveDrawerHeaderCard: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "0px",
    },
    responsiveDrawerListItem: {
      pt: 1,
      pb: 0,
      ...(currentBreakpoint !== "xs" &&
      currentBreakpoint !== "sm" &&
      currentBreakpoint !== "md" &&
      !open
        ? {
            paddingY: "5px !important",
            justifyContent: "center",
          }
        : ""),
    },
    responsiveDrawerStylesNavLink: {
      alignItems: "stretch",
      display: "flex",
      padding: "5px",
      borderRadius: "10px",
      transition: "0.2s ease-in",
      textDecoration: "none",
      color: `${mode == "dark" ? "#FFF" : "#000"}`,
    },
    responsiveDrawerStylesText: {
      ...(currentBreakpoint !== "xs" &&
      currentBreakpoint !== "sm" &&
      currentBreakpoint !== "md" &&
      !open
        ? { display: "none" }
        : ""),
      color: "inherit",
    },
  };
};
