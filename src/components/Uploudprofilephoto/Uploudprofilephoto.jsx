import React, { useState } from 'react'
import style from "./Uploudprofilephoto.module.css"
import { Button, FileInput, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function Uploudprofilephoto() {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: { photo: "" }
  });

  let { register, handleSubmit} = form;

  function handleUploadPhoto(values) {
    let myData = new FormData();
    myData.append('photo', values.photo[0]);

    axios
      .put("https://linked-posts.routemisr.com/users/upload-photo", myData, {
        headers: { token: localStorage.getItem("userToken") }
      })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Photo updated successfully");
          setOpenModal(false); 
          
          queryClient.invalidateQueries({ queryKey: ["userPosts"] })
        }
      })
      .catch(() => {
        toast.error("The photo was not uploaded, please try again");
      });
  }

  return (
    <>
      <div>
        <Button onClick={() => setOpenModal(true)} color="light">
          <i className="fa-solid fa-images"></i>
        </Button>

        <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
          <ModalHeader />
          <ModalBody>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                <i className="fa-solid fa-images"></i> Update Photo
              </h3>

              <form onSubmit={handleSubmit(handleUploadPhoto)}>
                <div>
                  <div id="fileUpload" className="max-w-md hidden">
                    <FileInput id="file" {...register("photo")} />
                  </div>
                  <label
                    htmlFor="file"
                    className="flex items-center justify-center text-8xl p-9 border rounded-2xl pt-16 pb-16 cursor-pointer"
                  >
                    <i className="fa-solid fa-image cursor-pointer"></i>
                  </label>
                </div>

                <div className="w-full mt-5">
                  <Button type="submit" className="cursor-pointer">
                    Done
                  </Button>
                </div>
              </form>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}
