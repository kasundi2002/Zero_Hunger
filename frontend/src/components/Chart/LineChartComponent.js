import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const LineChartComponent = ({ data }) => {
  const screenWidth = Dimensions.get('window').width;

  // Log the data to ensure it's correct
  console.log('LineChart Data:', data);

  return (
    <LineChart
      data={{
        labels: data.labels,
        datasets: [
          {
            data: data.datasets[0].data.map(value => isNaN(value) ? 0 : value),  // Ensure no NaN values
          },
        ],
      }}
      width={screenWidth - 40}
      height={220}
      yAxisLabel="hrs"  // Change label or remove entirely
      chartConfig={{
        backgroundColor: '#f2a365',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 0,  // No decimal places if it's hours
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default LineChartComponent;
