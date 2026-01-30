"use client";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import "@/app/utils/timeago-vi";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardHeader: FC<any> = ({ open, setOpen }) => {
  const {
    data,
    refetch,
    isUninitialized,
  } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationStatus] = useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);

  const [audio] = useState<any>(
    typeof window !== "undefined" &&
      new Audio(
        "https://res.cloudinary.com/dm16ncix5/video/upload/v1767979914/nhac_chuong_thong_bao_messenger-www_tiengdong_com_b2adus.mp3"
      )
  );

  const playNotificationSound = () => {
    audio?.play();
  };

  // cập nhật danh sách thông báo
  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
  }, [data]);

  // socket listener (AN TOÀN)
  useEffect(() => {
    const handler = () => {
      if (!isUninitialized) {
        refetch();
      }
      playNotificationSound();
    };

    socketId.on("newNotification", handler);

    return () => {
      socketId.off("newNotification", handler);
    };
  }, [isUninitialized, refetch]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
    refetch();
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-[9999999]">
      <ThemeSwitcher />

      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-blue-500 rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications.length}
        </span>
      </div>

      {open && (
        <div
          className="w-[350px] h-[60vh] overflow-y-scroll py-3 px-2 
                     border dark:bg-[#111C43] bg-white shadow-xl 
                     absolute top-16 rounded"
        >
          <h5 className="text-center text-[20px] font-Roboto p-3">
            Thông báo
          </h5>

          {notifications.map((item: any) => (
            <div
              key={item._id}
              className="bg-gray-100 dark:bg-[#2d3a4e] border-b p-2"
            >
              <div className="flex justify-between">
                <p>{item.title}</p>
                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleNotificationStatusChange(item._id)}
                >
                  Đã đọc
                </p>
              </div>
              <p className="text-sm">{item.message}</p>
              <p className="text-xs text-gray-500">
                {format(item.createdAt, "vi")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
