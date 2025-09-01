import React from 'react'
import style from "./Profile.module.css"
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";
import UserPosts from '../userPosts/userPosts';
import ChangePassword from '../changePassword/changePassword';
import Uploudprofilephoto from '../Uploudprofilephoto/Uploudprofilephoto';



export default function Profile() {
    const [openModal, setOpenModal] = useState(false);

    function getUserData() {
    return axios.get("https://linked-posts.routemisr.com/users/profile-data", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
  let {data,isLoading,error,isError} = useQuery({
    queryKey: ["userPosts"],
    queryFn: getUserData,
    select:(data)=>data?.data?.user
  });
 
if (isError) {
  return <h2 className="text-center text-red-700 font-bold text-5xl border"><i className="fa-solid fa-circle-xmark pe-2"></i>
{error.message}</h2>
}

if (isLoading) {
  return <div className=" h-96 flex justify-center items-center">
    <div className="sk-chase">
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
</div></div>
}
// console.log(data);
  return (
    <>

    <div className=' flex flex-wrap flex-col  items-center '>
      <div className='border-2 p-4 rounded-3xl w-1/2 flex flex-col items-center dark:bg-gray-300 bg-white'>
      <div className='place-self-end'>
        <ChangePassword/>
      </div>
      <div className='place-self-end mt-2'>
       <Uploudprofilephoto/>
       </div>
      <div className='flex mb-3 gap-3'>
    <img src={data?.photo} className='size-14 rounded-full ' alt="" />
    <p className='text-2xl place-content-center'>{data?.name}</p>
    </div>

 
  <Button onClick={() => setOpenModal(true)} color="light" >Detalis...</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Detalis</ModalHeader>
        <ModalBody>
          <div className="space-y-3">
            <p className=" text-black">
              
              <i className="fa-solid fa-m text-gray-900 pe-2" ></i>
             Email: {data?.email}
            </p>
            <p className=" text-black">
              <i className="fa-solid fa-user text-gray-900 pe-2"></i>
              Gender: {data?.gender}
            </p>
            <p className=" text-black">
              <i className="fa-solid fa-cake-candles text-gray-900 pe-2"></i>
             Birthday: {data?.dateOfBirth}
            </p>
           
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
  </div>
<div className='m-6 w-1/2'>
 <UserPosts id={data?._id} />
  </div>
  </div>
 
    </>
  )
}
