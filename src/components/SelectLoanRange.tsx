import { DatePicker, Space } from "antd";
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
    <Space direction="vertical" size={12}>
      <RangePicker
        picker="month"
        disabledDate={disabledDate}
        onCalendarChange={(dates) => {
          setFromDate(dates?.[0] ? monthsDifference(dates?.[0]) : null);
          setToDate(dates?.[1] ? monthsDifference(dates?.[1]) : null);
        }}
      />
    </Space>
  );
};

export default SelectLoanRange;
