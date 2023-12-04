import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { dashboardStyles } from "../styles/dashboardStyles.styles";
import { NavLink } from "react-router-dom";

interface EmptyStatsCardProps {
  name: string;
  path: string;
  mode: string;
  icon: React.ReactNode;
  index: number;
}

const EmptyStatsCard = ({
  name,
  path,
  mode,
  icon,
  index,
}: EmptyStatsCardProps) => {
  return (
    <Grid
      key={index}
      xs={12}
      sm={5.8}
      sx={dashboardStyles().emptyStatsContainer}
    >
      <Typography variant="caption">
        Aun no tienes partidas en el juego {name}
      </Typography>
      <NavLink to={`${path}`}>
        <Grid
          sx={{
            ...dashboardStyles().navLinkContainer,
            color: `${mode === "dark" ? "white" : "#666"}`,
          }}
        >
          <Button sx={dashboardStyles().navLinkButton}>
            {icon}{" "}
            <span style={dashboardStyles().navLinkMessage}>Jugar {name}</span>
          </Button>
        </Grid>
      </NavLink>
      <Grid></Grid>
    </Grid>
  );
};

export default EmptyStatsCard;
