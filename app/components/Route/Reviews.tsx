import React from "react";
import Image from "next/image";
import { styles } from "@/app/styles/style";
import im from "../../../public/assets/business-img.png";

export const reviews = [
  {
    name: "Nguyễn Văn A",
    role: "Lập trình viên @ FPT",
    image: "/assets/profile_img_1.png",
    rating: 5,
    feedback:
      "Tôi đã học khóa học này gần 2 năm, đặc biệt là về JavaScript, và cảm thấy rất dễ hiểu.",
  },
  {
    name: "Trần Thị B",
    role: "Lập trình viên @ VinTech",
    image: "/assets/profile_img_2.png",
    rating: 5,
    feedback:
      "Khóa học rất trực quan và dễ theo dõi, giúp tôi áp dụng kiến thức vào dự án thực tế.",
  },
  {
    name: "Lê Văn C",
    role: "Lập trình viên @ FPT",
    image: "/assets/profile_img_3.png",
    rating: 5,
    feedback:
      "Các bài học được thiết kế logic và chi tiết, tôi học được nhiều kỹ năng mới và áp dụng được ngay.",
  },
];

const Reviews = () => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto pb-20">
      {/* IMAGE + TITLE (GIỮ NGUYÊN LAYOUT CŨ) */}
      <div className="w-full flex flex-col 800px:flex-row items-center gap-12">
        {/* IMAGE */}
        <div className="800px:w-[50%] w-full flex justify-center relative">
          {/* GLOW PHÍA SAU */}
          <div className="absolute w-[420px] h-[420px] bg-cyan-300/30 blur-[120px] rounded-full" />

          <Image
            src={im}
            alt="business"
            width={650}
            height={650}
            className="relative z-10 object-contain"
          />
        </div>

        {/* TEXT */}
        <div className="800px:w-[50%] w-full">
          <h2 className={`${styles.title} 800px:text-[40px] font-extrabold`}>
            Cảm Nhận Học Viên{" "}
            <span className="text-gradient font-extrabold">MindX</span>
          </h2>

          <p className="text-gray-600 dark:text-white mt-4 leading-relaxed">
            Lắng nghe những chia sẻ chân thật từ học viên về hành trình thay đổi
            bản thân thông qua việc học tập tại MindX.
          </p>
        </div>
      </div>

      {/* TESTIMONIAL GRID (GIỮ NGUYÊN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-16">
        {reviews.map((item, index) => (
          <div
            key={index}
            className="
              bg-blue-100/60
              hover:bg-blue-200
              transition-all duration-300
              border border-gray-200
              rounded-3xl
              shadow-lg
              hover:-translate-y-1
            "
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-5 py-4 bg-white/70 rounded-t-3xl">
              <Image
                src={item.image}
                alt={item.name}
                width={55}
                height={55}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-bold text-gray-800">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm">{item.role}</p>
              </div>
            </div>

            {/* Rating + Feedback */}
            <div className="px-5 py-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-700 mt-4 font-medium leading-relaxed">
                {item.feedback}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
