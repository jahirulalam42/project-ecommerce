import Image from "next/image";
import React from "react";
import Logo from "@/../public/images/logo.png";
import visa from "@/../public/images/visa.png";
import paypal from "@/../public/images/paypal.png";
import stripe from "@/../public/images/stripe.png";
import verisign from "@/../public/images/verisign.png";
import {
  Copyright,
  Facebook,
  icons,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Footer = () => {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/",
      icons: <Facebook strokeWidth={1.5} />,
    },
    {
      name: "Youtube",
      url: "https://www.youtube.com/",
      icons: <Youtube strokeWidth={1.5} />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/",
      icons: <Instagram strokeWidth={1.5} />,
    },
    {
      name: "Twitter",
      url: "https://www.twitter.com/",
      icons: <Twitter strokeWidth={1.5} />,
    },
  ];

  const gettingStartedLinks = [
    { name: "Release Notes", url: "#" },
    { name: "Upgrade Guide", url: "#" },
    { name: "Browser Support", url: "#" },
    { name: "Dark Mode", url: "#" },
  ];

  const exploreLinks = [
    { name: "Prototyping", url: "#" },
    { name: "Design Systems", url: "#" },
    { name: "Pricing", url: "#" },
    { name: "Security", url: "#" },
  ];

  const communityLinks = [
    { name: "Discussion Forums", url: "#" },
    { name: "Code of Conduct", url: "#" },
    { name: "Contributing", url: "#" },
    { name: "Api Reference", url: "#" },
  ];

  return (
    <div>
      <hr className="border-gray-300 dark:border-white -mx-2 md:-mx-10 lg:-mx-20 "></hr>
      <div className="grid grid-cols-1 md:grid-cols-4 py-6">
        <div>
          <div className="py-4">
            <Image src={Logo} height={100} width={100} alt="Logo" />
          </div>

          <div>
            <ul className="text-gray-600">
              {socialLinks.map((link, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row gap-2 justify-center items-center"
                  >
                    {link.icons}
                    <Button variant="link" size={"sm"}>
                      {link.name}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h6 className="py-4 font-bold">Getting Started</h6>
          <ul className="flex flex-col gap-2 text-gray-600 font-semibold">
            {gettingStartedLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.url} className="text-sm hover:underline">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h6 className="py-4 font-bold">Explore</h6>
          <ul className="flex flex-col gap-2 text-gray-600 font-semibold">
            {exploreLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.url} className="text-sm hover:underline">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h6 className="py-4 font-bold">Community</h6>
          <ul className="flex flex-col gap-2 text-gray-600 font-semibold">
            {communityLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.url} className="text-sm hover:underline">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-white -mx-2 md:-mx-10 lg:-mx-20 "></hr>

      <div className="py-6 flex flex-col gap-2 md:flex-row justify-between items-center">
        <span className="flex flex-row items-center font-semibold text-gray-600 gap-2">
          Nexton eCommerce. <Copyright size={16} strokeWidth={1.5} /> 2026
        </span>

        <div className="flex flex-row gap-1">
          <Image src={visa} height={30} width={50} alt="Visa" />
          <Image src={paypal} height={30} width={50} alt="Paypal" />
          <Image src={stripe} height={30} width={50} alt="Stripe" />
          <Image src={verisign} height={30} width={50} alt="Verisign" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
