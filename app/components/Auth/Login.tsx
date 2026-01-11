"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../styles/style";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useLoginMutation } from "@/redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch: any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ!")
    .required("Vui lòng nhập email!"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error, data }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Đăng nhập thành công");
      setOpen(false);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Đăng nhập với MindX</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="email">
          Nhập email của bạn
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="emailcủabạn@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}

        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Nhập mật khẩu
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="mật khẩu!@%"
            className={`${errors.password && touched.password && "border-red-500"} ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>

        <div className="w-full mt-5">
          <input type="submit" value="Đăng nhập" className={`${styles.button}`} />
        </div>

        <br />
        <h5 className="text-center pt-4 font-Roboto text-[14px] text-black dark:text-white">
          Hoặc đăng nhập bằng
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle
            size={30}
            className="cursor-pointer mr-2"
            onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={30}
           className="cursor-pointer ml-2 text-black dark:text-white"
            onClick={() => signIn("github")}
          />
        </div>

        <h5 className="text-center pt-4 font-Roboto text-[14px] text-black dark:text-white">
          Chưa có tài khoản?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-Up")}
          >
            Đăng ký
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
