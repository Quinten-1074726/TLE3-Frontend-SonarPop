import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ labels = [], values = [], chartLabel = "Overview" }) {
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
        "#BFD8D6"
        ],
        borderColor: "#0D2132",
        borderWidth: 2,
        hoverOffset: 6,
    },
    ],

  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
    legend: {
    position: "bottom",
    labels: {
        color: "#DEF9F6",
        boxWidth: 10,
        boxHeight: 10,
        padding: 10,
        font: {
        size: 11
        }
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default DonutChart;