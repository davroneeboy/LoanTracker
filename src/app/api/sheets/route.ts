import { NextRequest, NextResponse } from "next/server";
import { getSheetData, isSpreadsheetIdAllowed, isRangeValid } from "@/lib/google-sheets";

/**
 * Ограниченный API для данных из Google Sheets.
 * Только GET. Параметры: spreadsheetId, range (A1-нотация).
 * Токены и ключи не передаются и не возвращаются.
 */
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const spreadsheetId = searchParams.get("spreadsheetId");
    const range = searchParams.get("range");

    if (!spreadsheetId || spreadsheetId.trim() === "") {
      return NextResponse.json(
        { error: { detail: "spreadsheetId is required" }, statusCode: 400 },
        { status: 400 }
      );
    }

    if (!range || range.trim() === "") {
      return NextResponse.json(
        { error: { detail: "range is required (e.g. Sheet1!A1:D10)" }, statusCode: 400 },
        { status: 400 }
      );
    }

    if (!isSpreadsheetIdAllowed(spreadsheetId)) {
      return NextResponse.json(
        { error: { detail: "Spreadsheet not allowed" }, statusCode: 403 },
        { status: 403 }
      );
    }

    if (!isRangeValid(range)) {
      return NextResponse.json(
        { error: { detail: "Invalid range format" }, statusCode: 400 },
        { status: 400 }
      );
    }

    const data = await getSheetData(spreadsheetId, range);

    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    if (message.includes("GOOGLE_SERVICE_ACCOUNT_JSON") || message.includes("not allowed")) {
      return NextResponse.json(
        { error: { detail: "Service unavailable" }, statusCode: 503 },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: { detail: message }, statusCode: 500 },
      { status: 500 }
    );
  }
};
