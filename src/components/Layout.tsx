import React from "react";
import Header from "./Header";
import Head from "next/head";

import { Solitreo } from "@next/font/google";

const font = Solitreo({ subsets: ["latin"], weight: "400" });

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Header />
      <main
        className={`flex flex-col items-center justify-center px-[5%] lg:px-[25%] 2xl:px-[30%] ${font.className}`}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
