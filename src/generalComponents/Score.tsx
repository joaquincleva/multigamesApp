import { Divider, Grid, Typography } from "@mui/material";

interface ScoreProps {
  record: number;
  actualScore: number;
  gridStyles: any
}

const Score = ({ record, actualScore, gridStyles }: ScoreProps) => {
  return (
    <Grid sx={gridStyles}>
      <Grid display={"flex"} sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Record: </Typography>
        <Typography variant="h6">{record}</Typography>
      </Grid>
      <Divider />
      <Grid display={"flex"} sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Puntuación Actual: </Typography>
        <Typography variant="h6">
          {actualScore}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Score;
