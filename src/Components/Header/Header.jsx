import React from "react";
import OwlCarousel from "react-owl-carousel";
import slide1 from "./../../assets/images/240_F_307448841_dhkb44bTQjoXP59SO32KcXZ9SQvuzbQT.jpg";
import slide11 from "./../../assets/images/240_F_144585490_4Xh8tizRaqy4ExbwxevPzBdblw7al7yg.jpg";
import slide12 from "./../../assets/images/modern-stationary-collection-arrangement.jpg";
import slide2 from "./../../assets/images/240_F_301003246_EzITvwnKo39szzxa5ZFAmvA4x3AFWxya.jpg";
export default function Header() {
  return (
    <>
      <div className="row g-0 pt-5">
        <div className="col-md-9">
          <OwlCarousel
            className="owl-theme "
            autoplay={true}
            autoplayTimeout={3000}
            dots={false}
            loop
            items={1}
          >
            <div className="item">
              <img className="w-100" height={400} src={slide1} alt="" />
            </div>
            <div className="item">
              <img className="w-100" height={400} src={slide2} alt="" />
            </div>
          </OwlCarousel>
        </div>
        <div className="col-md-3">
          <img height={200} src={slide11} className="w-100" alt="" />
          <img height={200} src={slide12} className="w-100" alt="" />
        </div>
      </div>
    </>
  );
}
