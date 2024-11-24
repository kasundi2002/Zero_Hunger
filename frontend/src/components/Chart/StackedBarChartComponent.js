import React from 'react';
import { StackedBarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const StackedBarChartComponent = ({ timeFrame }) => {
  const screenWidth = Dimensions.get('window').width;

  // Hardcoded data based on timeFrame for demonstration purposes
  let data;
  if (timeFrame === 'weekly') {
    data = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      legend: ['Total Requests', 'Fulfilled Requests'],
      data: [
        [60, 30],
        [80, 50],
        [70, 40],
        [100, 60],
      ],
      barColors: ['#dfe4ea', '#45aaf2'],
    };
  } else if (timeFrame === 'monthly') {
    data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      legend: ['Total Requests', 'Fulfilled Requests'],
      data: [
        [200, 150],
        [250, 180],
        [220, 170],
        [300, 200],
      ],
      barColors: ['#dfe4ea', '#45aaf2'],
    };
  } else if (timeFrame === 'yearly') {
    data = {
      labels: ['2020', '2021', '2022', '2023'],
      legend: ['Total Requests', 'Fulfilled Requests'],
      data: [
        [1000, 800],
        [1100, 900],
        [1200, 950],
        [1300, 1000],
      ],
      barColors: ['#dfe4ea', '#45aaf2'],
    };
  }

  return (
    <StackedBarChart
      data={data}
      width={screenWidth - 40}
      height={220}
      chartConfig={{
        backgroundColor: '#1cc910',
        backgroundGradientFrom: '#eff3ff',
        backgroundGradientTo: '#efefef',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
    />
  );
};

export default StackedBarChartComponent;
