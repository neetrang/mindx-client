"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/courses/coursesApi";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [active, setActive] = useState(0);

  const { data } = useGetAllCoursesQuery({});
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();

  const editCourseData = data?.courses?.find((c: any) => c._id === id);

  /* ======================= LOCAL STATES ======================= */

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: 0,
    estimatedPrice: 0,
    tags: "",
    level: "",
    categories: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState<{ title: string }[]>([]);
  const [prerequisites, setPrerequisites] = useState<{ title: string }[]>([]);
  const [courseContentData, setCourseContentData] = useState<any[]>([]);
  const [courseData, setCourseData] = useState<any>({});

  /* ======================= INIT DATA (CLONE SÂU) ======================= */

  useEffect(() => {
    if (!editCourseData) return;

    setCourseInfo({
      name: editCourseData.name,
      description: editCourseData.description,
      price: Number(editCourseData.price),
      estimatedPrice: Number(editCourseData.estimatedPrice),
      tags: editCourseData.tags,
      level: editCourseData.level,
      categories: editCourseData.categories,
      demoUrl: editCourseData.demoUrl,
      thumbnail: editCourseData?.thumbnail?.url || "",
    });

    setBenefits(
      editCourseData.benefits?.map((b: any) => ({ ...b })) || []
    );

    setPrerequisites(
      editCourseData.prerequisites?.map((p: any) => ({ ...p })) || []
    );

    setCourseContentData(
      editCourseData.courseData?.map((item: any) => ({
        ...item,
        links: item.links?.map((l: any) => ({ ...l })) || [],
        questions: item.questions ? [...item.questions] : [],
        suggestion: item.suggestion || "",
      })) || []
    );
  }, [editCourseData]);

  /* ======================= EFFECT RESULT ======================= */

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully");
      redirect("/admin/courses");
    }

    if (error && "data" in error) {
      toast.error((error as any).data.message);
    }
  }, [isSuccess, error]);

  /* ======================= SUBMIT HANDLERS ======================= */

  const handlePrepareCourseData = () => {
    const payload = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories: courseInfo.categories,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: benefits.map((b) => ({ title: b.title })),
      prerequisites: prerequisites.map((p) => ({ title: p.title })),
      courseData: courseContentData.map((c) => ({
        videoUrl: c.videoUrl,
        title: c.title,
        description: c.description,
        videoSection: c.videoSection,
        videoLength: c.videoLength,
        links: c.links.map((l: any) => ({
          title: l.title,
          url: l.url,
        })),
        suggestion: c.suggestion,
      })),
    };

    setCourseData(payload);
  };

  const handleCourseUpdate = async () => {
    if (!editCourseData?._id) return;
    await editCourse({ id: editCourseData._id, data: courseData });
  };

  /* ======================= RENDER ======================= */

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handlePrepareCourseData}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseUpdate}
            isEdit={true}
          />
        )}
      </div>

      <div className="w-[20%] mt-[100px] h-screen fixed right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
