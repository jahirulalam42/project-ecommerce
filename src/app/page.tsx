import Exploring from "@/components/Home/Exploring";
import Hero from "@/components/Home/Hero";
import Recommendations from "@/components/Home/Recommendations";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <Exploring />
      <Recommendations />
    </div>
  );
}
