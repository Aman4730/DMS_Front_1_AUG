import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import { Card, Grid, Stack, Typography } from "@mui/material";

const PieDoughnutChart = ({ extension }) => {
  const [chartData, setChartData] = useState({
    series: [],
    datasets: [
      {
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
    options: {
      chart: {
        type: "donut",
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      labels: [],
    },
  });
  useEffect(() => {
    if (extension && Object.keys(extension).length > 0) {
      const labels = Object.keys(extension);
      const labels1 = labels.map((key) => extension[key]);

      setChartData({
        series: labels1,
        options: {
          chart: {
            type: "donut",
          },

          dataLabels: {
            style: {
              colors: ["#00070C"],
              fontWeight: "normal",
              fontSize: "12px",
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
          labels: labels,
          // labels: labels.map((label) => `${label}: ${extension[label]}`),
        },
      });
    }
  }, [extension]);

  return (
    <div id="chart">
      <Stack>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Card
              sx={{
                mb: 1,
                mr: 1,
                p: 1,
                ml: 2,
                // pr: 2,
                borderRadius: "5px",
              }}
            >
              <div>
                <h6>File Extensions</h6>
                <div style={{ height: "219px" }}>
                  {extension && Object.keys(extension).length > 0 ? (
                    <ReactApexChart
                      options={chartData.options}
                      series={chartData.series}
                      type="donut"
                      width={320}
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
      </Stack>
    </div>
  );
};

export default PieDoughnutChart;
