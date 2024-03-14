"use client";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="w-full md:w-7/10 h-[125px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[450px] overflow-hidden relative">
        <Image src="/hero.jpg" alt="Hero Image" layout="fill" objectFit="cover" objectPosition="center" />
      </div>
      <div className="text-center mt-4">
        <h1 className="text-4xl font-bold">Let your style bubble</h1>
      </div>
    </div>
  );
}