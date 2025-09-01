import React from 'react'
import style from "./CreateComment.module.css"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Button, Label, TextInput } from "flowbite-react";
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
  

export default function CreateComment({postId}) {
  let queryClient = useQueryClient();

    const form = useForm({
      defaultValues: {
        content: "",
        post: postId 
       } 
       })
         let { register, handleSubmit,reset} = form;


         
 async function addComment(values) {
try{
  let res=  await axios
      .post("https://linked-posts.routemisr.com/comments", values , {
      headers: {
        token: localStorage.getItem("userToken"),}
      }) 
  //  console.log(res);
   if (res.data.message === "success") {
    toast.success("Comment added successfully")
   queryClient.invalidateQueries({ queryKey: ["getSinglePosts"]});
    reset( );
   }
    
    
    }  catch(err)  {
toast.error("Unable to process your request")
      };
  }

  return (
    <>
      <form className="flex flex-col mt-7 relative " onSubmit={handleSubmit(addComment)}>
      <div >
        
        <TextInput id="text" type="text" placeholder="Write a comment..." {...register("content")} />
      </div>

      <div>
      
        <TextInput id="password1" type="hidden" {...register("post")}  value={postId}/>
      </div>
     
      <Button type="submit"  className='w-1/12 absolute place-self-end' color="light"><i className="fa-regular fa-paper-plane"></i></Button>
    </form>
    </>
  )
}
