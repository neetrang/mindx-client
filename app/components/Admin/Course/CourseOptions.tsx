import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number; // Bước hiện tại đang active
  setActive: (active: number) => void; // Hàm để thay đổi bước active
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Thông tin khóa học",   // Course Information
    "Tùy chọn khóa học",    // Course Options
    "Nội dung khóa học",    // Course Content
    "Xem trước khóa học",   // Course Preview
  ];

  return (
    <div className="flex flex-col items-start">
      {options.map((option, index) => (
        <div key={index} className="flex items-center mb-6 relative">
          <div
            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
              active >= index ? "bg-blue-500" : "bg-gray-500"
            } text-white relative z-10`}
          >
            {active > index ? <IoMdCheckmark className="text-[20px]" /> : index + 1}
          </div>

          {/* Nối các bước */}
          {index !== options.length - 1 && (
            <div
              className={`absolute left-[17px] top-[35px] w-[2px] h-[50px] ${
                active > index ? "bg-blue-500" : "bg-gray-500"
              }`}
            ></div>
          )}

          <h5
            className={`ml-4 text-[18px] ${
              active === index ? "font-bold text-blue-500" : "text-gray-700 dark:text-white"
            }`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
