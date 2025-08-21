"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function HotGirlSwiper() {
  const t = useTranslations();

  const girlsData = [
    { cover: "/images/hotgirl1.webp", title: "Rapid Wien vs Dundee United" },
    { cover: "/images/hotgirl2.webp", title: "Rakow Czestochowa vs Maccabi Haifa" },
    { cover: "/images/hotgirl3.webp", title: "Hajduk Split vs KS Dinamo Tirana" },
    { cover: "/images/hotgirl4.webp", title: "Partizan Belgrade vs Hibernian" },
    { cover: "/images/hotgirl5.webp", title: "Hajduk Split vs KS Dinamo Tirana" },
    { cover: "/images/hotgirl6.webp", title: "Partizan Belgrade vs Hibernian" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Link href="/hot-girl">
     <div className="bg-white py-2 border-b">
              <h3 className="font-bold text-gray-900 flex items-center">
         <Image src="/svg/ChevronRight.svg" alt="Chevron" className="mr-1" width={20} height={20} />
                {t("hotGirls")}
              </h3>
            </div>
        <div className="p-4">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-full"
          >
            {girlsData.map((girl, index) => (
              <SwiperSlide key={index}>

                    <div className="relative overflow-hidden rounded-md aspect-[16/22]">
                      <Image
                        src={girl.cover}
                        alt={girl.title}
                        fill
                        className="object-cover w-full h-full"
                      />
                      {/* Player icon wrapper */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-70 hover:opacity-100">
                        <Image
                          src="/images/playerIcon.png"
                          alt="Player"
                          width={65}
                          height={65}
                        />
                      </div>
                    </div>

              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Link>
    </div>
  );
}