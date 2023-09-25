const monthToPaymentDate = (monthOffset: number) => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + monthOffset - 1);

  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString("en-US", { month: "short" });

  return `${month} ${year}`;
};

export default monthToPaymentDate;
