import Link from "next/link";
import React from "react";

export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

// Màu theo từng index
const activeColors = [
  "text-green-500",   // Home
  "text-orange-500",  // Courses
  "text-blue-500",    // About
  "text-purple-500",  // Policy
  "text-pink-500",    // FAQ
];

type Props = {
  activeItem: number;
  isMobile: boolean;
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
                    ? activeColors[index] // màu riêng cho từng mục
                    : "dark:text-white text-black"
                }
                text-[18px] px-6 font-Poppins font-[400]
              `}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile */}
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                MindX
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
                  block py-5 text-[18px] px-6 font-Poppins font-[400]
                `}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
