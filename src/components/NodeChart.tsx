import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useNodeData } from "@/hooks/useNodes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface NodeChartProps {
  nodeId: string;
  dataType: "temperature" | "humidity";
}

const NodeChart: React.FC<NodeChartProps> = ({ nodeId, dataType }) => {
  const { readings, loading, error } = useNodeData(nodeId, 86400000);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const labels = readings.map((reading) =>
    new Date(reading.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const data = {
    labels,
    datasets: [
      {
        label: dataType === "temperature" ? "Temperature (°C)" : "Humidity (%)",
        data: readings.map((reading) => reading[dataType]),
        borderColor:
          dataType === "temperature"
            ? "rgb(255, 99, 132)"
            : "rgb(53, 162, 235)",
        backgroundColor:
          dataType === "temperature"
            ? "rgba(255, 99, 132, 0.5)"
            : "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    elements: {
      point: {
        radius: 1,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
        },
      },
      x: {
        title: {
          display: false,
        },
      },
    },
  };

  return <Line options={chartOptions} data={data} />;
};

export default NodeChart;
