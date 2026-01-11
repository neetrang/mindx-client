"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CoursesLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />

      {children}

      <Footer />
    </>
  );
}
