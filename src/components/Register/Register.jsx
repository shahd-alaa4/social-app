import React, { useState } from "react";
import style from "./Register.module.css";
import signup from "../../assets/Sign up-pana.png";
import { useForm } from "react-hook-form";
import z, { email, object } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const schema = z
    .object({
      name: z
        .string()
        .min(1, "Name is string requried")
        .max(10, "max length is 10 chars"),
      email: z.email("invalid email"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD")
        .refine((date) => {
          const userDate = new Date(date);
          const nowDate = new Date();
          nowDate.setHours(0, 0, 0, 0);
          return userDate <= nowDate;
        }, "can not be future date"),
      gender: z.enum(
        ["male", "female"],
        "Gender must be either 'male' or 'female'"
      ),
    })
    .refine((object) => object.rePassword === object.password, {
      error: "Passwords do not match",
      path: ["rePassword"],
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState } = form;

  function handleRegister(values) {
    setisLoading(true);
    axios
      .post("https://linked-posts.routemisr.com/users/signup", values)
      .then((res) => {
        // console.log(res);
        if (res.data.message === "success") {
          navigate("/Login");
          setisLoading(false);
        }
      })
      .catch((err) => {
        // console.log(err);
        setapiError(err.response.data.error);
        setisLoading(false);
      });
  }
  return (
    <>
      {apiError && (
        <div className="flex  justify-center text-center h-7">
          <h1 className="w-60  text-red-600 border rounded-md shadow-lg shadow-red-500 h-7 ">
            <i className="fa-solid fa-circle-xmark pe-2"></i>
            {apiError}
          </h1>
        </div>
      )}

      <div className="md:flex justify-around ">
        <div className="md:w-1/2  max-md:hidden ">
          <img src={signup} className="100%" alt="" />
        </div>

        <form
          className="shadow-2xl p-9 w-[100%] md:w-[40%]"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              {...register("name")}
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-b-gray-950 focus:outline-none focus:ring-0 focus:border-gray-950 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your Name
            </label>
            {formState.errors.name && formState.touchedFields.name ? (
              <p className="text-center text-red-700 pt-4">
                <i className="fa-solid fa-circle-xmark pe-2"></i>
                {formState.errors.name.message}
              </p>
            ) : (
              " "
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              {...register("email")}
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-b-gray-950 focus:outline-none focus:ring-0 focus:border-gray-950 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your email
            </label>
            {formState.errors.email && formState.touchedFields.email ? (
              <p className="text-center text-red-700 pt-4">
                <i className="fa-solid fa-circle-xmark pe-2"></i>
                {formState.errors.email.message}
              </p>
            ) : (
              " "
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              {...register("password")}
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-b-gray-950 focus:outline-none focus:ring-0 focus:border-gray-950 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your password
            </label>
            {formState.errors.password && formState.touchedFields.password ? (
              <p className="text-center text-red-700 pt-4">
                <i className="fa-solid fa-circle-xmark pe-2"></i>
                {formState.errors.password.message}
              </p>
            ) : (
              " "
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              {...register("rePassword")}
              id="repassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-b-gray-950 focus:outline-none focus:ring-0 focus:border-gray-950 peer"
              placeholder=" "
            />
            <label
              htmlFor="repassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your repassword
            </label>
            {formState.errors.rePassword &&
            formState.touchedFields.rePassword ? (
              <p className="text-center text-red-700 pt-4">
                <i className="fa-solid fa-circle-xmark pe-2"></i>
                {formState.errors.rePassword.message}
              </p>
            ) : (
              " "
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              {...register("dateOfBirth")}
              id="dateOfBirth"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-b-gray-950 focus:outline-none focus:ring-0 focus:border-gray-950 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your birthday
            </label>
            {formState.errors.dateOfBirth &&
            formState.touchedFields.dateOfBirth ? (
              <p className="text-center text-red-700 pt-4">
                <i className="fa-solid fa-circle-xmark pe-2"></i>
                {formState.errors.dateOfBirth.message}
              </p>
            ) : (
              " "
            )}
          </div>

          <div className="flex gap-3">
            <div className="flex items-center mb-4">
              <input
                id="male"
                type="radio"
                {...register("gender")}
                defaultValue="male"
                className="w-4 h-4 text-gray-700 border-gray-300 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 dark:focus:bg-gray-600 dark:bg-gray-300 dark:border-gray-600"
              />
              <label
                htmlFor="male"
                className="block ms-2  text-sm font-medium text-gray-400 dark:text-gray-400"
              >
                male
              </label>
            </div>
            <div className="flex items-center mb-4 ">
              <input
                id="female"
                type="radio"
                {...register("gender")}
                defaultValue="female"
                className="w-4 h-4 text-gray-700 border-gray-300 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 dark:focus:bg-gray-600 dark:bg-gray-300 dark:border-gray-600"
              />
              <label
                htmlFor="female"
                className="block ms-2  text-sm font-medium text-gray-400 dark:text-gray-400"
              >
                female
              </label>
            </div>
            {formState.errors.gender && formState.touchedFields.gender ? (
              <p className="text-center text-red-700 pt-4 ">
                {formState.errors.gender.message}
              </p>
            ) : (
              " "
            )}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="text-gray-200 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-950 dark:focus:ring-gray-950"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner animate-spin "></i>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
