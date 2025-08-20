// app/trending/page.tsx
import Navbar from "@/components/Navbar";
import TrendingMovies from "@/components/TrendingSection";
import { cookies } from "next/headers";

export default async function OriginalsPage() {


  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;
  

  // console.log("Token:", token);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/popular`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Cookie": `jwt_token=${token}`
  }});
  // console.log(res)



  if (!res.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await res.json();
  console.log("Trending Movies Data:", data);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-20 px-4">
        <TrendingMovies movies={data?.movies} />
      </div>
    </div>
  );
}
