"use client";

import Image from "next/image";
import { styles } from "../../../app/styles/style";
import React, { FC, useState, useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { toast } from "react-hot-toast";
import {
  useUpdateAvatarMutation,
  useEditProfileMutation,
} from "@/redux/features/user/userApi";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  avatar: string | null;
};

const ProfileInfo: FC<Props> = ({ avatar }) => {
  const user = useSelector((state: any) => state.auth.user);
  const [name, setName] = useState(user?.name || "");

  // 🔥 preview avatar
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const [updateAvatar, { isSuccess }] = useUpdateAvatarMutation();
  const [editProfile] = useEditProfileMutation();

  // 🔥 refetch user sau khi update
  const { refetch } = useLoadUserQuery({});

  // ========== HANDLE AVATAR ==========
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1️⃣ preview ngay
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);

    // 2️⃣ upload lên server
    const uploadReader = new FileReader();
    uploadReader.onload = () => {
      if (uploadReader.readyState === 2) {
        updateAvatar(uploadReader.result);
      }
    };
    uploadReader.readAsDataURL(file);
  };

  // ========== SAU KHI UPLOAD THÀNH CÔNG ==========
  useEffect(() => {
    if (isSuccess) {
      refetch(); // 🔥 reload user
      toast.success("Cập nhật ảnh đại diện thành công!");
      setPreviewAvatar(null); // clear preview
    }
  }, [isSuccess, refetch]);

  // ========== UPDATE NAME ==========
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await editProfile({ name });
    toast.success("Cập nhật thành công!");
    refetch();
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              previewAvatar ||
              user?.avatar?.url ||
              avatar ||
              "/assets/avatar.png" // ✅ avatar mặc định
            }
            alt="avatar"
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full object-cover"
          />

          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />

          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="text-white" />
            </div>
          </label>
        </div>
      </div>

      <br />
      <br />

      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-[100%] pt-2">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1`}
                value={user?.email}
              />
            </div>

            <input
              className="w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center rounded-[3px] mt-8 cursor-pointer"
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
