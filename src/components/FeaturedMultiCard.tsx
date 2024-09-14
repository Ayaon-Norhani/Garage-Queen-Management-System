"use client";

import Image from "next/image";
import React, { CSSProperties, MouseEventHandler } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArrowProps {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

function NextArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`arrow ${className}`}
      style={{
        ...style,
        display: "absolute",
        right: "12px",
      }}
    >
      <ChevronRight size={17} style={{ color: "gray" }} />
    </div>
  );
}

function PrevArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`arrow ${className}`}
      style={{
        ...style,
        display: "absolute",
        left: "12px",
      }}
    >
      <ChevronLeft size={17} style={{ color: "gray" }} />
    </div>
  );
}

const FeatureMultiCard = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Slider {...settings}>
      <section>
        <main className="flex relative overflow-hidden">
          <h4 className="absolute left-3 top-3 bg-white/50 backdrop-blur-sm px-2 py-1 ">
            Social Events
          </h4>{" "}
          <Image
            src="https://res.cloudinary.com/dyyqzhpji/image/upload/v1726300949/GarageQueen/roskq5aw1jw3htiqjgee.png"
            width={1200}
            height={341}
            alt="Car club"
          />
        </main>
      </section>
      <section>
        <main className="flex relative overflow-hidden">
          <h4 className="absolute left-3 top-3 bg-white/50 backdrop-blur-sm px-2 py-1 ">
            Social Events
          </h4>{" "}
          <Image
            src="https://res.cloudinary.com/dyyqzhpji/image/upload/v1724228051/GarageQueen/k6dymvd9mbj08uqz3ijk.webp"
            width={1200}
            height={341}
            alt="Car club"
          />
        </main>
      </section>
      <section>
        <main className="flex relative overflow-hidden">
          <h4 className="absolute left-3 top-3 bg-white/50 backdrop-blur-sm px-2 py-1 ">
            Social Events
          </h4>{" "}
          <Image
            src="https://res.cloudinary.com/dyyqzhpji/image/upload/v1724228050/GarageQueen/palccgyjwpgkeeqivb95.webp"
            width={1200}
            height={341}
            alt="Car club"
          />
        </main>
      </section>
    </Slider>
  );
};

export default FeatureMultiCard;
