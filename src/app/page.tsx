"use client";

import { useEffect, useState } from "react";
import TimelineGraph from "./components/TimeLineGraph";

export default function Home() {
    const [sheetData, setSheetData] = useState<[string, string][] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/sheet");
                if (!res.ok)
                    throw new Error("Failed to fetch Google Sheets data");
                const data = await res.json();
                setSheetData(data);
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
                Google Sheets Data
            </h1>
            <div
                style={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <TimelineGraph data={sheetData || [["", ""]]} />
            </div>

            {/* {error ? (
                <p>Error: {error}</p>
            ) : (
                <pre>{JSON.stringify(sheetData, null, 2)}</pre>
            )} */}
        </div>
    );
}
