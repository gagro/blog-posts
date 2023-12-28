import React, { useCallback } from 'react';
import { api } from "../../../utils/api";
import { Comment, User } from "@prisma/client";
import useForm from '../../../hooks/useForm';
import dayjs from 'dayjs';

interface CommentProps {
  comments: (Comment & { user: User })[]
  postId: string
}

const Comments: React.FC<CommentProps> = ({ comments, postId }) => {
  const { handleSubmit, handleChange, values, resetState } = useForm({
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
  const queryContext = api.useContext();

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
      <h3>Comments ({comments.length})</h3>
      <ul className='max-h-80 overflow-y-auto mb-1.5 pr-10'>
        {comments.map(comment => (
          <li key={comment.id} className='ml-2'>
            <h1>@{comment.user.username}</h1>
            <h3 className='text-gray-400'>{dayjs(comment.createdAt).format('MMM D, YYYY')}</h3>
            <p className='text-gray-400'>{comment.text}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className='flex'>
        <div className='flex grow flex-col'>
          <input
            className='box-border rounded-xl border border-solid border-black p-2.5 text-black shadow-xl focus:outline-none'
            type="text"
            name="text"
            id=""
            placeholder='Leave a comment'
            value={values.text}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className='bg-blue-400 p-2 rounded-xl'>Send</button>
      </form>
    </>
  )
}

export default Comments