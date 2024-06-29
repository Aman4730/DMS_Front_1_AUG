import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieDoughnutChart = ({ data }) => {
  // Generate unique colors for each data point
  const backgroundColors = generateUniqueColors(data.length);

  // Function to generate an array of unique colors
  function generateUniqueColors(numColors) {
    const backgroundColors = [];
    for (let i = 0; i < numColors; i++) {
      // Generating random color in HSL format
      const hue = (i * 360) / numColors;
      const color = `hsl(${hue}, 50%, 70%)`;
      backgroundColors.push(color);
    }
    return backgroundColors;
  }

  const options = {
    chart: {
      type: 'pie',
    },
    labels: ['January', 'February', 'March', 'April', 'May'],
    colors: backgroundColors,
  };

  return (
    <ReactApexChart options={options} series={data} type="pie" height={350} />
  );
};

export default PieDoughnutChart;
