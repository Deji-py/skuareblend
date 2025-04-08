import Chart from "chart.js/auto";
import React, { useEffect } from "react";
import { Divider } from "@chakra-ui/react";

function PostChart() {
  useEffect(() => {
    const ctx = document.getElementById("myChart");

    // Check if a Chart instance already exists and destroy it
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    // Example data for post performance for each day of the week
    const performanceData = [50, 70, 60, 45, 80, 90, 75]; // Replace with your actual data

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Post Performance",
            data: performanceData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
              "rgba(255, 99, 132, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []); // Empty dependency array to ensure this runs only once

  return (
    <div className="px-5 my-5">
      <h2 className="font-bold  text-gray-500">Activities</h2>
      <Divider />
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default PostChart;
