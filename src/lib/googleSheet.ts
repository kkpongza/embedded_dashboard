import { google } from "googleapis";

export async function fetchGoogleSheetData(
    sheetId: string,
    range: string
): Promise<string[][] | null> {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            type: "service_account",
            project_id: "global-harmony-442806-r3",
            private_key_id: "3ca7eeaa89e30b3d1206273a2bf83276f970f46d",
            private_key: `${process.env.PRIVATE_KEY}`.replace(/\\n/g, "\n"),
            client_email:
                "python-api@global-harmony-442806-r3.iam.gserviceaccount.com",
            client_id: "117469706565328476732",
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range,
    });

    return response.data.values || null;
}
