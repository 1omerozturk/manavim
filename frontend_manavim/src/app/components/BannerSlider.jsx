"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const BannerSlider = () => {
  const banners = [
    {
      id: 1,
      image: "/images/4.webp",
      title: "Taze ve Organik Ürünler",
      subtitle: "Çiftlikten Sofranıza",
      description: "Yöresel üreticilerden en taze meyve ve sebzeler",
      buttonText: "Alışverişe Başla",
      buttonLink: "/products",
    },
    {
      id: 2,
      image: "/images/2.webp",
      title: "Yöresel Lezzetler",
      subtitle: "Anadolu'nun Bereketi",
      description: "Geleneksel yöntemlerle yetiştirilmiş ürünler",
      buttonText: "Keşfet",
      buttonLink: "/producers",
    },
    {
      id: 3,
      image: "/images/3.webp",
      title: "Mevsimin En Tazesi",
      subtitle: "Mevsiminde Tüket",
      description: "Mevsimine göre özenle seçilmiş ürünler",
      buttonText: "Mevsim Ürünleri",
      buttonLink: "/seasonal",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    pauseOnHover:true,
    fade: true,
    adaptiveHeight:true

  };

  return (
    <div className="relative sm:h-screen sm:max-h-[500px] h-[400px] overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="relative sm:h-screen sm:max-h-[500px] h-[400px]">
            {/* next/image ile optimize edilmiş resim */}
            <div className="absolute inset-0 z-10">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                quality={100}
                priority
              />
              {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
            </div>

            <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl rounded-3xl font-bold mb-4 image-text-bg">
                  {banner.title}
                </h1>
                <h2 className=" w-fit mx-auto text-2xl md:text-3xl font-semibold mb-6 image-text-bg rounded-3xl">
                  {banner.subtitle}
                </h2>
                <p className="text-lg image-text-bg md:text-xl mb-8 animate-fadeIn delay-200">
                  {banner.description}
                </p>
                <a
                  href={banner.buttonLink}
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold sm:py-3 sm:px-8 rounded-full sm:text-lg text-sm py-2 px-3 transition duration-300 animate-fadeIn delay-300"
                >
                  {banner.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
