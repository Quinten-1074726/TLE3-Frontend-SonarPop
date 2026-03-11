import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function RadarChart({ labels = [], values = [], chartLabel = "Radar chart" }) {
  const data = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data: values,
        backgroundColor: "rgba(74,135,222,0.2)",
        borderColor: "#4A87DE",
        borderWidth: 2,
        pointBackgroundColor: "#4A87DE",
        pointBorderColor: "#DEF9F6",
        pointBorderWidth: 2,
        pointRadius: 4,
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
      r: {
        angleLines: {
          color: "rgba(255,255,255,0.15)",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
        pointLabels: {
          color: "#DEF9F6",
          font: {
            size: 12,
          },
        },
        ticks: {
        backdropColor: "transparent",
        color: "#DEF9F6",
        stepSize: 0.2,
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Radar data={data} options={options} />
    </div>
  );
}

export default RadarChart;