import { fetchGoogleSheetData } from "@/lib/googleSheet";
import { NextResponse } from "next/server";

export async function GET() {
    const sheetId = "1YRwQumypfdpou0Zm4k70Xy7jJ1BmT-tHclBRXyaVBXQ";
    const range = "log!A:B";

    try {
        const data = await fetchGoogleSheetData(sheetId, range);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
        return NextResponse.json(
            { error: "Failed to fetch data from Google Sheets" },
            { status: 500 }
        );
    }
}
