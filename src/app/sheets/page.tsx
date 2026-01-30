"use client";

import { useState, useCallback } from "react";
import { Table, Button, Input, Space, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import fetcher from "@/utils/fetcher";
import appendKeyProp from "@/utils/appendKeyProp";

type SheetRow = Record<string, string>;

const DEFAULT_RANGE = "A1:Z100";

const SheetsPage = () => {
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [range, setRange] = useState(DEFAULT_RANGE);
  const [data, setData] = useState<SheetRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [api, contextHolder] = notification.useNotification();

  const handleLoad = useCallback(async () => {
    const id = spreadsheetId.trim();
    const r = range.trim() || DEFAULT_RANGE;
    if (!id) {
      api.warning({
        message: "Введите ID таблицы",
        placement: "topRight",
        duration: 3,
      });
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const raw = await fetcher(
        `/api/sheets?spreadsheetId=${encodeURIComponent(id)}&range=${encodeURIComponent(r)}`
      );
      if (!Array.isArray(raw) || raw.length === 0) {
        setData([]);
        return;
      }
      const headers = raw[0] as string[];
      const rows: SheetRow[] = raw.slice(1).map((row: string[]) => {
        const obj: SheetRow = {};
        headers.forEach((h, i) => {
          obj[h] = row[i] ?? "";
        });
        return obj;
      });
      setData(rows);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Ошибка загрузки";
      setError(message);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [spreadsheetId, range, api]);

  const handleKeyDownSubmit = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleLoad();
      }
    },
    [handleLoad]
  );

  const columns: ColumnsType<SheetRow> = data.length
    ? Object.keys(data[0]).map((key) => ({
        title: key,
        dataIndex: key,
        key,
        ellipsis: true,
        render: (val: string) => (
          <span className="text-slate-700">{val ?? ""}</span>
        ),
      }))
    : [];

  return (
    <div className="space-y-6">
      {contextHolder}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Данные из Google Таблиц
        </h1>
        <p className="text-slate-500 mb-4">
          Введите ID таблицы и диапазон (A1-нотация). Доступ только к разрешённым таблицам.
        </p>
        <Space direction="vertical" size="middle" className="w-full max-w-xl">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="sheets-spreadsheet-id"
              className="text-sm font-medium text-slate-700"
            >
              ID таблицы
            </label>
            <Input
              id="sheets-spreadsheet-id"
              placeholder="Из URL: docs.google.com/spreadsheets/d/ID/edit"
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
              onKeyDown={handleKeyDownSubmit}
              aria-label="ID таблицы Google Sheets"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="sheets-range"
              className="text-sm font-medium text-slate-700"
            >
              Диапазон (A1)
            </label>
            <Input
              id="sheets-range"
              placeholder="Sheet1!A1:D10"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              onKeyDown={handleKeyDownSubmit}
              aria-label="Диапазон ячеек в формате A1"
              className="rounded-lg"
            />
          </div>
          <Button
            type="primary"
            onClick={handleLoad}
            loading={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600"
            aria-label="Загрузить данные из таблицы"
          >
            Загрузить
          </Button>
        </Space>
        {error && (
          <div
            className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
      {data.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <Table
            columns={columns}
            dataSource={appendKeyProp(data)}
            loading={isLoading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Всего строк: ${total}`,
            }}
            rowClassName="hover:bg-indigo-50/50 transition-colors"
            scroll={{ x: "max-content" }}
          />
        </div>
      )}
    </div>
  );
};

export default SheetsPage;
