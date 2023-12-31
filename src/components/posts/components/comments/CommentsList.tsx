import { User, Comment } from '@prisma/client'
import dayjs from 'dayjs'
import React from 'react'

const CommentsList: React.FC<{ comments: (Comment & { user: User })[] }> = ({ comments }) => {
  return (
    <ul className='max-h-80 overflow-y-auto mb-1.5 pr-10'>
      {comments.map(comment => (
        <li key={comment.id} className='ml-2'>
          <h1>@{comment.user.username}</h1>
          <h3 className='text-gray-400'>{dayjs(comment.createdAt).format('MMM D, YYYY')}</h3>
          <p className='text-gray-400'>{comment.text}</p>
        </li>
      ))}
    </ul>
  )
}

export default CommentsList