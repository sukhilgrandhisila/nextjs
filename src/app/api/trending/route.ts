import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Read jwt_token from cookies
  const cookieHeader = req.headers.get("cookie");
  const token = cookieHeader?.match(/jwt_token=([^;]+)/)?.[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch("https://apis.ccbp.in/movies-app/trending-movies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch trending movies");
    }

    const data = await res.json();
    console.log(data)
    return NextResponse.json(data);
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
