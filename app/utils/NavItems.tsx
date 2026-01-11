import Link from "next/link";
import React from "react";

// Dữ liệu các mục điều hướng
export const navItemsData = [
  { name: "Trang chủ", url: "/" },          // Home
  { name: "Khóa học", url: "/courses" },    // Courses
  { name: "Giới thiệu", url: "/about" },    // About
  { name: "Chính sách", url: "/policy" },  // Policy
  { name: "FAQ", url: "/faq" }, // FAQ
];

// Màu sắc cho từng mục theo index
const activeColors = [
  "text-green-500",   // Trang chủ
  "text-orange-500",  // Khóa học
  "text-blue-500",    // Giới thiệu
  "text-purple-500",  // Chính sách
  "text-pink-500",    // Câu hỏi thường gặp
];

type Props = {
  activeItem: number; // mục hiện tại đang active
  isMobile: boolean;  // kiểm tra hiển thị trên mobile
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* PC */}
      <div className="hidden 800px:flex">
        {navItemsData.map((item, index) => (
          <Link href={item.url} key={index} passHref>
            <span
              className={`
                ${
                  activeItem === index
                    ? activeColors[index] // màu riêng cho từng mục active
                    : "dark:text-white text-black"
                }
                text-[18px] px-6 font-Roboto font-[400]
              `}
            >
              {item.name} {/* Hiển thị tên mục bằng tiếng Việt */}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile */}
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span className="text-[25px] font-Roboto font-[500] text-black dark:text-white">
                MindX {/* Tên thương hiệu giữ nguyên */}
              </span>
            </Link>
          </div>

          {navItemsData.map((item, index) => (
            <Link href={item.url} passHref key={index}>
              <span
                className={`
                  ${
                    activeItem === index
                      ? activeColors[index]
                      : "dark:text-white text-black"
                  }
                  block py-5 text-[18px] px-6 font-Roboto font-[400]
                `}
              >
                {item.name} {/* Hiển thị tên mục bằng tiếng Việt */}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
