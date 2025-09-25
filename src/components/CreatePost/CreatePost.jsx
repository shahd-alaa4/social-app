import  { useState } from 'react'
import { Button, Drawer, DrawerItems, FileInput, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function CreatePost() {
  let queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  let form=useForm({
    defaultValues:{
      body:"",
      image:"",
    }
  })

let {register,handleSubmit}=form

function handlePost(values){
  // console.log(values);

  let myData=new FormData()
myData.append('body',values.body)
myData.append('image',values.image[0])


 axios
      .post("https://linked-posts.routemisr.com/posts", myData, {
      headers: {
        token: localStorage.getItem("userToken"),}
      }) 
   
      .then((res) => {
        if (res.data.message === "success") {
        
              toast.success("Post added successfully") 
              queryClient.invalidateQueries({ queryKey: ["userPosts"] });
                
       handleClose(); 
        }
      })
      .catch((err) => {
       
        toast.error("The post was not added, please try again")
           
      });

  
}




  return (
    <>
      <div className="flex items-center justify-center p-4">
        <TextInput 
          type="text" 
          onClick={() => setIsOpen(true)} 
          className="w-full" 
          placeholder="Create Post..." 
        />
      </div>

      <Drawer open={isOpen} onClose={handleClose} position="top" className=' h-screen'>
        <DrawerItems>
        
          <div className="flex justify-end cursor-pointer">
            <div color="gray" size="sm" onClick={handleClose}>
              <i className="fa-solid fa-xmark fa-1"></i>
            </div>
          </div>
<form onSubmit={handleSubmit(handlePost)}>
        <div className='m-8 pt-4'>
          <TextInput 
          type="text" 
          className="w-full" 
          placeholder="Create Post..." 
          {...register("body")}
        /> 
        </div>
          
            <div className="mb-8 text-sm text-gray-500 dark:text-gray-400 mt-8 pt-2" >
                                       
                             <div id="fileUpload" className="max-w-md  hidden ">
                  
                             <FileInput id="file"  {...register("image")}/>
                
                              </div>
                              <label htmlFor="file" className='flex items-center justify-center text-8xl p-9 border rounded-2xl pt-32 pb-32 cursor-pointer'>
                           <i className="fa-solid fa-image cursor-pointer"></i>
                            </label>
                             </div>
          
          <div className="pt-4 flex gap-4 ">
          <Button type='submit' color="light" pill >
        Add Post
      </Button>
          <Button  color="light" pill onClick={handleClose}>
       Done
      </Button>
          </div>
          </form>
        </DrawerItems>
      </Drawer>
    </>
  )
}
