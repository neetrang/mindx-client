import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";

const Courses = () => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (data?.courses) {
      setCourses(data.courses);
    }
  }, [data]);

  return (
    <section className="relative py-20">
      <div className="w-[90%] 900px:w-[85%] max-w-[1400px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="font-Roboto font-extrabold text-[26px] sm:text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
            Mở Rộng Cơ Hội{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Nghề Nghiệp
            </span>
          </h2>

          <p className="mt-4 text-[16px] sm:text-[17px] text-slate-600 dark:text-white/70 max-w-[720px] mx-auto">
            Lựa chọn từ hàng trăm khóa học chất lượng cao, được thiết kế để giúp
            bạn nâng cao kỹ năng và sẵn sàng cho công việc thực tế.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 1500px:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[340px] rounded-2xl bg-slate-200 dark:bg-white/10 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Courses Grid */}
        {!isLoading && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 1500px:grid-cols-4 gap-6 1500px:gap-8">
            {courses.map((item: any, index: number) => (
              <div
                key={index}
                className="
                  h-full
                  group
                  rounded-2xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-[0_20px_40px_rgba(56,189,248,0.25)]
                "
              >
                <CourseCard item={item} />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && courses.length === 0 && (
          <div className="text-center text-slate-500 dark:text-white/60 mt-20">
            Hiện chưa có khóa học nào được đăng.
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;
