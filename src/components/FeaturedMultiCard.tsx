"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {};

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
  };
  return (
    <Slider {...settings}>
      <section>
        <main className="flex relative rounded-lg overflow-hidden">
          <h4 className="absolute left-3 top-3 bg-white/50 backdrop-blur-sm px-2 py-1 rounded">
            Featured
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
        <main className="flex relative rounded-lg overflow-hidden">
          <h4 className="absolute left-3 top-3 bg-white/50 backdrop-blur-sm px-2 py-1 rounded">
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
