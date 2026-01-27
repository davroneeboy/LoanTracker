import { DatePicker } from "antd";
import { Dispatch, SetStateAction } from "react";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

const currentDate = dayjs(Date.now());

const monthsDifference = (selectedDate: any) =>
  selectedDate.diff(currentDate, "month") + 1;

const disabledDate = (current: Dayjs) => {
  return current && current.isBefore(dayjs(), "day");
};

const SelectLoanRange: React.FC<{
  setFromDate: Dispatch<SetStateAction<number | null>>;
  setToDate: Dispatch<SetStateAction<number | null>>;
}> = ({ setFromDate, setToDate }) => {
  return (
    <RangePicker
      picker="month"
      size="large"
      disabledDate={disabledDate}
      placeholder={["Начальная дата", "Конечная дата"]}
      className="w-full rounded-lg"
      onCalendarChange={(dates) => {
        setFromDate(dates?.[0] ? monthsDifference(dates?.[0]) : null);
        setToDate(dates?.[1] ? monthsDifference(dates?.[1]) : null);
      }}
    />
  );
};

export default SelectLoanRange;
