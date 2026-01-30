"use client";

import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "../../../redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword: FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới không khớp");
      return;
    }
    await updatePassword({ oldPassword, newPassword });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Đổi mật khẩu thành công");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    if (error && "data" in error) {
      const err = error as any;
      toast.error(err.data.message);
    }
  }, [isSuccess, error]);

  const InputPassword = ({
    label,
    value,
    onChange,
    show,
    setShow,
  }: any) => (
    <div className="w-full 800px:w-[60%] mt-4">
      <label className="block mb-1 font-medium">{label}</label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={`${styles.input} !w-full pr-12`}
          required
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
        >
          {show ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full px-4">
      <h1 className="text-[26px] font-semibold text-center mb-6">
        Đổi mật khẩu
      </h1>

      <form
        onSubmit={passwordChangeHandler}
        className="flex flex-col items-center max-w-[500px] mx-auto"
      >
        <InputPassword
          label="Mật khẩu cũ"
          value={oldPassword}
          onChange={(e: any) => setOldPassword(e.target.value)}
          show={showOld}
          setShow={setShowOld}
        />

        <InputPassword
          label="Mật khẩu mới"
          value={newPassword}
          onChange={(e: any) => setNewPassword(e.target.value)}
          show={showNew}
          setShow={setShowNew}
        />

        <InputPassword
          label="Xác nhận mật khẩu mới"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
          show={showConfirm}
          setShow={setShowConfirm}
        />

        <button
          type="submit"
          className="
            w-full mt-8 h-[45px]
            bg-[#37a39a] text-white rounded-md
            font-medium hover:opacity-90 transition
          "
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
