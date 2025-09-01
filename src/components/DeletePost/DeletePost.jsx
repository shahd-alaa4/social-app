import React from 'react'
import style from "./DeletePost.module.css"
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function DeletePost({id}) {
    let queryClient = useQueryClient();

   function deletePost(id) {
  
      axios
        .delete(`https://linked-posts.routemisr.com/posts/${id}`,{
          headers: {
            token: localStorage.getItem("userToken"),
          }
        })
        .then((res) => {
          if (res.data.message === "success") {
            toast.success(" Post deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });
           
          }
        })
        .catch(() => {
          toast.error(" The post was not deleted, please try again");
        });

    }
  return (
    <>
     
     <button onClick={()=>deletePost(id)} className='cursor-pointer ps-3 pt-2 pb-6'> 
                     <i className="fa-solid fa-trash pe-2"></i>
                     delete</button>
    </>
  )
}
