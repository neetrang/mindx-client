"use client";

import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";


const CoursesClient = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");

  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

  const [courses, setCourses] = useState<any[]>([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (!data?.courses) return;

    let filtered = data.courses;

    if (category !== "All") {
      filtered = filtered.filter(
        (item: any) => item.categories === category
      );
    }

    if (search) {
      filtered = filtered.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setCourses(filtered);
  }, [data, category, search]);

  const categories = categoriesData?.layout?.categories;

  const router = useRouter();
  const [searchText, setSearchText] = useState(search || "");

  useEffect(() => {
    setSearchText(search || "");
  }, [search]);
  const clearSearch = () => {
  router.push("/courses");
  setCategory("All");
};
const handleSearch = () => {
  if (!searchText.trim()) {
    clearSearch();
    return;
  }

  router.push(`/courses?title=${searchText}`);
};


  if (isLoading) return <Loader />;

  return (
    <>
    {/* FILTER + SEARCH */}
    <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
      {/* LEFT: CATEGORY */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setCategory("All")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            category === "All"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              : "bg-slate-100 dark:bg-white/10"
          }`}
        >
          Tất cả
        </button>

        {categories?.map((item: any, index: number) => (
          <button
            key={index}
            onClick={() => setCategory(item.title)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === item.title
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                : "bg-slate-100 dark:bg-white/10"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* RIGHT: SEARCH */}
      <div className="relative w-full sm:w-[280px]">
       <input
          type="search"
          placeholder="Tìm khóa học..."
          value={searchText}
          onChange={(e) => {
            const val = e.target.value;
            setSearchText(val);

            if (val === "") {
              router.push("/courses");
              setCategory("All");
            }
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="
            w-full h-[42px] rounded-full
            pl-4 pr-10 text-sm
            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-400
            appearance-none
            [&::-webkit-search-cancel-button]:hidden
          "
        />
        {/* ICON SEARCH / CLEAR */}
        {searchText ? (
          <button
            onClick={() => {
              setSearchText("");
              router.push("/courses");
              setCategory("All");
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        ) : (
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
          >
            <BiSearch size={20} />
          </button>
        )}
      </div>
    </div>


      {/* COURSES */}
      {!courses.length ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className={`${styles.label} text-center`}>
            {search
              ? "Không tìm thấy khóa học phù hợp."
              : "Hiện chưa có khóa học trong danh mục này."}
          </p>
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((item: any, index: number) => (
            <CourseCard key={index} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default CoursesClient;
