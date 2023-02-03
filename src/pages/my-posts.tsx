import React from "react";
import { NextPage } from "next";
import { api } from "../utils/api";
import Posts from "../components/Posts";
import Link from "next/link";

const MyPosts: NextPage = (props) => {
  const { data: posts } = api.post.fetchUserPosts.useQuery();

  return (
    <>
      {posts?.length ? (
        <Posts posts={posts} />
      ) : (
        <p className="text-center">
          It's empty in here.{" "}
          <Link className="underline" href="/new-post">
            Please post something.
          </Link>
        </p>
      )}
    </>
  );
};

export default MyPosts;
