import Image from "next/image";
import React from "react";
import firstAbout from "../../../public/images/about_first.png";
import secondAbout from "../../../public/images/about_second.png";

const page = () => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          About us
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-4">
          We not only help you design exceptional products, but also make it
          easy for you <br /> to share your designs with more like-minded
          people.
        </p>
      </div>
      <div className="w-full flex flex-row justify-between gap-6">
        <div className="relative w-[622px] h-[506px]">
          <Image
            src={firstAbout}
            alt="About first image"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <div>
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
              Provide fashionable and <br /> qualifed products
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-4">
              Already millions of people are very satisfied by thi. s page
              builder <br />
              and the number is growing more and more. Technolog developing,
              <br />
              requirements are increasing. Riode has brought.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row justify-between gap-6">
        <div className="flex justify-center items-center">
          <div>
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
              Provide fashionable and <br /> qualifed products
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-4">
              Already millions of people are very satisfied by thi. s page
              builder <br />
              and the number is growing more and more. Technolog developing,
              <br />
              requirements are increasing. Riode has brought.
            </p>
          </div>
        </div>

        <div className="relative w-[622px] h-[506px]">
          <Image
            src={secondAbout}
            alt="About first image"
            fill
            className="object-cover"
          />
        </div>
      </div>
      {/* <div>Get in touch</div> */}
    </div>
  );
};

export default page;
