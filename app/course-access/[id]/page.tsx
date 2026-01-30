"use client";

import CourseContent from "@/app/components/Course/CourseContent";
import { useSelector } from "react-redux";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { id }: any = useParams();
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    if (!user) redirect("/");
    const isPurchased = user.courses?.find((c: any) => c._id === id);
    if (!isPurchased) redirect("/");
  }, [user, id]);

  if (!user) return null;

  return <CourseContent id={id} user={user} />;
};

export default Page;
