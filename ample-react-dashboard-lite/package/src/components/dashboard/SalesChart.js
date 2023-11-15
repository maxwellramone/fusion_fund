import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import React, { useState, useEffect } from "react";
// import record from "./test.json";

const SalesChart = () => {
  const [chartoptions, setChartData] = useState(null);
  const rawData = {
    // series: [
    //   {
    //     name: "OpenAI",
    //     data: [0, 31, 40, 28, 51, 42, 109, 100, 0, 0, 0, 0],
    //   },
    //   {
    //     name: "Facebook",
    //     data: [0, 11, 32, 45, 32, 34, 52, 41, 0, 0, 0, 0],
    //   },
    //   {
    //     name: "Company #3",
    //     data: [0, 4, 21, 30, 38, 41, 44, 55, 0, 0, 0, 0],
    //   },
    //   {
    //     name: "Company #4",
    //     data: [0, 17, 21, 26, 47, 59, 76, 84, 0, 0, 0, 0],
    //   },
    //   {
    //     name: "Company #5",
    //     data: [0, 7, 11, 15, 39, 51, 67, 80, 0, 0, 0, 0],
    //   },
    // ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };
  async function fetchDataFromBackendAPI() {
    try {
      const response = await fetch('http://localhost:8000/getstats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stat: 'sumsbytech',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from the backend API');
      }

      const data = await response.json();
      console.log(data)
      console.log("Printing Data")
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDataFromBackendAPI();
        if (data) {
          setChartData({...rawData, ...data});
        } else {
          console.log('Failed to fetch data from the API.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    fetchData();
  }, []);

  // Define your data object here
  
  // try {
  //  const chartData = await fetchDataFromDummyAPI();
  // }

  //    catch (error) {
  //     console.error('An error occurred:', error);
  //   }


  // async function getChartData() {
  //   try {
  //     const apiData = await fetchDataFromDummyAPI();
  //     if (apiData) {
  //       console.log('Data from the API:', apiData);
  //       // You can work with the data here.
  //     } else {
  //       console.log('Failed to fetch data from the API.');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // }
  // const chartoptions = {
  //   series: [
  //     {
  //       name: "OpenAI",
  //       data: [0, 31, 40, 28, 51, 42, 109, 100],
  //     },
  //     {
  //       name: "Facebook",
  //       data: [0, 11, 32, 45, 32, 34, 52, 41],
  //     },
  //     {
  //       name: "Company #3",
  //       data: [0, 4, 21, 30, 38, 41, 44, 55],
  //     },
  //     {
  //       name: "Company #4",
  //       data: [0, 17, 21, 26, 47, 59, 76, 84],
  //     },
  //     {
  //       name: "Company #5",
  //       data: [0, 7, 11, 15, 39, 51, 67, 80],
  //     }
  //   ],
  //   options: {
  //     chart: {
  //       type: "area",
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     grid: {
  //       strokeDashArray: 3,
  //     },

  //     stroke: {
  //       curve: "smooth",
  //       width: 1,
  //     },
  //     xaxis: {
  //       categories: [
  //         "Jan",
  //         "Feb",
  //         "March",
  //         "April",
  //         "May",
  //         "June",
  //         "July",
  //         "Aug",
  //       ],
  //     },
  //   },
  // };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Companies summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Frequency of hits using keywords
        </CardSubtitle>
        {/* <Chart
          type="area"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart> */}
        {chartoptions ? (
          <Chart
            type="area"
            width="100%"
            height="390"
            options={chartoptions.options}
            series={chartoptions.series}
          />
        ) : (
          <p>Loading chart data...</p>
        )}
      </CardBody>
    </Card>
  );
};

export default SalesChart;
