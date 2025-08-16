"use client";
import Navbar from "@/components/Navbar";
import TrendingSection from "@/components/TrendingSection";

export default function TrendingMoviesPage() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-20 px-4">
        <TrendingSection />
      </div>
    </div>
  );
}
