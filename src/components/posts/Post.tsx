import React from 'react'
import { Post as PostType, User, Comment } from "@prisma/client";
import Comments from './components/Comments';

interface PostProps extends PostType {
  user: User;
  comments: Comment[]
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const {
    title,
    text,
    user: { firstName, lastName, username },
    comments
  } = post;
  const fullName = firstName.concat(" ", lastName);

  return (
    <div className="m-2.5 flex scale-100 flex-col break-all rounded-xl bg-white p-2.5 shadow-[0_5px_15px_rgb(0_0_0_/_35%)] transition-[transform_200ms_ease-in-out] hover:scale-105 hover:transition-[transform_200ms_ease-in-out]">
      <div className="border-b-2 font-medium text-[#aca5a5]">
        <h4>
          {fullName} (@{username})
        </h4>
        <h3>{title}</h3>
      </div>
      <p>{text}</p>
      <Comments
        comments={comments}
        postId={post.id}
      />
    </div>
  );
};

export default Post