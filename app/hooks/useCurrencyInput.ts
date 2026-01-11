import { useState } from "react";

export const useCurrencyInput = (initialValue: number = 0) => {
  const [rawValue, setRawValue] = useState<number>(initialValue);

  // Hàm format sang VNĐ hiển thị
  const formatDisplayValue = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);

  // Hàm xử lý khi user nhập
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^\d]/g, ""); // giữ lại số
    const numericValue = Number(input || 0);
    setRawValue(numericValue);
  };

  return {
    rawValue,
    displayValue: formatDisplayValue(rawValue),
    setRawValue,
    handleChange,
  };
};
