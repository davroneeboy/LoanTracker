/**
 * Серверный модуль для работы с Google Sheets API.
 * Использовать только в API routes (getServerSideProps, route handlers).
 * Никогда не импортировать на клиенте и не экспортировать секреты.
 */

import { google } from "googleapis";

const SPREADSHEET_ID_ALLOWLIST_KEY = "SPREADSHEET_ALLOWED_IDS";
const CREDENTIALS_KEY = "GOOGLE_SERVICE_ACCOUNT_JSON";

type CredentialsJson = {
  type: string;
  project_id?: string;
  private_key_id?: string;
  private_key: string;
  client_email: string;
  client_id?: string;
  auth_uri?: string;
  token_uri?: string;
};

const getCredentials = (): CredentialsJson => {
  const raw = process.env[CREDENTIALS_KEY];
  if (!raw || raw.trim() === "") {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not set");
  }
  try {
    const parsed = JSON.parse(raw) as CredentialsJson;
    if (!parsed.client_email || !parsed.private_key) {
      throw new Error("Invalid service account JSON: missing client_email or private_key");
    }
    return parsed;
  } catch {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON");
  }
};

const getAllowedSpreadsheetIds = (): string[] => {
  const raw = process.env[SPREADSHEET_ID_ALLOWLIST_KEY];
  if (!raw || raw.trim() === "") {
    return [];
  }
  return raw.split(",").map((id) => id.trim()).filter(Boolean);
};

/**
 * Проверяет, разрешён ли spreadsheetId (если задан allowlist — только из списка).
 */
export const isSpreadsheetIdAllowed = (spreadsheetId: string): boolean => {
  const allowed = getAllowedSpreadsheetIds();
  if (allowed.length === 0) {
    return true;
  }
  return allowed.includes(spreadsheetId);
};

/**
 * Допустимый range: A1-нотация, опционально с именем листа. Например: "Sheet1!A1:D10" или "A1:B2".
 */
const A1_RANGE_REGEX = /^([A-Za-z0-9_\s]+!)?[A-Z]+\d+(:[A-Z]+\d+)?$/i;

export const isRangeValid = (range: string): boolean => {
  if (!range || range.length > 100) {
    return false;
  }
  return A1_RANGE_REGEX.test(range.trim());
};

/**
 * Возвращает клиент Google Sheets (только на сервере).
 */
const getSheetsClient = () => {
  const credentials = getCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
};

/**
 * Читает данные из листа. Вызывать только из API route.
 * @param spreadsheetId — ID таблицы (должен быть в allowlist, если он задан)
 * @param range — диапазон в A1-нотации (валидируется)
 */
export const getSheetData = async (
  spreadsheetId: string,
  range: string
): Promise<string[][]> => {
  if (!isSpreadsheetIdAllowed(spreadsheetId)) {
    throw new Error("Spreadsheet not allowed");
  }
  if (!isRangeValid(range)) {
    throw new Error("Invalid range");
  }
  const sheets = getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: range.trim(),
  });
  const rows = response.data.values;
  if (!rows || rows.length === 0) {
    return [];
  }
  return rows as string[][];
};
