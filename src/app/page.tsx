"use client";

import { useEffect, useState } from "react";
import TimelineGraph from "./components/TimeLineGraph";
import HumanDetectionLog from "./components/HumanDetectionLog";

export default function Home() {
    const [sheetData, setSheetData] = useState<
        [string, string, string][] | null
    >(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/sheet");
                if (!res.ok)
                    throw new Error("Failed to fetch Google Sheets data");
                const data = await res.json();

                //TODO: reverse the array of data
                const reversedData = data.reverse();
                setSheetData(reversedData);
            } catch (err: unknown) {
                console.log(err);
            }
        };

        // Fetch data immediately on mount
        fetchData();

        // Set up polling every 1 minute (60000 ms)
        const intervalId = setInterval(fetchData, 60000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    marginTop: "20px",
                }}
            >
                Human Detection
            </h1>
            <HumanDetectionLog sheetData={sheetData || null} />

            <TimelineGraph data={sheetData || null} />
        </div>
    );
}
