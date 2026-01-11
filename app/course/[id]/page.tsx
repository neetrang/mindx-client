"use client";
import React from "react";
import CourseDetailsPage from "../../components/Course/CourseDetailsPage";
import { useParams } from "next/navigation";

const Page = () => {
    const params = useParams(); 
    
    if (!params?.id) {
        return <div>Loading...</div>; // Xử lý các tham số không xác định
    }

    const id = Array.isArray(params.id) ? params.id[0] : params.id; //  Đảm bảo rằng id luôn là một chuỗi
    return (
        <div>
            <CourseDetailsPage id={id} /> 
        </div>
    );
};

export default Page;

 