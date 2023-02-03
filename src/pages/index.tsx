import { type NextPage } from "next";
import React, { useMemo, useState } from "react";

import { api } from "../utils/api";
import useDebounce from "../hooks/useDebounce";
import Posts from "../components/Posts";

const Home: NextPage = (props) => {
  const [name, setName] = useState<string>("");
  const debouncedName: string = useDebounce(name);
  const { data: posts } = api.post.fetchAll.useQuery();

  const filteredPosts = useMemo(
    () =>
      posts?.filter((post) => {
        const fullName = post.user?.firstName.concat(" ", post.user.lastName);
        return fullName!.toLowerCase().includes(debouncedName.toLowerCase());
      }),
    [posts, debouncedName]
  );

  return (
    <>
      <input
        className="m-4 box-border w-[calc(100%_-_20px)] rounded-xl border-none p-2.5 shadow-xl focus:outline-none"
        type="text"
        placeholder="Search by author's name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <Posts posts={filteredPosts || []} />
    </>
  );
};

export default Home;
