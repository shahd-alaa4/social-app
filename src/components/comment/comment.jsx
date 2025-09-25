import UpdateComment from '../UpdateComment/UpdateComment'
import DeleteComment from '../DeleteComment/DeleteComment'

export default function Comment({comment}) {
  let {content,commentCreator,createdAt,_id}=comment
  // console.log(comment);

  return (
    <>
     <div className='flex gap-3 mt-5'>
      <img src={commentCreator?.photo} className='size-10 rounded-full border border-neutral-700' alt="" />
      <div className='bg-gray-300 rounded-2xl p-3 dark:bg-gray-600'>
        <h1 className='font-bold'>{commentCreator?.name}</h1>
        <h3 className='ms-5'>{content}</h3>
        <p className='text-stone-400  font-light text-sm'>{createdAt}</p>
      </div>
    
     </div>
       <div className=' flex gap-4 ms-14 mt-2 mb-5 text-sm text-gray-800 dark:text-gray-900 '>
      <UpdateComment id={_id} />
      <DeleteComment id={_id} /> 
      </div>
    </>
  )
}
