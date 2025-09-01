import React from 'react'
import style from "./ChangePassword.module.css"
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ChangePassword() {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);

    
    const schema = z.object({
        password: z
          .string(),
         
           newPassword: z.string() .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
          ),
      }) 

    const form = useForm({
        defaultValues: {
          password: "", 
          newPassword: "",
        },
        resolver: zodResolver(schema),
      });

      let { register, handleSubmit, formState,reset } = form;

  function handleChange(values) {
        setisLoading(true);


    axios
      .patch("https://linked-posts.routemisr.com/users/change-password", values, {
      headers: {
        token: localStorage.getItem("userToken"),}
      }) 
   
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res?.data?.token);
              toast.success("Password changed successfully") 
                  setisLoading(false);
        reset( );

        }
      })
      .catch((err) => {
        toast.error("Failed to change password ")
            setisLoading(false);

      });
  }

  return (
    <div>
     <Button onClick={() => setOpenModal(true)} color="light"> <i className="fa-solid fa-shield"></i></Button>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} >
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">

            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              <i className="fa-solid fa-shield"></i>
              Change Password</h3>
            <div>

<form onSubmit={handleSubmit(handleChange)}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Your old password</Label>
              </div>

              <TextInput type='password' id="password"  {...register("password")} />
               {formState.errors.password && formState.touchedFields.password ? (
              <p className="text-center text-red-700 pt-4">
                <i className="fa-solid fa-circle-xmark pe-2"></i>
                {formState.errors.password.message}
              </p>
            ) : (
              " "
            )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="newPassword">Your New Password</Label>
              </div>            
              <TextInput id="newPassword" type="password" {...register("newPassword")}/>
               {formState.errors.newPassword && formState.touchedFields.newPassword ? (
              <p className="text-center text-red-700 pt-4">
                <i className="fa-solid fa-circle-xmark pe-2"></i>
                {formState.errors.newPassword.message}
              </p>
            ) : (
              " "
            )}
            </div>

           
            <div className="w-full mt-5">
              <Button type='submit' disabled={isLoading}>
                 {isLoading ? (
              <i className="fa-solid fa-spinner animate-spin "></i>
            ) : (
              "Change password"
            )}
              </Button>
            </div>
      
         </form>
          </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}
