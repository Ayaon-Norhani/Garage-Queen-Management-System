"use client";

import Image from "next/image";
import React, { CSSProperties, MouseEventHandler } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {};

interface ArrowProps {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

function NextArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "absolute",
        right: "12px",
        zIndex: 99,
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "absolute",
        left: "12px",
        zIndex: 99,
      }}
      onClick={onClick}
    />
  );
}

const FeatureMultiCard = (props: Props) => {
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
            src="/static/images/banner.jpg"
            width={1200}
            height={341}
            alt="Car club"
          />
        </main>
      </section>
      <section>
        <main className="flex relative  overflow-hidden">
          <h4 className="absolute left-3 top-3 bg-white/50 backdrop-blur-sm px-2 py-1">
            Social Events
          </h4>
          <div>
            <Image
              src="/static/images/rezvani-main.jpg"
              width={600}
              height={400}
              alt="rezvani main picture"
            />
          </div>
          <aside className="grid grid-cols-2 gap-0">
            <article>
              {" "}
              <Image
                src="/static/images/rezvani-front.jpg"
                width={300}
                height={200}
                alt="rezvani main picture"
              />
            </article>
            <article>
              {" "}
              <Image
                src="/static/images/rezvani-interior.jpg"
                width={300}
                height={200}
                alt="rezvani main picture"
              />
            </article>

            <article>
              {" "}
              <Image
                src="/static/images/rezvani-back.jpg"
                width={300}
                height={200}
                alt="rezvani main picture"
              />
            </article>
            <article>
              {" "}
              <Image
                src="/static/images/rezvani-wheel.jpg"
                width={300}
                height={200}
                alt="rezvani main picture"
              />
            </article>
          </aside>
        </main>
      </section>
      <section>
        <main className="flex relative overflow-hidden">
          <h4 className="absolute left-3 top-3 bg-white/50 backdrop-blur-sm px-2 py-1">
            Featured
          </h4>

          <div>
            <Image
              src="/static/images/ferrari-main.jpg"
              width={600}
              height={400}
              alt="ferrari main picture"
            />
          </div>
          <aside className="grid grid-cols-2 gap-0">
            <article>
              {" "}
              <Image
                src="/static/images/ferrari-front.jpg"
                width={300}
                height={200}
                alt="ferrari main picture"
              />
            </article>
            <article>
              {" "}
              <Image
                src="/static/images/ferrari-interior.jpg"
                width={300}
                height={200}
                alt="ferrari main picture"
              />
            </article>
            <article>
              {" "}
              <Image
                src="/static/images/ferrari-engine.jpg"
                width={300}
                height={200}
                alt="ferrari main picture"
              />
            </article>
            <article>
              {" "}
              <Image
                src="/static/images/ferrari-back.jpg"
                width={300}
                height={200}
                alt="ferrari main picture"
              />
            </article>
          </aside>
        </main>
      </section>
    </Slider>
  );
};

export default FeatureMultiCard;
