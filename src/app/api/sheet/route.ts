import { fetchGoogleSheetData } from "@/lib/googleSheet";
import { NextResponse } from "next/server";

export async function GET() {
    const sheetId = "1YRwQumypfdpou0Zm4k70Xy7jJ1BmT-tHclBRXyaVBXQ";
    const range = "log!A:C";

    try {
        const data = await fetchGoogleSheetData(sheetId, range);
        const response = NextResponse.json(data);
        response.headers.set("Cache-Control", "no-store");
        return response;
    } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
        return NextResponse.json(
            { error: "Failed to fetch data from Google Sheets" },
            { status: 500 }
        );
    }
}
