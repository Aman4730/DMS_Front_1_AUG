import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, Grid, Stack, Typography } from "@mui/material";

const PieDoughnutChart = ({ extension }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "right",
            },
          },
        },
      ],
      labels: [],
      colors: [],
      dataLabels: {
        style: {
          colors: ["#00070C"],
          fontWeight: "normal",
          fontSize: "12px",
        },
      },
    },
  });

  useEffect(() => {
    if (extension && Object.keys(extension).length > 0) {
      const labels = Object.keys(extension);
      const series = labels.map((key) => extension[key]);
      const colors = generateColors(labels.length);
      setChartData((prevData) => ({
        ...prevData,
        series: series,
        options: {
          ...prevData.options,
          labels: labels,
          colors: colors,
        },
      }));
    }
  }, [extension]);

  const generateColors = (numColors) => {
    const colors = [
      "#CD6155",
      "#AF7AC5",
      "#5499C7",
      "#48C9B0",
      "#52BE80",
      "#EB984E",
      "#CACFD2",
      "#99A3A4",
      "#5D6D7E",
    ];
    for (let i = 0; i < numColors; i++) {
      const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`;
      colors.push(color);
    }
    return colors;
  };

  return (
    <div id="chart">
      <Grid container>
        <Grid item lg={12} sm={12} xs={12}>
          <Card
            sx={{
              p: 2,
              borderRadius: "7px",
              height: "40.7vh",
            }}
          >
            <div>
              <h6>File Extensions</h6>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {extension && Object.keys(extension).length > 0 ? (
                  <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="donut"
                    height={348}
                    width={348}
                  />
                ) : (
                  <Typography
                    style={{
                      height: 53,
                      width: 350,
                      paddingTop: "80px",
                    }}
                    align="center"
                  >
                    No extension available
                  </Typography>
                )}
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default PieDoughnutChart;
