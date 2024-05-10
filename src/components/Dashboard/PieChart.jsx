'use client'
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Spinner } from "@nextui-org/react";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    ChartDataLabels
);

export default function PieChart({ data }) {
  const [isLoading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const backgroundColor = Array.from({ length: data.length }, () =>
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`
      );

      const borderColor = Array.from({ length: data.length }, () =>
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 5)`
      );

      setChartData({
        labels: data.map(item => item.gradeString),
        datasets: [
          {
            label: 'Percentage of Grade',
            data: data.map(item => item.percentage),
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            borderWidth: 1
          },
        ]
      });

      setLoading(false);
    }, 1000);
  }, [data]);

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'เปอร์เซ็นต์คะแนนในแต่ละเกรด',
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `Grade ${label}: ${value.toFixed(2)}%`;
          },
        },
      },
      datalabels: { // Add datalabels configuration
        color: '#000',
        display: true,
        formatter: (value, context) => {
          if (value > 5) {
            // Format value to percentage with 2 decimal places
            return `${value.toFixed(2)}%`;
        } else {
            // Return an empty string if value is less than or equal to 0
            return '';
        }
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] p-4 border rounded-lg bg-white text-center content-center flex items-center justify-center'>
      {isLoading ? (
        <Spinner label="Loading..." color="primary" size='lg'/>
      ) : (
        <Pie data={chartData} options={chartOptions} />
      )}
    </div>
  )
}

