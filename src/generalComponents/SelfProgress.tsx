import { Grid, useTheme } from "@mui/material";
import { Col, ConfigProvider, Progress } from "antd";

interface SelfProgressProps {
  format: any;
  percent: number;
  style: any;
  size: any;
}

const SelfProgress = ({ format, percent, style, size }: SelfProgressProps) => {
  const { mode } = useTheme().palette;
  return (
    <Grid>
      <Col>
        <ConfigProvider
          theme={{
            components: {
              Progress: {
                circleTextColor: `${mode == "light" ? "black" : "white"}`,
              },
            },
          }}
        >
          <Progress
            size={size}
            success={{ percent: 0, strokeColor: "#fff" }}
            type="circle"
            className=""
            strokeColor={"#0288d1"}
            trailColor={"lightGrey"}
            style={style}
            percent={percent}
            format={() => format}
          />
        </ConfigProvider>
      </Col>
    </Grid>
  );
};

export default SelfProgress;
