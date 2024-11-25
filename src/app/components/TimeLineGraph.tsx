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

interface DataPoint {
    timestamp: string;
    value: string;
}

interface TimelineGraphProps {
    data: any;
}

const TimelineGraph: React.FC<TimelineGraphProps> = ({ data }: any) => {
    // Transform data into the format required for Chart.js
    if (!data) return null;

    const labels = data.map((item: any) =>
        new Date(item[0]).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
    );
    const values = data.map((item: any) =>
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

    const chartOptions: any = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Value",
                },
                ticks: {
                    stepSize: 1,
                    callback: (value: number) =>
                        value === 1 ? "True" : "False",
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
