// app/home/page.tsx
import Navbar from "@/components/Navbar";
import HomeComponent from "@/components/Home";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    throw new Error("Unauthorized – no JWT token found");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Cookie: `jwt_token=${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch home movies");
  }

  const data = await res.json();
  console.log("Home Movies Data:", data);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <section id="home" className="pt-20 px-4">
        <HomeComponent
          trending={data.trending}
          topRated={data.topRated}
          originals={data.originals}
          popular={data.popular}
        />

      </section>


    </div>
  );
}
