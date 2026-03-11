import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BarChart({ labels = [], values = [], chartLabel = "Bar chart" }) {
  const data = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data: values,
        backgroundColor: [
          "#4A87DE",
          "#84BAE9",
          "#2F6FA3",
          "#1F4F75",
          "#BFD8D6",
        ],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#DEF9F6",
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          display: false,
        },
        border: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#DEF9F6",
        },
        grid: {
          color: "rgba(255,255,255,0.08)",
        },
        border: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;