"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import Image from "next/image";
import avatar from "../../public/assets/avatar.png";
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./Loader/Loader";

const logoLight = "/assets/logo.svg";
const logoDark = "/assets/logo_dark.svg";


type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {});
  const { data: session } = useSession();

  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);

  useLogOutQuery(undefined, { skip: !logout });

  // Handle Social Login Sync
  useEffect(() => {
    if (isLoading) return;

    if (!userData && session) {
      socialAuth({
        email: session.user?.email,
        name: session.user?.name,
        avatar: session.user?.image,
      });
      refetch();
    }

    if (session === null && isSuccess) {
      toast.success("Đăng nhập thành công!");
    }

    if (session === null && !isLoading && !userData) {
      setLogout(true);
    }
  }, [session, userData, isSuccess]);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 85);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseSidebar = (e: any) => {
    if (e.target.id === "screen") setOpenSidebar(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full relative">
          {/* Header */}
          <div
            className={`${
              active
                ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80]"
            }`}
          >
            <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
              <div className="w-full h-[80px] flex items-center justify-between p-3">

                {/* ---------- LOGO ---------- */}
                <Link href="/" className="flex items-center">
                  <Image
                    src={logoLight}
                    alt="logo"
                    className="block dark:hidden"
                    width={140}
                    height={50}
                  />
                  <Image
                    src={logoDark}
                    alt="logo"
                    className="hidden dark:block"
                    width={140}
                    height={50}
                  />
                </Link>

                {/* ------------ RIGHT MENU ------------ */}
                <div className="flex items-center">
                  <NavItems activeItem={activeItem} isMobile={false} />
                  <ThemeSwitcher />

                  {/* mobile toggle */}
                  <div className="800px:hidden">
                    <HiOutlineMenuAlt3
                      size={25}
                      className="cursor-pointer dark:text-white text-black"
                      onClick={() => setOpenSidebar(true)}
                    />
                  </div>

                  {userData ? (
                    <Link href={"/profile"}>
                      <Image
                        src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                        alt="avatar"
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] rounded-full cursor-pointer"
                        style={{
                          border: activeItem === 5 ? "2px solid #37a39a" : "none",
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="hidden 800px:block cursor-pointer dark:text-white text-black"
                      onClick={() => setOpen(true)}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* -------- Mobile Sidebar ---------- */}
            {openSidebar && (
              <div
                id="screen"
                onClick={handleCloseSidebar}
                className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
              >
                <div className="w-[70%] h-screen fixed z-[999999] bg-white dark:bg-slate-900 dark:bg-opacity-90 right-0 top-0">

                  {/* Logo trong sidebar */}
                  <div className="px-5 py-4">
                    <Image
                      src={logoLight}
                      alt="logo"
                      width={120}
                      height={40}
                      className="block dark:hidden"
                    />
                    <Image
                      src={logoDark}
                      alt="logo"
                      width={120}
                      height={40}
                      className="hidden dark:block"
                    />
                  </div>

                  <NavItems activeItem={activeItem} isMobile={true} />

                  {userData ? (
                    <Link href={"/profile"}>
                      <Image
                        src={userData.user.avatar ? userData.user.avatar.url : avatar}
                        alt=""
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer"
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="ml-[20px] cursor-pointer dark:text-white text-black"
                      onClick={() => setOpen(true)}
                    />
                  )}

                  <p className="text-[16px] px-5 mt-10 text-black dark:text-white">
                    Copyright © 2025 MindX
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* -------- MODALS ---------- */}
          {open && route === "Login" && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}

          {open && route === "Sign-Up" && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}

          {open && route === "Verification" && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Header;
