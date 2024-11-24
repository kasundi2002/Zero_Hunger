import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Text } from 'react-native';

const PieChartComponent = ({ timeFrame }) => {
  const screenWidth = Dimensions.get('window').width;

  // Hardcoded pieData based on the timeFrame
  let pieData;
  if (timeFrame === 'weekly') {
    pieData = [
      { name: 'Week 1', population: 150, color: '#ff0000', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Week 2', population: 100, color: '#00ff00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Week 3', population: 200, color: '#0000ff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Week 4', population: 170, color: '#ffff00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];
  } else if (timeFrame === 'monthly') {
    pieData = [
      { name: 'January', population: 400, color: '#ff00ff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'February', population: 300, color: '#00ffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'March', population: 350, color: '#ff9900', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'April', population: 450, color: '#6600cc', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];
  } else if (timeFrame === 'yearly') {
    pieData = [
      { name: '2020', population: 1000, color: '#ff4500', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: '2022', population: 1100, color: '#00ff7f', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: '2023', population: 900, color: '#1e90ff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: '2024', population: 1200, color: '#daa520', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];
  }

  return (
    <PieChart
      data={pieData}  // Use the hardcoded data based on timeFrame
      width={screenWidth - 40}
      height={220}
      chartConfig={{
        backgroundColor: '#1cc910',
        backgroundGradientFrom: '#eff3ff',
        backgroundGradientTo: '#efefef',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      accessor="population"  // Pie chart's data field
      backgroundColor="transparent"
      paddingLeft="15"
      absolute  // Show absolute numbers in the pie chart
    />
  );
};

export default PieChartComponent;
