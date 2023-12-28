import React from "react";
import { NextPage } from "next";
import { api } from "../utils/api";
import Posts from "../components/posts/Posts";

const MyPosts: NextPage = (props) => {
  const { data: posts } = api.post.fetchUserPosts.useQuery();

  return <Posts posts={posts || []} />;
};

export default MyPosts;
