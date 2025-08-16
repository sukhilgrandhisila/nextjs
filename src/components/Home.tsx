"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const Home = () => {

  return (
    <div>
      <Navbar />
      <h1 className="p-6 text-2xl">Welcome to Home Page</h1>
    </div>
  );
};

export default Home;
