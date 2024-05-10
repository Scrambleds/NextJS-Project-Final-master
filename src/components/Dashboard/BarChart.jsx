"use client"
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {Spinner} from "@nextui-org/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function BarChart({ data }) {
  const [isloading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'เปอร์เซ็นต์คะแนนในแต่ละเกรด',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const grade = tooltipItem.chart.data.labels[tooltipItem.dataIndex];
            const percentage = tooltipItem.parsed.y.toFixed(2);
            return `Grade ${grade}: ${percentage}%`;
          },
        },
      },
      datalabels: {
        color: '#000',
        display: true,
        formatter: (value, context) => {
          if (value > 0) {
            // Format value to percentage with 2 decimal places
            return `${value.toFixed(2)}%`;
        } else {
            // Return an empty string if value is less than or equal to 0
            return '';
        }
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Grade',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage',
        },
        ticks: {
          callback: (value) => {
            return value.toFixed(2) + '%';
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  
  });

  

  useEffect(() => {
    setLoading(true); // Set loading to true when data is being fetched

    // Simulating an asynchronous data fetch (you should replace this with your actual data fetching logic)
    setTimeout(() => {
      setChartData((prevChartData) => ({
        ...prevChartData,
        labels: data.map((item) => item.gradeString),
        datasets: [
          {
            label: 'Percentage of Grade',
            fill: true,
            data: data.map((item) => item.percentage),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53, 162, 235, 0.5)',
            borderWidth: 2
          },
        ],
      }));
      setLoading(false); // Set loading to false when data fetching is complete
    }, 1000); // Simulating a 1-second delay (adjust as needed)
  }, [data]);

  useEffect(() => {
    setChartOptions((prevChartOptions) => ({
      ...prevChartOptions,
      tooltips: {
        callbacks: {
          label: (tooltipItem) => {
            const grade = tooltipItem.chart.data.labels[tooltipItem.dataIndex];
            const percentage = tooltipItem.parsed.y.toFixed(2);
            return `Grade ${grade}: ${percentage}%`;
          },
        },
      },
    }));
  }, [chartData]);

  useEffect(() => {
    setChartOptions((prevChartOptions) => ({
      ...prevChartOptions,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      elements: {
        line: {
          tension: 0.5, // Adjust the tension to control the curve smoothness
        },
      },
    }));
  }, []);

  return (
    <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] p-4 border rounded-lg bg-white text-center content-center flex items-center justify-center'>
      {isloading ? (
        <Spinner label="Loading..." color="primary" size='lg'/>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  )

}
