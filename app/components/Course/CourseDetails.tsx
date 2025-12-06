'use client'
import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Image from "next/image";
import CourseContentList from "../Course/CourseContentList";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  data: any;
  setRoute: any;
  setOpen: any;
};

const CourseDetails = ({ data, setRoute, setOpen: openAuthModal }: Props) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const discountPercentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleOrder = async () => {
    if (!user) {
      setRoute("Login");
      openAuthModal(true);
      return;
    }
  
    try {
      const orderData = { courseId: data._id };
      const response = await createOrder(orderData).unwrap();
      if (response?.success) {
        toast(response.message || "Đặt mua thành công!");
        refetch();
      } else {
        toast("Đặt mua thất bại: " + (response?.message || "Có lỗi xảy ra"));
      }
    } catch (err: any) {
      console.error("❌ Lỗi đặt mua:", err);
      toast("Lỗi xử lý đơn hàng: " + (err?.data?.message || "Lỗi không xác định"));
    }
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} đánh giá
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} học viên
              </h5>
            </div>

            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Bạn sẽ học được gì từ khóa học này?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div className="w-full flex 800px:items-center py-2" key={index}>
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white" />
                  </div>
                  <p className="pl-2 text-black dark:text-white">{item.title}</p>
                </div>
              ))}
              <br />
            </div>

            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Yêu cầu cần có trước khi bắt đầu khóa học
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />

            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Tổng quan khóa học
            </h1>
            <CourseContentList data={data?.courseData} isDemo={true} />
            <br />

            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Chi tiết khóa học
            </h1>
            <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
              {data.description}
            </p>
            <br />

            <div className="800px:flex items-center">
              <Ratings rating={data?.ratings} />
              <div className="mb-2 800px:mb-[unset]" />
              <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                {Number.isInteger(data?.ratings)
                  ? data?.ratings.toFixed(1)
                  : data?.ratings.toFixed(2)}{" "}
                Đánh giá khóa học • {data?.reviews?.length} đánh giá
              </h5>
            </div>
            <br />

            {(data?.reviews && [...data.reviews].reverse()).map(
              (item: any, index: number) => (
                <div className="w-full pb-4" key={index}>
                  <div className="flex">
                    <div className="w-[50px] h-[50px]">
                      <Image
                        src={
                          item.user.avatar
                            ? item.user.avatar.url
                            : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                        }
                        width={50}
                        height={50}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full object-cover"
                      />
                    </div>
                    <div className="hidden 800px:block pl-2">
                      <div className="flex items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                      <p className="text-black dark:text-white">{item.comment}</p>
                      <small className="text-[#000000d1] dark:text-[#ffffff83]">
                        {item.createdAt} •
                      </small>
                    </div>
                    <div className="pl-2 flex 800px:hidden items-center">
                      <h5 className="text-[18px] pr-2 text-black dark:text-white">
                        {item.user.name}
                      </h5>
                      <Ratings rating={item.rating} />
                    </div>
                  </div>
                  {item.commentReplies.map((i: any, index: number) => (
                    <div className="w-full flex 800px:ml-16 my-5" key={index}>
                      <div className="w-[50px] h-[50px]">
                        <Image
                          src={
                            i.user.avatar
                              ? i.user.avatar.url
                              : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                          }
                          width={50}
                          height={50}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[20px]">{i.user.name}</h5>{" "}
                          <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                        </div>
                        <p>{i.comment}</p>
                        <small className="text-[#ffffff83]">{i.createdAt} •</small>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

          {/* Phần mua khóa học */}
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] text-black dark:text-white">
                  {data.price === 0 ? "Miễn phí" : `Giá khóa học: ${data.price}$`}
                </h1>
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                  {data.estimatedPrice}$  // Giá gốc
                </h5>
                <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
                  Giảm {discountPercentagePrice}%
                </h4>
              </div>

              {/* Nút mua khóa học */}
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    href={`/course-access/${data._id}`}
                  >
                    Vào khóa học
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    onClick={handleOrder}
                  >
                    {isLoading ? "Đang xử lý..." : `Mua ngay ${data.price}$`}
                  </div>
                )}
              </div>

              <br />
              <p className="pb-1 text-black dark:text-white">• Bao gồm mã nguồn</p>
              <p className="pb-1 text-black dark:text-white">• Truy cập trọn đời</p>
              <p className="pb-1 text-black dark:text-white">• Chứng chỉ hoàn thành</p>
              <p className="pb-3 800px:pb-1 text-black dark:text-white">• Hỗ trợ cao cấp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
