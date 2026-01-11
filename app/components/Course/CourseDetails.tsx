'use client';

import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Image from "next/image";
import CourseContentList from "../Course/CourseContentList";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { FaUserGraduate } from "react-icons/fa";
import { formatPrice } from "@/app/utils/formatPrice";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";


type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setRoute: any;
  setOpen: any; // modal login
};

const CourseDetails = ({
  data,
  clientSecret,
  stripePromise,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false); // modal thanh toán

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const discountPercentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.some((item: any) => item._id === data._id);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleOrder = async () => {
    if (!user) {
      setRoute("Login");
      openAuthModal(true);
      return;
    }

    setOpen(true); // mở modal thanh toán
  };

  const sectionTitleClass =
    "text-xl md:text-2xl font-semibold mb-3 text-gray-900 dark:text-white";

  return (
    <div className="flex flex-col-reverse md:flex-row gap-10 px-6 md:px-32 pt-20 relative">
      {/* LEFT */}
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold">{data.name}</h1>

        <div className="flex flex-wrap items-center gap-5 mt-2">
          <Ratings rating={data.ratings} />
          <span className="opacity-80">{data.reviews?.length} đánh giá</span>
          <FaUserGraduate className="text-blue-500" size={16} />
          <span>{data.purchased} học viên</span>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <h2 className={sectionTitleClass}>Bạn sẽ học được gì?</h2>
          <ul className="list-disc ml-5 space-y-1">
            {data.benefits?.map((item: any, idx: number) => (
              <li key={idx} className="flex items-center gap-2">
                <IoCheckmarkDoneOutline className="text-blue-500" />
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <h2 className={sectionTitleClass}>Yêu cầu trước khi học</h2>
          <ul className="list-disc ml-5 space-y-1">
            {data.prerequisites?.map((item: any, idx: number) => (
              <li key={idx} className="flex items-center gap-2">
                <IoCheckmarkDoneOutline className="text-blue-500" />
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <h2 className={sectionTitleClass}>Tổng quan khóa học</h2>
          <CourseContentList data={data.courseData} isDemo />
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <h2 className={sectionTitleClass}>Chi tiết khóa học</h2>
          <p className="whitespace-pre-line">{data.description}</p>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">Student Reviews</h2>
          {data.reviews?.map((item: any, idx: number) => (
            <div key={idx} className="flex gap-3 p-3 border rounded">
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

        <div className="bg-white border rounded-lg p-5 mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold">
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
              Giảm {discountPercentagePrice}%
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
              disabled={isLoading}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isLoading ? "Đang xử lý..." : "Mua ngay"}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-[500px] bg-white rounded-xl shadow p-4 relative">
            <IoCloseOutline
              size={32}
              className="absolute top-3 right-3 cursor-pointer"
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
