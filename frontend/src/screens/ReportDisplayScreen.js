import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';  // Don't forget to import StyleSheet
import BarChartComponent from '../components/Chart/BarChartComponent';
import LineChartComponent from '../components/Chart/LineChartComponent';
import PieChartComponent from '../components/Chart/PieChartComponent';
import StackedBarChartComponent from '../components/Chart/StackedBarChartComponent';


import axios from 'axios';
import jsPDF from 'jspdf';  // Import jsPDF
import * as XLSX from 'xlsx';  // Import SheetJS
import { captureRef } from 'react-native-view-shot';

const ReportDisplayScreen = ({ route }) => {
  const { reportType, timeFrame } = route.params;
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const chartRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
  
        // Check the report type and make the appropriate API request
        switch (reportType) {
  
          case 'foodDistributionSummary':
            if (timeFrame === 'weekly') {
              response = await axios.get(`http://192.168.8.169:5000/api/reports/food-distribution?timeFrame=${timeFrame}`);
            }
            if (timeFrame === 'monthly') {
              // Hardcoded data for monthly food distribution
              const formattedData = {
                labels: ['January', 'February', 'March', 'April'],
                datasets: [
                  {
                    data: [1500, 2000, 1800, 2200], // Hardcoded monthly data
                  }
                ]
              };
              setChartData(formattedData);
            }
            if (timeFrame === 'yearly') {
              // Hardcoded data for yearly food distribution
              const formattedData = {
                labels: ['2021', '2022', '2023', '2024'],
                datasets: [
                  {
                    data: [12000, 14000, 13000, 16000], // Hardcoded yearly data
                  }
                ]
              };
              setChartData(formattedData);
            }
            break;
  
          case 'volunteerContributions':
            if (timeFrame === 'weekly') {
              response = await axios.get(`http://192.168.8.169:5000/api/reports/volunteer-contributions?timeFrame=${timeFrame}`);
              if (response && response.data && Array.isArray(response.data)) {
                const totalHours = response.data.map(item => item.totalHours); // Assuming API returns an array of totalHours
                const formattedData = {
                  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Use dynamic labels if needed
                  datasets: [
                    {
                      data: totalHours.length ? totalHours : [0, 0, 0, 0], // Ensure there's a fallback in case of missing data
                    }
                  ]
                };
                setChartData(formattedData);
              } else {
                setError('No data available');
              }
            }
            if (timeFrame === 'monthly') {
              // Hardcoded data for monthly volunteer contributions
              const formattedData = {
                labels: ['January', 'February', 'March', 'April'],
                datasets: [
                  {
                    data: [200, 220, 180, 240], // Hardcoded monthly volunteer hours
                  }
                ]
              };
              setChartData(formattedData);
            }
            if (timeFrame === 'yearly') {
              // Hardcoded data for yearly volunteer contributions
              const formattedData = {
                labels: ['2021', '2022', '2023', '2024'],
                datasets: [
                  {
                    data: [2400, 2600, 2500, 2800], // Hardcoded yearly volunteer hours
                  }
                ]
              };
              setChartData(formattedData);
            }
            break;
  
          case 'wasteReduction':
            
              response = await axios.get(`http://192.168.8.169:5000/api/reports/waste-reduction?timeFrame=${timeFrame}`);
              console.log('API response for wasteReduction:', response.data);
              setLoading(false);
          break;
  
          case 'orphanageFulfillment':
            
              response = await axios.get(`http://192.168.8.169:5000/api/reports/orphanage-requests?timeFrame=${timeFrame}`);
          break;
  
          default:
            setError('Invalid report type.');
          return;
        }
  
        // If weekly data is fetched from the server, handle it here
        if (response && response.data) {
          console.log('Response in reportDisplay fetch data:', response);
          console.log('Response data in reportDisplay fetch data:', response.data);
          console.log('Report type in reportDisplay fetch data:', reportType);

          const formattedData = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Placeholder labels for weekly data
            datasets: [
              {
                data: [500, response.data.totalFoodDistributed, 750, 1200] // Assuming you only have one value for totalFoodDistributed
              }
            ]
          };

          setChartData(formattedData); // Set the formatted data
        } 
        else if (!response && timeFrame === 'weekly') 
        {
          setError('No data available for weekly data');
        }
  
      } catch (error) {
        // Log the full error object for debugging
        console.error('Error fetching report:', error);
        if (error.response) {
          console.error('Response Error Status:', error.response.status);  // Log response status
          console.error('Response Data:', error.response.data);            // Log response data
        } else if (error.request) {
          console.error('Request Error:', error.request);                  // Log the request object
        } else {
          console.error('Error Message:', error.message);                  // Log error message
        }
        setError('Failed to fetch report data');
      } finally {
        setLoading(false);  // End loading state regardless of success or failure
      }
    };
  
    fetchData();
  }, [reportType, timeFrame]);
  

  const downloadReport = async (format) => {  
    if (format === 'pdf') {
      try {
        setTimeout(async () => {
        const uri = await captureRef(chartRef, {
          format: 'png',
          quality: 1.0,
        });

        const doc = new jsPDF();

        // Add border (draw a rectangle as a border)
        doc.setLineWidth(1);
        doc.rect(5, 5, 200, 287); // x, y, width, height

        const pageWidth = doc.internal.pageSize.getWidth(); // Get the width of the page

        // Title
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0); // Black
        doc.text('Zero Hunger', pageWidth / 2, 30, { align: 'center' }); // Centered title

        // Start the report text below the title
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100); // Gray
        
        // Move the report text down below the title with proper spacing
        let startY = 50; // Adjust Y position to move text below the title
        
        if (timeFrame === 'weekly') {
          if (reportType === 'foodDistributionSummary') {
            doc.text('Weekly Report - Food Distribution Summary', pageWidth / 2, startY, { align: 'center' });
            startY += 10; // Add space between lines
            doc.text('Total Food Distributed:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10; // Adjust vertical spacing for each line
              doc.text(`Week ${index + 1}: ${value} meals`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'volunteerContributions') {
            doc.text('Volunteer Contributions Report', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Total Hours Worked:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Week ${index + 1}: ${value} hours`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'wasteReduction') {
            doc.text('Waste Reduction Report', pageWidth / 2, startY, { align: 'center' });
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
            doc.text('Monthly Report - Food Distribution Summary', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Total Food Distributed:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Month ${index + 1}: ${value} meals`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'volunteerContributions') {
            doc.text('Monthly Volunteer Contributions Report', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Total Hours Worked:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Month ${index + 1}: ${value} hours`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'wasteReduction') {
            doc.text('Monthly Waste Reduction Report', pageWidth / 2, startY, { align: 'center' });
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
            doc.text('Yearly Report - Food Distribution Summary', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Total Food Distributed:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Year ${index + 1}: ${value} meals`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'volunteerContributions') {
            doc.text('Yearly Volunteer Contributions Report', pageWidth / 2, startY, { align: 'center' });
            startY += 10;
            doc.text('Total Hours Worked:', pageWidth / 2, startY, { align: 'center' });
            chartData.datasets[0].data.forEach((value, index) => {
              startY += 10;
              doc.text(`Year ${index + 1}: ${value} hours`, pageWidth / 2, startY, { align: 'center' });
            });
          } else if (reportType === 'wasteReduction') {
            doc.text('Yearly Waste Reduction Report', pageWidth / 2, startY, { align: 'center' });
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
  

  if (loading) {
    return <Text style={styles.message}>Loading chart data...</Text>;
  }

  if (error) {
    return <Text style={styles.message}>{error}</Text>;
  }

  return (
<View style={styles.container}>
  <Text style={styles.heading}>
    {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Report - {reportType.replace(/([A-Z])/g, ' $1').trim()}
  </Text>

  <View ref={chartRef} style={styles.chartContainer}>
    {reportType === 'wasteReduction' ? (
      <PieChartComponent timeFrame={timeFrame} /> // Directly pass timeFrame
    ) : reportType === 'orphanageFulfillment' ? (
      <StackedBarChartComponent timeFrame={timeFrame} /> // Directly pass timeFrame
    ) : reportType === 'foodDistributionSummary' || reportType === 'volunteerContributions' ? (
      chartData && chartData.datasets && chartData.datasets[0].data.length > 0 ? (
        reportType === 'foodDistributionSummary' ? (
          <BarChartComponent data={chartData} />
        ) : (
          <LineChartComponent data={chartData} />
        )
      ) : error ? (
        <Text style={styles.message}>{error}</Text>
      ) : (
        <Text style={styles.message}>Loading chart data...</Text>
      )
    ) : (
      <Text style={styles.message}>No chart available for this report type</Text>
    )}
  </View>

  <View style={styles.buttonGroup}>
    <Button title="PDF" onPress={() => downloadReport('pdf')} />
    <Button title="Excel" onPress={() => downloadReport('excel')} />
  </View>
</View>

  );
};

export default ReportDisplayScreen;

// Define the styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
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
