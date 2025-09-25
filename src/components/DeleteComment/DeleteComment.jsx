import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function DeleteComment({id}) {
  let queryClient = useQueryClient();


    function deleteComment() {

    axios
      .delete(`https://linked-posts.routemisr.com/comments/${id}`,{
        headers: {
          token: localStorage.getItem("userToken"),
        }
      })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success(" Comment deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["userPosts"] });
          queryClient.invalidateQueries({ queryKey: ["getSinglePosts"]});
         
        }
      })
      .catch(() => {
        toast.error(" The comment was not deleted, please try again");
      });
  }

  return (
    <>
     
     <button onClick={()=>deleteComment()} className='cursor-pointer'> 
               
                delete</button>
    </>
  )
}
