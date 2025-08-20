import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // API endpoints
    const urls = {
      trending: "https://apis.ccbp.in/movies-app/trending-movies",
      topRated: "https://apis.ccbp.in/movies-app/top-rated-movies",
      originals: "https://apis.ccbp.in/movies-app/originals",
      popular: "https://apis.ccbp.in/movies-app/popular-movies",
    };

    // Fetch all in parallel
    const [trendingRes, topRatedRes, originalsRes, popularRes] =
      await Promise.all([
        fetch(urls.trending, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }),
        fetch(urls.topRated, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }),
        fetch(urls.originals, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }),
        fetch(urls.popular, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }),
      ]);

    // If any failed
    if (!trendingRes.ok || !topRatedRes.ok || !originalsRes.ok || !popularRes.ok) {
      throw new Error("Failed to fetch one or more movie categories");
    }

    // Parse JSON
    const [trendingData, topRatedData, originalsData, popularData] =
      await Promise.all([
        trendingRes.json(),
        topRatedRes.json(),
        originalsRes.json(),
        popularRes.json(),
      ]);

    // Return combined response
    return NextResponse.json({
      trending: trendingData.results || [],
      topRated: topRatedData.results || [],
      originals: originalsData.results || [],
      popular: popularData.results || [],
    });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
