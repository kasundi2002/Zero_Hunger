import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const BarChartComponent = ({ data }) => {
  const screenWidth = Dimensions.get('window').width - 40;

  // Check if data is defined and properly structured
  if (!data || !data.labels || !data.datasets || !data.datasets[0] || !data.datasets[0].data) {
    return <Text>No data available for the chart</Text>; // Return message if data is missing or undefined
  }

  return (
    <View>
      <BarChart
        data={{
          labels: data.labels, // Ensure labels is an array
          datasets: [
            {
              data: data.datasets[0].data, // Ensure datasets[0].data is an array
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="meals"  // Remove the "$" symbol
        yAxisSuffix=""  // Display the values as meals
        yAxisInterval={1}  // Show values for each increment of 1 meal
        fromZero={true}  // Start the y-axis from zero
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Color of labels
            fillShadowGradient: "#42A5F5",  // Bar color
            fillShadowGradientOpacity: 1,  // Full opacity for bar color
            propsForBackgroundLines: {
          strokeWidth: 1, // Set width for the grid lines
          stroke: "#ff6b6b", // Grid line color (add color to y-axis lines)
          strokeDasharray: "3", // Dash effect for the grid lines
        },
        propsForLabels: {
          fontSize: 12, // Font size for the labels
        },
        style: {
          borderRadius: 16,  // Border radius for the chart
        },
        barPercentage: 0.5,  // Adjust the bar width
      }}
      verticalLabelRotation={0}
      yLabelsOffset={15}  // Space between y-label and the chart
      showBarTops={false}  // Hide bar tops if necessary
      withInnerLines={true}  // Show grid lines inside the chart
      
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default BarChartComponent;
