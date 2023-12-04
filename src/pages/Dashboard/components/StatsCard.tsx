import { Grid, Typography } from "@mui/material";
import { dashboardStyles } from "../styles/dashboardStyles.styles";
import React from "react";
import Chart from "react-google-charts";
import { minMax } from "../hook/useDashboard";
import { commonStyles } from "../../../styles/commonStyles";
import { useTranslation } from "react-i18next";

interface StatsCardProps {
  index: number;
  mode: string;
  icon: React.ReactNode;
  name: string;
  gamesQty: number;
  minMax: minMax;
  resultsData: any;
}

const StatsCard = ({
  index,
  mode,
  icon,
  name,
  gamesQty,
  minMax,
  resultsData,
}: StatsCardProps) => {

  const { t } = useTranslation()

  return (
    <Grid
      key={index}
      xs={12}
      sm={5.8}
      sx={{
        ...dashboardStyles(mode).statsCard,
      }}
    >
      <Grid sx={dashboardStyles().statsCardHeader}>
        <Grid sx={dashboardStyles().statsCardTitle}>
          {icon}
          <Typography variant="h6">{name}</Typography>
        </Grid>

        <Grid sx={dashboardStyles().statsCardGameCount}>
          <Typography>{t("dashboard.statisticsCards.gamesQty")}: {gamesQty}</Typography>
        </Grid>
        <Grid sx={commonStyles().displayFlex} gap={2}>
          <Typography variant="subtitle1">
            Max:{" "}
            <span style={dashboardStyles().statsCardMaxScore}>{minMax.max}</span>
          </Typography>
          <Typography variant="subtitle1">
            Min:{" "}
            <span style={dashboardStyles().statsCardMinScore}>{minMax.min}</span>
          </Typography>
        </Grid>
      </Grid>
      <Chart
        chartType="Bar"
        width="100%"
        height="110px"
        data={resultsData}
        options={{
          legendtitle: "Company Performance",
          legend: { position: "none" },
          colors: ["#ff8800"],
        }}
      />
    </Grid>
  );
};

export default StatsCard;
