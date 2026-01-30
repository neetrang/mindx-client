"use client";

import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import CourseContentList from "../Course/CourseContentList";
import { useSelector } from "react-redux";
import { FaUserGraduate } from "react-icons/fa";
import { formatPrice } from "@/app/utils/formatPrice";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setRoute: any;
  setOpen: any;
  onCreatePayment: (price: number) => Promise<void>;
};

const CourseDetails = ({
  data,
  clientSecret,
  stripePromise,
  setRoute,
  setOpen: openAuthModal,
  onCreatePayment,
}: Props) => {
  const user = useSelector((state: any) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const discountPercentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const isPurchased =
    user && user?.courses?.some((item: any) => item._id === data._id);

  const handleOrder = async () => {
    if (!user) {
      setRoute("Login");
      openAuthModal(true);
      return;
    }

    setLoading(true);
    await onCreatePayment(data.price);
    setLoading(false);
    setOpen(true);
  };

  const sectionTitleClass =
    "text-xl md:text-2xl font-semibold mb-3 text-gray-900 dark:text-white";

  return (
    <div className="flex flex-col-reverse md:flex-row gap-10 px-6 md:px-32 pt-20 relative text-gray-800 dark:text-gray-200">
      {/* LEFT */}
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {data.name}
        </h1>

        <div className="flex flex-wrap items-center gap-5 mt-2 opacity-90">
          <Ratings rating={data.ratings} />
          <span>{data.reviews?.length} đánh giá</span>
          <FaUserGraduate className="text-blue-500" size={16} />
          <span>{data.purchased} học viên</span>
        </div>

        {/* CARD */}
        {[
          {
            title: "Bạn sẽ học được gì?",
            content: (
              <ul className="space-y-1">
                {data.benefits?.map((item: any, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <IoCheckmarkDoneOutline className="text-blue-500" />
                    {item.title}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            title: "Yêu cầu trước khi học",
            content: (
              <ul className="space-y-1">
                {data.prerequisites?.map((item: any, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <IoCheckmarkDoneOutline className="text-blue-500" />
                    {item.title}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            title: "Tổng quan khóa học",
            content: <CourseContentList data={data.courseData} isDemo />,
          },
          {
            title: "Chi tiết khóa học",
            content: <p className="whitespace-pre-line">{data.description}</p>,
          },
        ].map((section, i) => (
          <div
            key={i}
            className="bg-gray-50 dark:bg-slate-800 p-5 rounded-lg border border-transparent dark:border-white/10"
          >
            <h2 className={sectionTitleClass}>{section.title}</h2>
            {section.content}
          </div>
        ))}

        {/* REVIEWS */}
        <div className="bg-gray-50 dark:bg-slate-800 p-5 rounded-lg border dark:border-white/10 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Đánh giá của học viên
          </h2>

          {data.reviews?.map((item: any, idx: number) => (
            <div
              key={idx}
              className="flex gap-3 p-3 border rounded dark:border-white/10"
            >
              <Image
                src={
                  item.user.avatar?.url ||
                  "https://res.cloudinary.com/dm16ncix5/image/upload/v1765384995/avatar_qudmto.png"
                }
                alt=""
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{item.user.name}</span>
                  <Ratings rating={item.rating} />
                </div>
                <p className="text-sm opacity-80">{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-[400px]">
        <CoursePlayer videoUrl={data.demoUrl} title={data.title} />

        <div className="bg-white dark:bg-slate-800 border dark:border-white/10 rounded-lg p-5 mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              {data.price === 0
                ? "Miễn phí"
                : formatPrice(Number(data.price))}
            </span>

            {data.estimatedPrice > data.price && (
              <span className="line-through text-gray-400">
                {formatPrice(Number(data.estimatedPrice))}
              </span>
            )}

            <span className="text-blue-500">
              Giảm {discountPercentage.toFixed(0)}%
            </span>
          </div>

          {isPurchased ? (
            <Link
              href={`/course-access/${data._id}`}
              className="block text-center py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Vào khóa học
            </Link>
          ) : (
            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-70"
            >
              {loading ? "Đang xử lý..." : "Mua ngay"}
            </button>
          )}

          <ul className="text-sm space-y-1 opacity-80">
            <li>• Bao gồm mã nguồn</li>
            <li>• Truy cập trọn đời</li>
            <li>• Chứng chỉ hoàn thành</li>
            <li>• Hỗ trợ cao cấp</li>
          </ul>
        </div>
      </div>

      {/* MODAL STRIPE */}
      {open && stripePromise && clientSecret && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[500px] bg-white dark:bg-slate-900 rounded-xl shadow p-4 relative border dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <IoCloseOutline
              size={32}
              className="absolute top-3 right-3 cursor-pointer text-gray-700 dark:text-gray-300"
              onClick={() => setOpen(false)}
            />

            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckOutForm setOpen={setOpen} data={data} user={user} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
