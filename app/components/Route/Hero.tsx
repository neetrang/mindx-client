'use client'
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import img1 from "../../../public/assets/banner-img-1.png";
import hero_product_img1 from "../../../public/assets/hero_product_img1.png";
import hero_product_img2 from "../../../public/assets/hero_product_img2.png";

type Props = {};

const Hero: FC<Props> = () => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") return;
    router.push(`/courses?title=${search}`);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mx-6">
          <div className="flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10">
            {/* Banner lớn */}
            <div className="relative flex-1 flex xl:flex-row flex-col bg-green-200 rounded-3xl overflow-hidden min-h-[400px]">
              {/* Cột trái: chữ + search + clients */}
              <div className="flex-1 p-5 sm:p-16 flex flex-col justify-center z-10">
                <h2 className="text-3xl sm:text-5xl leading-[1.2] my-3 font-medium bg-gradient-to-r from-slate-600 to-[#A0FF74] bg-clip-text text-transparent max-w-xs sm:max-w-md">
                  {data?.layout?.banner?.title || "Cải thiện trải nghiệm học trực tuyến của bạn ngay lập tức"}
                </h2>
                <p className="text-slate-800 text-sm font-medium mt-4 sm:mt-8">
                  {data?.layout?.banner?.subTitle || "Chúng tôi có nhiều khóa học trực tuyến và nhiều học viên đã đăng ký. Tìm khóa học bạn mong muốn từ chúng tôi."}
                </p>

                {/* Search */}
                <div className="mt-6 w-full max-w-md h-[50px] relative">
                  <input
                    type="search"
                    placeholder="Nhập tên khóa học..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-white border border-gray-300 dark:border-none dark:bg-[#575757] placeholder:text-gray-500 rounded-[5px] p-2 w-full h-full outline-none text-black dark:text-white text-[20px] font-[500] font-Josefin shadow-md"
                  />
                  <div
                    className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                    onClick={handleSearch}
                  >
                    <BiSearch className="text-white" size={30} />
                  </div>
                </div>

                {/* Clients + View Courses */}
                <div className="flex items-center mt-6 gap-3">
                  <Image src="/assets/client-1.png" width={40} height={40} alt="Client 1" className="rounded-full" />
                  <Image src="/assets/client-2.png" width={40} height={40} alt="Client 2" className="rounded-full ml-[-20px]" />
                  <Image src="/assets/client-3.png" width={40} height={40} alt="Client 3" className="rounded-full ml-[-20px]" />
                  <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] pl-3 text-[18px] font-[600]">
                    Hơn 500K người đã tin tưởng chúng tôi.{" "}
                    <Link href="/courses" className="dark:text-[#46e256] text-[crimson]">
                      Xem khóa học
                    </Link>
                  </p>
                </div>
              </div>

              {/* Cột phải: hình banner */}
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src={data?.layout?.banner?.image?.url || img1}
                  alt="Banner"
                  className="w-full max-w-[400px] h-full max-h-[400px] object-contain"
                />
              </div>
            </div>

            {/* 2 hero product bên cạnh */}
            <div className="flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600">
              <div className="flex-1 flex items-center justify-between w-full bg-orange-200 rounded-3xl p-6 px-8 group overflow-hidden">
                <div>
                  <p className="text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#FFAD51] bg-clip-text text-transparent max-w-40">
                    Sản phẩm tốt nhất
                  </p>
                  <p className="flex items-center gap-1 mt-4">
                    Xem thêm
                  </p>
                </div>
                <Image
                  className="w-full max-w-[120px] h-auto object-contain"
                  src={hero_product_img1}
                  alt="Product 1"
                />
              </div>
              <div className="flex-1 flex items-center justify-between w-full bg-blue-200 rounded-3xl p-6 px-8 group overflow-hidden">
                <div>
                  <p className="text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#78B2FF] bg-clip-text text-transparent max-w-40">
                    Giảm giá 20%
                  </p>
                  <p className="flex items-center gap-1 mt-4">
                    Xem thêm
                  </p>
                </div>
                <Image
                  className="w-full max-w-[120px] h-auto object-contain"
                  src={hero_product_img2}
                  alt="Product 2"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
