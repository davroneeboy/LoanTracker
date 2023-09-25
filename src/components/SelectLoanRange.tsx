import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

const SelectLoanRange = () => {
  return (
    <Space direction="vertical" size={12}>
      <RangePicker onCalendarChange={(e) => console.log(e)} />
    </Space>
  );
};

export default SelectLoanRange;
