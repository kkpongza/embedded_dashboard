import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Extend dayjs with custom parse format
dayjs.extend(customParseFormat);

interface TimelineGraphProps {
    data: [string, string, string][] | null; // [timestamp, status, extra]
}

const TimelineGraph: React.FC<TimelineGraphProps> = ({ data }) => {
    if (!data || data.length === 0) return;

    // Step 1: Extract unique date-times from existing data and mark them as TRUE
    const uniqueDates = Array.from(
        new Set(data.map((item) => dayjs(item[0]).format("YYYY-MM-DD HH:mm")))
    );

    console.log(uniqueDates);
    const filledData = uniqueDates.map(
        (dateTime) => [dateTime, "TRUE"] as [string, string]
    );

    // Step 2: Parse date strings and determine min and max date-times
    const maxTime = dayjs(filledData[0][0], "YYYY-MM-DD HH:mm");
    const minTime = dayjs(
        filledData[filledData.length - 1][0],
        "YYYY-MM-DD HH:mm"
    );

    // Step 3: Fill in missing minutes between minTime and maxTime, marking them as FALSE
    const completeData: [string, string][] = [];
    let currentTime = maxTime.subtract(30, "minute"); // Start from 30 minutes before maxTime
    const endTime = maxTime; // End at maxTime

    while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
        const currentTimeStr = currentTime.format("YYYY-MM-DD HH:mm");

        // Check if the current time exists in the filledData
        const existingData = filledData.find(
            (item) => item[0] === currentTimeStr
        );

        if (existingData) {
            completeData.push(existingData);
        } else {
            completeData.push([currentTimeStr, "FALSE"]); // Mark missing minutes as FALSE
        }

        // Increment by 1 minute
        currentTime = currentTime.add(1, "minute");
    }
    console.log(completeData);

    // Step 4: Prepare data for the BarChart
    const labels = completeData.map(
        (item) => dayjs(item[0], "YYYY-MM-DD HH:mm").format("HH:mm") // Format timestamps as HH:mm for the x-axis
    );
    const seriesData = completeData.map((item) => (item[1] === "TRUE" ? 1 : 0)); // Convert TRUE to 1, FALSE to 0

    return (
        <div
            style={{
                width: "80%",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <BarChart
                xAxis={[{ scaleType: "band", data: labels }]} // Set X-axis labels
                series={[
                    {
                        label: "Human Detection (found = 1)",
                        data: seriesData,
                        color: "#E72929",
                    },
                ]}
                width={1000} // Chart width
                height={250} // Chart height
            />
        </div>
    );
};

export default TimelineGraph;
