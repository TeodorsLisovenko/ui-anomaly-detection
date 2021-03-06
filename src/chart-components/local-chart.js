import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import randomcolor from "randomcolor";

const LocalChart = ({ featureName, anomalies }) => {
  const featureOfInterest = anomalies.filter(
    (anomaly) => anomaly.name === featureName
  );

  const CustomizedDot = (props) => {
    const { cx, cy, payload, dataKey } = props;

    if (dataKey === "value" && payload.anomalus === "yes") {
      return (
        <svg
          x={cx - 6}
          y={cy - 6}
          width={65}
          height={65}
          fill="red"
          viewBox="0 0 1024 1024"
        >
          <circle
            cx="95"
            cy="95"
            r="95"
            stroke="black"
            strokeWidth="10"
            fill="red"
          />
        </svg>
      );
    }
    return null;
    
  };
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={featureOfInterest}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
        <YAxis dataKey="value" />
        <Tooltip />
        <Brush dataKey="date" height={30} stroke="#0000FF" />
        <Legend />
        {["value", "importance", "anomaly_level", "anomalus"].map(
          (label, index) => (
            <Line
              type="monotone"
              key={index}
              dataKey={label}
              strokeWidth={2}
              stroke={
                label === "value"
                  ? randomcolor({
                      luminosity: "dark",
                      format: "rgba",
                      alpha: 1,
                    })
                  : null
              }
              dot={<CustomizedDot />}
            />
          )
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LocalChart;
