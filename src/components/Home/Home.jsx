import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Comment from "../comment/comment";
import { Link } from "react-router-dom";
import CreateComment from "../createComment/createComment";
import CreatePost from "../CreatePost/CreatePost";

export default function Home() {
  //   const [posts,setPosts]=useState([])
  //   let {getAllPosts}=useContext(PostContext)

  //   async function getposts() {
  //     let res=await getAllPosts()
  //     if (res.length) {
  //       setPosts(res)
  //         console.log(res);

  //     }
  //   }
  //   useEffect(()=>{
  //     getposts()
  // },[])
  function getAllPosts() {
    return axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
  let {data,isLoading,error,isError} = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts,
    select:(data)=>data?.data?.posts
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
    <div className="md:w-[80%] lg:w-[60%]  border-2 shadow shadow-gray-500  rounded-2xl m-auto mb-7 dark:bg-gray-300 bg-white">
      <CreatePost/>
      </div>
      {data?.map((post) => (
        <div
          key={post.id}
          className="md:w-[80%] lg:w-[60%] border-2 shadow shadow-gray-500 p-4 rounded-2xl m-auto mb-7 dark:bg-gray-300 bg-white"
        >
          
          <Link to={`/postdetails/${post.id}`}>
          <div>
            <div className="flex items-center gap-3">
              <img
                src={post.user.photo}
                className="size-14 border border-neutral-700 rounded-full"
                alt={post.user.name}
              />
              <h1 className="text-2xl text-neutral-800">{post.user.name}</h1>
            </div>
            <p className="text-end mb-3 text-gray-600">{post.createdAt}</p>
          </div>
          <div className="border rounded-md pb-4 border-neutral-400">
            {post.body && <h1 className="font-bold p-3">{post.body}</h1>}
            {post.image && (
              <img src={post.image} className="w-full" alt={post.body} />
            )}
          </div>

{post?.comments?.length > 0 && <Comment comment={post?.comments[0]} />} 
         </Link>
        {data && <CreateComment postId={post.id}/> }
        </div>
      ))}
    </>
  );
}
