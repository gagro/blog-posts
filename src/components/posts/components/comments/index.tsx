import React, { useCallback, useState } from 'react';
import { Comment, User } from "@prisma/client";
import ArrowIcon from '../../../../assets/down-arrow.png';
import Image from 'next/image';
import CommentsList from './CommentsList';
import CommentsForm from './CommentsForm';

interface CommentProps {
  comments: (Comment & { user: User })[]
  postId: string
}

const Comments: React.FC<CommentProps> = ({ comments, postId }) => {
  const [showComments, setShowComments] = useState<boolean>(false);

  const toggleShowComments = useCallback(
    () => {
      setShowComments(prevState => !prevState)
    },
    [],
  );

  return (
    <>
      <div className='flex items-center justify-between'>
        <h3>Comments ({comments.length})</h3>
        <Image
          className={`cursor-pointer ${showComments && 'rotate-180'}`}
          src={ArrowIcon}
          alt='arrow'
          height={10}
          width={16}
          onClick={toggleShowComments}
        />
      </div>
      {showComments && (
        <>
          <CommentsList comments={comments} />
          <CommentsForm postId={postId} />
        </>
      )}
    </>
  )
}

export default Comments