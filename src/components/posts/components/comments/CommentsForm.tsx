import React, { useCallback } from 'react'
import useForm from '../../../../hooks/useForm';
import { api } from '../../../../utils/api';
import { useSession } from 'next-auth/react';

const CommentsForm: React.FC<{ postId: string }> = ({ postId }) => {
  const { data: sessionData } = useSession();
  const queryContext = api.useContext();
  const { handleSubmit, handleChange, values, resetState, errors } = useForm({
    initialValues: {
      text: "",
    },
    validations: {
      text: {
        required: {
          value: true,
          message: "Comment can't be empty",
        },
      },
    },
    onSubmit: (data) => submitComment(data.text),
  });

  const addCommentMutation = api.comment.addComment.useMutation({
    onSuccess: () => {
      resetState();
      queryContext.post.fetchAll.invalidate();
    },
  });

  const submitComment = useCallback(
    (comment: string) => {
      addCommentMutation.mutate({ text: comment, postId })
    },
    [],
  );

  return (
    <>
      {sessionData && (
        <form onSubmit={handleSubmit} className='flex'>
          <div className='flex grow flex-col'>
            <input
              className={`box-border rounded-xl border border-solid p-2.5 text-black shadow-xl focus:outline-none ${errors.text ? 'border-red-500' : 'border-black'}`}
              type="text"
              name="text"
              id=""
              placeholder='Leave a comment'
              value={values.text}
              onChange={handleChange}
            />
            {errors.text && <span className='text-red-500'>{errors.text}</span>}
          </div>
          <button type="submit" className='bg-white-400 p-2 rounded-xl h-fit'>Send</button>
        </form>
      )}
    </>
  )
}

export default CommentsForm