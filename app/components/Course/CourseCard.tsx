import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { formatPrice } from "@/app/utils/formatPrice";


type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
    >
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] rounded-lg p-3 shadow-sm dark:shadow-inner">

        {/* Thumbnail */}
        <Image
          src={item.thumbnail.url}
          width={500}
          height={300}
          objectFit="contain"
          className="rounded w-full"
          alt=""
        />

        {/* Title */}
        <h1 className="font-Poppins font-semibold text-lg md:text-xl mt-2 text-black dark:text-white">
          {item.name}
        </h1>

        {/* === Price + Lessons (ĐƯA LÊN TRÊN) === */}
        <div className="flex items-center justify-between mt-2 text-base md:text-lg">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-black dark:text-white">
              {item.price === 0 ? "Free" : formatPrice(Number(item.price))}
            </span>

            {item.estimatedPrice && item.estimatedPrice > item.price && (
              <span className="line-through text-sm opacity-70 text-black dark:text-white">
                {formatPrice(Number(item.estimatedPrice))}
              </span>
            )}

          </div>

          <div className="flex items-center gap-1 text-black dark:text-white">
            <AiOutlineUnorderedList size={18} />
            <span>{item.courseData?.length} Bài Học</span>
          </div>
        </div>

        {/* === Ratings + Students (ĐƯA XUỐNG DƯỚI) === */}
        <div className="flex items-center justify-between mt-2 text-sm md:text-base">
          <Ratings rating={item.ratings} />
          <div className="flex items-center gap-1 text-black dark:text-white">
            <FaUserGraduate size={16} />
            <span>{item.purchased}</span>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default CourseCard;
