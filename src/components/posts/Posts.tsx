import React from "react";
import { Post as PostType, User, Comment } from "@prisma/client";
import { useSession } from "next-auth/react";
import sadImg from "../../../public/sad.png";
import Image from "next/image";
import Link from "next/link";
import Post from "./Post";

interface PostProps extends PostType {
  user: User;
  comments: (Comment & { user: User })[]
}

const Posts: React.FC<{ posts: PostProps[] }> = React.memo(({ posts }) => {
  const { data: sessionData } = useSession();

  return (
    <>
      {!!posts.length ? (
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
