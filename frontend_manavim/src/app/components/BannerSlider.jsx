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
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: true,
    fade: true,
    adaptiveHeight: true,
    cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)"
  };

  return (
    <div className="relative sm:h-screen sm:max-h-[600px] h-[450px] overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="relative sm:h-screen sm:max-h-[600px] h-[450px]">
            <div className="absolute inset-0 z-10">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover transform scale-100 hover:scale-105 transition-transform duration-700"
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
            </div>

            <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center text-white" data-aos="fade-up" data-aos-duration="1000">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg transform hover:scale-105 transition-transform duration-300">
                  {banner.title}
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 drop-shadow-md">
                  {banner.subtitle}
                </h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                  {banner.description}
                </p>
                <a
                  href={banner.buttonLink}
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold sm:py-3 sm:px-8 
                  rounded-full sm:text-lg text-sm py-2 px-3 transition-all duration-300 hover:shadow-lg 
                  transform hover:-translate-y-1 hover:scale-105"
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
