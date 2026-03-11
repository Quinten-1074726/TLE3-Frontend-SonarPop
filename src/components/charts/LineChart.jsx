import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function LineChart({ labels = [], values = [], chartLabel = "Line chart" }) {
  const data = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data: values,
        borderColor: "#4A87DE",
        backgroundColor: "rgba(74,135,222,0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#4A87DE",
        pointBorderColor: "#DEF9F6",
        pointBorderWidth: 2,
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
    },
    scales: {
      x: {
        ticks: {
          color: "#DEF9F6",
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
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;