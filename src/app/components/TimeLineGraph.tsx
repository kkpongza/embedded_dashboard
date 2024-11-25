import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface TimelineGraphProps {
    data: [string, string][];
}

const TimelineGraph: React.FC<TimelineGraphProps> = ({
    data,
}: TimelineGraphProps) => {
    // Transform data into the format required for Chart.js
    if (!data) return null;

    const labels = data.map((item: [string, string]) =>
        new Date(item[0]).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
    );
    const values = data.map((item: [string, string]) =>
        item[1] === "True" || item[1] === "TRUE" ? 1 : 0
    );

    const chartData = {
        labels,
        datasets: [
            {
                label: "Human Detect(found)",
                data: values,
                backgroundColor: "rgba(255, 99, 132, 0.6)", // Red color for bars
                borderColor: "rgba(255, 99, 132, 1)", // Red color for bar borders
                borderWidth: 1,
            },
        ],
    };

    const chartOptions: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top", // Position of the legend
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time", // X-axis title
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Value", // Y-axis title
                },
                ticks: {
                    stepSize: 1, // Increment steps
                    callback: (value: number | string) =>
                        value === 1 ? "True" : "False", // Y-axis labels
                },
            },
        },
    };

    return (
        <div>
            <h1>Timeline Bar Chart</h1>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default TimelineGraph;
