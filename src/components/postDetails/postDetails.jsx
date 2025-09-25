import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Comment from './../comment/comment';
import axios from 'axios';
import CreateComment from '../createComment/createComment';

export default function PostDetails() {
  let {id}=useParams()
 
  
    function getSinglePosts() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

    let {data,isLoading,error,isError} = useQuery({
      queryKey: ["getSinglePosts"],
      queryFn: getSinglePosts,
      select:(data)=>data?.data?.post
    });

    // console.log(data);
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
    
  return (
    <>
      <div className="md:w-[80%] lg:w-[60%] border-2 shadow shadow-gray-500 p-4 rounded-2xl m-auto mb-7 dark:bg-gray-300 bg-white">
             
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src={data?.user.photo}
                    className="size-14 border border-neutral-700 rounded-full"
                    alt={data?.user.name}
                  />
                  <h1 className="text-2xl text-neutral-800">{data?.user.name}</h1>
                </div>
                <p className="text-end mb-3 text-gray-600">{data?.createdAt}</p>
              </div>
              <div className="border rounded-md pb-4 border-neutral-400">
                {data?.body && <h1 className="font-bold p-3">{data?.body}</h1>}
                {data?.image && (
                  <img src={data?.image} className="w-full" alt={data?.body} />
                )}
              </div>
    
            {data?.comments.map((comment)=><Comment key={comment._id} comment={comment}/>)}
          <CreateComment postId={data?._id}/>
              </div>
    </>
  )
}
