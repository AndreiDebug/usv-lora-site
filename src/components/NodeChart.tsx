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
  hoursAgo?: number;
}

const NodeChart: React.FC<NodeChartProps> = ({
  nodeId,
  dataType,
  hoursAgo = 1,
}) => {
  const { readings, loading, error } = useNodeData(nodeId, hoursAgo);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (readings.length === 0) {
    return <NoDataPlaceholder dataType={dataType} />;
  }

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
        radius: 2,
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

const NoDataPlaceholder: React.FC<{ dataType: "temperature" | "humidity" }> = ({
  dataType,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
      <svg
        className="w-24 h-24 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-gray-600 text-lg font-medium">
        No {dataType} data available
      </p>
      <p className="text-gray-500 text-sm mt-2">Check back later for updates</p>
    </div>
  );
};

export default NodeChart;
