import React from "react";
import Image from "next/image";
import FooterMenu from "./FooterMenu";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <div className="px-8 pt-0 lg:px-20 lg:pt-8">
      <Newsletter />
      <div className="flex flex-col gap-8 p-4 md:p-8 rounded-ss-3xl rounded-se-3xl">
        <div className="flex md:flex-nowrap flex-wrap items-start justify-start gap-6 ">
          <div className="flex flex-col w-full gap-6 md:w-1/4 ">
            <div>
              <Image
                src={"/logo.png"}
                alt="lazuli Logo"
                width={281}
                height={38}
                className="w-auto"
              />
            </div>
            <div className="flex lg:justify-center justify-start gap-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="w-6 h-6" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="w-6 h-6" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div className="hidden w-0 border h-60 border-border md:grid"></div>
          <div className="grid grid-cols-1 gap-10 md:gap-4 md:grid-cols-3">
            <FooterMenu
              menuItems={[
                {
                  label: "All Products",
                  link: "/past-exam-paper",
                },
                {
                  label: "Sarees Collection",
                  link: "/tuition",
                },
                {
                  label: "Suits Collection",
                  link: "/mock-exams",
                },
                {
                  label: "Stoles & Dupattas",
                  link: "/affiliate-program",
                },
                {
                  label: "Collection",
                  link: "/consultancy",
                },
                {
                  label: "Jewellery Collection",
                  link: "/free-assessments",
                },
                {
                  label: "Shawls Collection",
                  link: "/free-assessments",
                },
              ]}
              title="Products"
            />
            <FooterMenu
              menuItems={[
                {
                  label: "Home",
                  link: "/",
                },
                {
                  label: "About Us",
                  link: "/",
                },
                {
                  label: "Contact Us",
                  link: "/",
                },
              ]}
              title="Information"
            />
            <FooterMenu
              menuItems={[
                {
                  label: "Sign In",
                  link: "/",
                },
                {
                  label: "Create An Account",
                  link: "/",
                },
                                {
                  label: "View Cart",
                  link: "/",
                },
                                {
                  label: "Return Policy",
                  link: "/",
                },
                                {
                  label: "Shipping & Delivery",
                  link: "/",
                },
                                {
                  label: "Privacy Policy",
                  link: "/",
                },
                                {
                  label: "Terms and Conditions",
                  link: "/",
                },

              ]}
              title="Customer Service"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-8 p-4 md:p-8 text-base text-subheading bg-orange">
        <div>© 2014 - 2024 Lazuli By Neha</div>
        <div>
          Pitampura, Delhi, India | Company Number 7302712816
        </div>
      </div>
    </div>
  );
}
