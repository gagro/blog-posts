import React from "react";
import { Post as PostType, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import sadImg from "../../public/sad.png";
import Image from "next/image";
import Link from "next/link";

interface PostProps extends PostType {
  user: User;
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const {
    title,
    text,
    user: { firstName, lastName, username },
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
    </div>
  );
};

const Posts: React.FC<{ posts: PostProps[] }> = React.memo(({ posts }) => {
  const { data: sessionData } = useSession();

  return (
    <>
      {posts.length ? (
        <ul className="w-full">
          {posts.map((post) => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex items-center">
          Looks like there are no posts.{" "}
          <Image className="mx-2" src={sadImg} height={30} alt="Sad face" />{" "}
          <Link
            className="underline"
            href={sessionData ? "/new-post" : "/login"}
          >
            You can change that.
          </Link>
        </p>
      )}
    </>
  );
});

export default Posts;
