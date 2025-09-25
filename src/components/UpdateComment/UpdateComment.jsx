import { useState } from 'react'
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

export default function UpdateComment({id}) {
    let queryClient = useQueryClient();

  const [openModal, setOpenModal] = useState(false);


  const form= useForm({
    defaultValues:{
      content:"", 
    }
  })

  const{register,handleSubmit,reset}=form 

  function handleUpdateComment( values){
    // console.log(values);

     axios
      .put(`https://linked-posts.routemisr.com/comments/${id}`, values, {
        headers: {
          token: localStorage.getItem("userToken"),
        }
      })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Comment updated successfully");
          queryClient.invalidateQueries({ queryKey: ["userPosts"] });
          queryClient.invalidateQueries({ queryKey: ["getSinglePosts"]});

    setOpenModal(false);
          reset()
        }
      })
      .catch(() => {
        toast.error(" The comment was not updated, please try again");
      });
    
  }

  
  return (
    <>
     <div>
     <button onClick={() => setOpenModal(true)} className='cursor-pointer ' > Update </button>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} >
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">

            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              <i className="fa-solid fa-pen-to-square pe-2"></i>
             Update Comment</h3>
            <div>

<form onSubmit={handleSubmit(handleUpdateComment)}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text">Update Comment</Label>
              </div>

              <TextInput type='text' id="text"  {...register("content")}  placeholder='update comment... '/>
             
            </div>


           
            <div className="w-full mt-5">
              <Button type='submit'>
               Update Comment
              </Button>
            </div>
      
         </form>
          </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
    </>
  )
}
