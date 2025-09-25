import { createContext } from "react";

export const PostContext = createContext();

export default function PostContextProvider(props) {
  // function getAllPosts() {
  //   return axios
  //     .get("https://linked-posts.routemisr.com/posts?limit=50", {
  //       headers: {
  //         token: localStorage.getItem("userToken"),
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       return res.data.posts;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return err;
  //     });
  // }

  return (
    <PostContext.Provider  value={{}}>
      {props.children}
    </PostContext.Provider>
  );
}
