"use client";
import React from "react";
import CourseDetailsPage from "../../components/Course/CourseDetailsPage";
import { useParams } from "next/navigation";

const Page = () => {
    const params = useParams(); 
    
    if (!params?.id) {
        return <div>Loading...</div>; // Handle undefined params
    }

    const id = Array.isArray(params.id) ? params.id[0] : params.id; // ✅ Ensure id is always a string

    return (
        <div>
            <CourseDetailsPage id={id} /> {/* ✅ Now id is always a string */}
        </div>
    );
};

export default Page;

 