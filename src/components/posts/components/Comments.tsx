import React, { useCallback, useState } from 'react';
import { api } from "../../../utils/api";
import { Comment } from "@prisma/client";

interface CommentsProps {
  comments: Comment[]
  postId: string
}

const Comments: React.FC<CommentsProps> = ({ comments, postId }) => {
  const [comment, setComment] = useState("");
  const queryContext = api.useContext();

  const addCommentMutation = api.comment.addComment.useMutation({
    onSuccess: () => {
      setComment("");
      queryContext.post.fetchAll.invalidate();
    },
  });

  const submitComment = useCallback(
    () => {
      addCommentMutation.mutate({ text: comment, postId })
    },
    [comment],
  );

  return (
    <>
      {comments.map(comment => (
        <div key={comment.id}>{comment.text}</div>
      ))}
      <input type="text" name="" id="" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="button" onClick={submitComment}>Send Comment</button>
    </>
  )
}

export default Comments