import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "../../../../app/styles/style";
import Ratings from "../../../../app/utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { formatPrice } from "@/app/utils/formatPrice";


type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  courseData,
  handleCourseCreate,
  setActive,
  active,
  isEdit
}) => {
  const dicountPercentenge =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentengePrice = dicountPercentenge.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
  <div className="w-[90%] m-auto py-8 mb-10 text-gray-900 dark:text-white">
    {/* VIDEO */}
    <div className="w-full">
      <CoursePlayer
        videoUrl={courseData?.demoUrl}
        title={courseData?.title}
      />
    </div>

    {/* CARD GIÁ */}
    <div className="mt-6 p-6 rounded-2xl bg-white dark:bg-[#0f172a] 
                    shadow-lg border border-gray-200 dark:border-white/10 w-full">
      <div className="flex items-end gap-3">
        <h1 className="text-[32px] font-bold text-blue-600 dark:text-blue-400">
          {courseData?.price === 0 ? "Miễn phí" : formatPrice(courseData?.price)}
        </h1>

        {courseData?.estimatedPrice && (
          <span className="text-[18px] line-through text-gray-500">
            {formatPrice(courseData?.estimatedPrice)}
          </span>
        )}

        {courseData?.estimatedPrice && (
          <span className="ml-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
            -{discountPercentengePrice}%
          </span>
        )}
      </div>

      <button
        disabled
        className="mt-6 w-full h-[48px] rounded-xl bg-blue-500 text-white 
                   font-semibold text-[16px] hover:bg-blue-600 transition cursor-not-allowed"
      >
        Mua ngay
      </button>

      <div className="mt-5 space-y-2 text-gray-700 dark:text-gray-300 text-[15px]">
        <p>✔ Truy cập trọn đời</p>
        <p>✔ Bao gồm mã nguồn</p>
        <p>✔ Cập nhật miễn phí</p>
        <p>✔ Chứng chỉ hoàn thành</p>
        <p>✔ Hỗ trợ cao cấp</p>
      </div>
    </div>

    {/* CONTENT */}
    <div className="mt-12 w-full">
      <h1 className="text-[28px] font-bold text-gray-900 dark:text-white">
        {courseData?.name}
      </h1>

      <div className="flex items-center justify-between pt-3 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Ratings rating={0} />
          <span>0 đánh giá</span>
        </div>
        <span>0 học viên</span>
      </div>

      <hr className="my-8 border-gray-200 dark:border-white/10" />

      {/* BENEFITS */}
      <h2 className="text-[22px] font-semibold text-gray-900 dark:text-white">
        Bạn sẽ học được gì?
      </h2>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {courseData?.benefits?.map((item: any, index: number) => (
          <div key={index} className="flex gap-2 text-gray-700 dark:text-gray-300">
            <IoCheckmarkDoneOutline className="text-blue-500 mt-[3px]" />
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      <hr className="my-8 border-gray-200 dark:border-white/10" />

      {/* PREREQUISITES */}
      <h2 className="text-[22px] font-semibold text-gray-900 dark:text-white">
        Yêu cầu trước khi học
      </h2>

      <div className="mt-4 space-y-2">
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div key={index} className="flex gap-2 text-gray-700 dark:text-gray-300">
            <IoCheckmarkDoneOutline className="text-blue-500 mt-[3px]" />
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      <hr className="my-8 border-gray-200 dark:border-white/10" />

      {/* DESCRIPTION */}
      <h2 className="text-[22px] font-semibold text-gray-900 dark:text-white">
        Chi tiết khóa học
      </h2>
      <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
        {courseData?.description}
      </p>
    </div>

    {/* NAV BUTTONS */}
    <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Trước
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => createCourse()}
        >
         {
          isEdit ? 'Cập Nhật' : 'Tạo khóa học'
         }
        </div>
      </div>
  </div>
);

};

export default CoursePreview;
