import React, { useState, useEffect ,useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

import jsPDF from 'jspdf';  // Import jsPDF
import * as XLSX from 'xlsx';  // Import SheetJS
import { captureRef } from 'react-native-view-shot';

const screenWidth = Dimensions.get('window').width;

const MyReportDisplayScreen = ({ route }) => {
  const { reportType, timeFrame } = route.params;
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const chartContainerRef = useRef();

  // Dynamic Dummy Data based on TimeFrame and ReportType
  useEffect(() => {
    const fetchData = () => {
      let formattedData;

      // Generate data dynamically based on timeFrame
      switch (timeFrame) {
        case 'weekly':
          if (reportType === 'foodDistributionSummary') {
            formattedData = {
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
              datasets: [{ data: [100, 200, 300, 400] }]
            };
          } else if (reportType === 'volunteerContributions') {
            formattedData = {
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
              datasets: [{ data: [50, 80, 100, 120] }]
            };
          } else if (reportType === 'wasteReduction') {
            formattedData = {
              labels: ['Category 1', 'Category 2', 'Category 3'],
              datasets: [{ data: [30, 40, 50] }]
            };
          }
          break;
        case 'monthly':
          if (reportType === 'foodDistributionSummary') {
            formattedData = {
              labels: ['January', 'February', 'March', 'April'],
              datasets: [{ data: [1000, 1500, 1200, 1300] }]
            };
          } else if (reportType === 'volunteerContributions') {
            formattedData = {
              labels: ['January', 'February', 'March', 'April'],
              datasets: [{ data: [200, 250, 270, 300] }]
            };
          } else if (reportType === 'wasteReduction') {
            formattedData = {
              labels: ['Plastic', 'Food Waste', 'Paper'],
              datasets: [{ data: [200, 150, 100] }]
            };
          }
          break;
        case 'yearly':
          if (reportType === 'foodDistributionSummary') {
            formattedData = {
              labels: ['2019', '2020', '2021', '2022'],
              datasets: [{ data: [3000, 4000, 5000, 6000] }]
            };
          } else if (reportType === 'volunteerContributions') {
            formattedData = {
              labels: ['2019', '2020', '2021', '2022'],
              datasets: [{ data: [1000, 1500, 2000, 2200] }]
            };
          } else if (reportType === 'wasteReduction') {
            formattedData = {
              labels: ['Plastic', 'Food Waste', 'Paper'],
              datasets: [{ data: [600, 800, 900] }]
            };
          }
          break;
        default:
          setError('Invalid time frame or report type.');
          return;
      }

      setChartData(formattedData);
      setLoading(false);
    };

    fetchData();
  }, [reportType, timeFrame]);

  const downloadReport = async (format) => {  // Make the function async to use await
    console.log(`In download report`)
    if (format === 'pdf') {
      try {
        setTimeout(async () => {
        const uri = await captureRef(chartContainerRef, {
          format: 'png',
          quality: 1.0,
        });
  
        const doc = new jsPDF();
  
        // Add border (draw a rectangle as a border)
        doc.setLineWidth(1);
        doc.rect(5, 5, 200, 287); // x, y, width, height

        const pageWidth = doc.internal.pageSize.getWidth(); 

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0); // Black
        doc.text('Zero Hunger', pageWidth / 2, 30, { align: 'center' }); // Centered title

        // Start the report text below the title
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100); // Gray

        let startY = 50;

        if (timeFrame === 'weekly') {
          if (reportType === 'foodDistributionSummary') {
            doc.text('Weekly Report - My Food Distribution Summary', pageWidth / 2, startY, { align: 'center' });
            startY += 10; // Add space between lines
            doc.text('Total Food Distributed:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10; // Adjust vertical spacing for each line
              doc.text(`Week ${index + 1}: ${value} meals`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'volunteerContributions') {
            doc.text('My Contributions - Report', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Total Hours Worked:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Week ${index + 1}: ${value} hours`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'wasteReduction') {
            doc.text('My contribution to Waste Reduction - Report', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Total Waste Reduced:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Week ${index + 1}: ${value} kg`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'orphanageFulfillment') {
            doc.text('Orphanage Fulfillment Report', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Requests Fulfilled:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Week ${index + 1}: ${value} requests`, pageWidth / 2, startY, { align: 'center' });
            });
          }
        } else if (timeFrame === 'monthly') {
          if (reportType === 'foodDistributionSummary') {
            doc.text('Monthly Report - My Food Distribution Summary', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Total Food Distributed:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Month ${index + 1}: ${value} meals`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'volunteerContributions') {
            doc.text('Monthly -My Contributions - Report', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Total Hours Worked:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Month ${index + 1}: ${value} hours`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'wasteReduction') {
            doc.text('My contribution to Waste Reduction - Report', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Total Waste Reduced:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Month ${index + 1}: ${value} kg`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'orphanageFulfillment') {
            doc.text('Monthly Orphanage Fulfillment Report', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Requests Fulfilled:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Month ${index + 1}: ${value} requests`, pageWidth / 2, startY, { align: 'center' });
            });
          }
        } else {
          if (reportType === 'foodDistributionSummary') {
            doc.text('Yearly Report - My Food Distribution Summary', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Total Food Distributed:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Year ${index + 1}: ${value} meals`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'volunteerContributions') {
            doc.text('Yearly - My Contributions - Report', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Total Hours Worked:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Year ${index + 1}: ${value} hours`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'wasteReduction') {
            doc.text('Yearly -My contribution to Waste Reduction - Report', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Total Waste Reduced:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Year ${index + 1}: ${value} kg`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'orphanageFulfillment') {
            doc.text('Yearly Orphanage Fulfillment Report', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Requests Fulfilled:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Year ${index + 1}: ${value} requests`, pageWidth / 2, startY, { align: 'center' });
            });
          }
        }

        // Add the captured image (chart) to the PDF
        if (uri) {
          const imgWidth = 150;  // Image width
          const imgHeight = 80; // Image height
          const imgX = (pageWidth - imgWidth) / 2; // Calculate X to center the image
          startY += 20; // Add space after the text
          doc.addImage(uri, 'PNG', imgX, startY, imgWidth, imgHeight); // Centered image
        }
        doc.save(`${reportType}.pdf`);  // Save the PDF file

      },1000);
     } catch (error) {
        console.error("Error capturing chart image: ", error);
      }
    } else if (format === 'excel') {
      const wb = XLSX.utils.book_new();
      let ws_data;
  
      // Custom content based on the report type
      if (reportType === 'foodDistributionSummary') {
        ws_data = [
          ['Week', 'Meals Distributed'],
          ['Week 1', chartData.datasets[0].data[0]],
          ['Week 2', chartData.datasets[0].data[1]],
          ['Week 3', chartData.datasets[0].data[2]],
          ['Week 4', chartData.datasets[0].data[3]],
        ];
      } else if (reportType === 'volunteerContributions') {
        ws_data = [
          ['Week', 'Volunteer Hours'],
          ['Week 1', chartData.datasets[0].data[0]],
          ['Week 2', chartData.datasets[0].data[1]],
          ['Week 3', chartData.datasets[0].data[2]],
          ['Week 4', chartData.datasets[0].data[3]],
        ];
      } else if (reportType === 'wasteReduction') {
        ws_data = [
          ['Week', 'Waste Reduced (kg)'],
          ['Week 1', chartData.datasets[0].data[0]],
          ['Week 2', chartData.datasets[0].data[1]],
          ['Week 3', chartData.datasets[0].data[2]],
          ['Week 4', chartData.datasets[0].data[3]],
        ];
      } else if (reportType === 'orphanageFulfillment') {
        ws_data = [
          ['Week', 'Requests Fulfilled'],
          ['Week 1', chartData.datasets[0].data[0]],
          ['Week 2', chartData.datasets[0].data[1]],
          ['Week 3', chartData.datasets[0].data[2]],
          ['Week 4', chartData.datasets[0].data[3]],
        ];
      }
  
      const ws = XLSX.utils.aoa_to_sheet(ws_data);
      XLSX.utils.book_append_sheet(wb, ws, 'Report');
      XLSX.writeFile(wb, `${reportType}.xlsx`);  // Trigger Excel download
    }
  };

  if (loading) return <Text style={styles.message}>Loading chart data...</Text>;
  if (error) return <Text style={styles.message}>{error}</Text>;

  return (
    <View  style={styles.container}>
      <Text style={styles.heading}>
        {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Report - {reportType.replace(/([A-Z])/g, ' $1').trim()}
      </Text>

      <View ref={chartContainerRef} style={styles.chartContainer}>
        {reportType === 'wasteReduction' ? (
          <PieChartComponent data={chartData} />
        ) : (
          <BarChartComponent data={chartData} />
        )}
      </View>

      <View style={styles.buttonGroup}>
        <Button title="PDF" onPress={() => downloadReport('pdf')} />
        <Button title="Excel" onPress={() => downloadReport('excel')} />
      </View>
    </View>
  );
};

// Chart Components (Bar, Pie, etc.)
const BarChartComponent = ({ data }) => (
  <BarChart
    data={data}
    width={screenWidth - 40}
    height={220}
    chartConfig={{
        backgroundColor: '#ffffff', // White background for clarity
        backgroundGradientFrom: '#ffffff', // White gradient for background
        backgroundGradientTo: '#f0f0f0', // Light gray gradient for background
        decimalPlaces: 0,
        barPercentage: 0.5, // Increase bar width
        fillShadowGradient: '#FF6384', // Default bar color gradient start (red)
        fillShadowGradientTo: '#36A2EB', // Default bar color gradient end (blue)
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Correctly defined function for overall chart color (grid lines, labels, etc.)
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black for label clarity
    }}
    verticalLabelRotation={0} // Straighten the labels for clarity
    horizontalLabelRotation={0}
    style={{
      alignSelf: 'center', // Align chart in the center
    }}
  />
);

const PieChartComponent = ({ data }) => (
  <PieChart
    data={data.labels.map((label, index) => ({
      name: label,
      population: data.datasets[0].data[index],
      color: index % 2 === 0 ? '#ff6384' : '#36a2eb',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }))}
    width={screenWidth - 40}
    height={300}
    chartConfig={{
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#f5f5f5',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Correctly defined function for grid lines and labels
    }}
    accessor="population"
    backgroundColor="transparent"
  />
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  message: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
});

export default MyReportDisplayScreen;
