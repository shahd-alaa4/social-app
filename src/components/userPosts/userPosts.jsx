import React, { useState } from 'react'
import style from "./UserPosts.module.css"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CreateComment from '../createComment/createComment';
import { Link } from 'react-router-dom';
import CreatePost from '../CreatePost/CreatePost';
import Comment from '../comment/comment';
import UpdatePost from '../UpdatePost/UpdatePost';
import { Button, Drawer, DrawerItems } from "flowbite-react";
import DeletePost from '../DeletePost/DeletePost';

export default function UserPosts({id}) {
  const [openPostId, setOpenPostId] = useState(null);

  function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let {data,isLoading,error,isError} = useQuery({
    queryKey: ["userPosts"],
    queryFn: getUserData,
    select:(data)=>data?.data?.posts
  });
 
  if (isError) {
    return <h2 className="text-center text-red-700 font-bold text-5xl border">
      <i className="fa-solid fa-circle-xmark pe-2"></i>
      {error.message}
    </h2>
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
      </div>
    </div>
  }

  return (
   <>
    <div className=" border-2 shadow shadow-gray-500 rounded-2xl m-auto mb-7 dark:bg-gray-300 bg-white">
      <CreatePost/>
    </div>

    {data?.map((post) => (
      <div
        key={post._id}
        className=" border-2 shadow shadow-gray-500 p-4 rounded-2xl m-auto mb-7 dark:bg-gray-300 bg-white">
        
        <div className='place-self-end'>
          <div className="flex items-center justify-center">
            <Button onClick={() => setOpenPostId(post._id)} color="light">
              <i className="fa-solid fa-bars"></i>
            </Button>
          </div>

          <Drawer 
            open={openPostId === post._id} 
            onClose={() => setOpenPostId(null)} 
            position="bottom"
          >
            <DrawerItems>
              <div className="flex justify-end cursor-pointer">
                <div onClick={() => setOpenPostId(null)}>
                  <i className="fa-solid fa-xmark fa-1"></i>
                </div>
              </div>

              <UpdatePost id={post._id}/>

              <div className='border mt-3 mb-3'></div>

              <DeletePost id={post._id}/>

              <Button color="light" pill onClick={() => setOpenPostId(null)}>
                Done
              </Button>
            </DrawerItems>
          </Drawer>
        </div>

        <Link to={`/postdetails/${post._id}`}>
          <div>
            <div className="flex items-center gap-3">
              <img
                src={post?.user.photo}
                className="size-14 border border-neutral-700 rounded-full"
                alt={post?.user.name}
              />
              <h1 className="text-2xl text-neutral-800">{post?.user.name}</h1>
            </div>
            <p className="text-end mb-3 text-gray-600">{post?.createdAt}</p>
          </div>
          <div className="border rounded-md pb-4 border-neutral-400">
            {post?.body && <h1 className="font-bold p-3">{post?.body}</h1>}
            {post?.image && (
              <img src={post?.image} className="w-full" alt={post?.body} />
            )}
          </div>
        </Link>

        {post?.comments?.length > 0 && <Comment comment={post?.comments[0]} />}
        {data && <CreateComment postId={post?._id} />}
      </div>
    ))}
   </>
  )
}
