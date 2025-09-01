import style from "./Login.module.css";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../context/UserContext";

export default function Login() {
  const { userLogin, setuserLogin } = useContext(userContext);
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const schema = z.object({
    email: z.email("invalid email"),

    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
      ),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState } = form;

  function handleLogin(values) {
    setisLoading(true);

    axios
      .post("https:linked-posts.routemisr.com/users/signin", values)
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token);
          navigate("/");
          setisLoading(false);
        }
      })
      .catch((err) => {
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
<div className=" flex justify-center m-6">
  <h1 className="text-5xl font-bold border-b-2 ">Social App</h1>
  </div>
      <div className="flex justify-center  ">
        
        <form
          className="shadow-2xl p-9 w-[100%] md:w-[40%]"
          onSubmit={handleSubmit(handleLogin)}
        >
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

          <button
            disabled={isLoading}
            type="submit"
            className="text-gray-200 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-950 dark:focus:ring-gray-950"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner animate-spin "></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
      
    </>
  );
}
