import Exploring from "@/components/Home/Exploring";
import Hero from "@/components/Home/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <Exploring />
    </div>
  );
}
