import { Skeleton } from "antd";

const Loading = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
    <Skeleton active paragraph={{ rows: 8 }} />
  </div>
);

export default Loading;
