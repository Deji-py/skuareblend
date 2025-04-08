import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";
import { Divider } from "@chakra-ui/react";

function StoreChart() {
  useEffect(() => {
    const ctx = document.getElementById("anotherChart");
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
    // Example data for the number of products sold and user reviews
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Products Sold",
          data: [10, 25, 18, 30, 22], // Replace with your actual data
          borderColor: "rgba(75, 192, 192, 1)",
          fill: false,
        },
        {
          label: "User Reviews",
          data: [5, 12, 8, 15, 10], // Replace with your actual data
          borderColor: "rgba(255, 99, 132, 1)",
          fill: false,
        },
      ],
    };

    new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        // Set to false to prevent vertical stretching
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <div className="px-5 my-5">
      <h2 className="font-bold  text-gray-500">Store</h2>
      <Divider />
      <canvas id="anotherChart"></canvas>
    </div>
  );
}

export default StoreChart;
