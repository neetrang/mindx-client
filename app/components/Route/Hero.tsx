'use client'
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import img1 from "../../../public/assets/banner-img-1.png"
import img3 from "../../../public/assets/banner-img-3.png"

type Props = {};

const TypingPastelText = ({ text }: { text: string }) => {
  const [display, setDisplay] = useState("");

  React.useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 bg-clip-text text-transparent animate-pastelFade">
      {display}
    </span>
  );
};

const Hero: FC<Props> = (props) => {
  const { data,isLoading } = useGetHeroDataQuery("Banner", {});
  const [search,setSearch] = useState("");
  const router = useRouter()
  

  const handleSearch = () => {
   if(search === ""){
    return
   }else{
    router.push(`/courses?title=${search}`);
   }
  }


  return (
   <>
   {
    isLoading ? (
      <Loader />
    ) : (
      <div className="w-full 1000px:flex items-center">
      <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14"></div>
      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
        <Image
          src={data?.layout?.banner?.image?.url || img3}
          width={400}
          height={400}
          alt=""
          className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
        />
      </div>
      <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
        <h2 className="text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%]">
          <TypingPastelText
            text={
              data?.layout?.banner?.title ||
              "Nâng cao trải nghiệm học tập trực tuyến của bạn ngay lập tức"
            }
          />
        </h2>
        <br />
        <p className="font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%] text-black/70 dark:text-white/80 leading-relaxed">
          {data?.layout?.banner?.subTitle ||
            "Chúng tôi có nhiều khóa học trực tuyến với hàng trăm nghìn học viên. Hãy tìm khóa học phù hợp với bạn."}
        </p>

        <br />
        <br />
       <div className="relative w-[90%] 1100px:w-[78%] 1500px:w-[55%] h-[56px] rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
          <input
            type="search"
            placeholder="Tìm khóa học..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full h-full bg-transparent pl-6 pr-[64px] text-[18px] font-Josefin text-black/70 dark:text-white/90 placeholder:text-black/40 dark:placeholder:text-white/50 outline-none"
          />

          <button
            onClick={handleSearch}
            className="absolute top-1/2 right-2 -translate-y-1/2 h-[44px] w-[44px] rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-sky-300 flex items-center justify-center transition hover:scale-105"
          >
            <BiSearch className="text-white" size={22} />
          </button>
      </div>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
        <Image src="/assets/client-1.png" width={40} height={40} alt="Client 1" className="rounded-full" />
          <Image src="/assets/client-2.png" width={40} height={40} alt="Client 2" className="rounded-full ml-[-20px]" />
          <Image src="/assets/client-3.png" width={40} height={40} alt="Client 3" className="rounded-full ml-[-20px]" />
          <p className="font-Josefin font-[600] text-[18px] 1000px:pl-3 text-black/70 dark:text-white/80">
            500K+ người đã tin tưởng MindX.{" "}
            <Link
              href="/courses"
              className="font-[600] text-black/90 dark:text-white hover:underline transition"
            >
              Xem khóa học.
            </Link>
          </p>
        </div>
        <br />
      </div>
    </div>
    )
   }
   </>
  );
};

export default Hero;
