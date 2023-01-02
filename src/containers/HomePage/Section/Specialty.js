import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: (
        <div>
          <SampleNextArrowHighLight />
        </div>
      ),
      prevArrow: (
        <div>
          <SamplePrevArrowHighLight />
        </div>
      ),
      //   arrows: false,
    };
    return (
      <div className="specialtySection">
        <div className="specialtySection__heading">Chuyên khoa phổ biến</div>
        <Slider {...settings} className="specialtySection__slider">
          <div className="specialtySection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
              className="specialtySection__slider__item__img"
            />
            <div className="specialtySection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="specialtySection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
              className="specialtySection__slider__item__img"
            />
            <div className="specialtySection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="specialtySection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
              className="specialtySection__slider__item__img"
            />
            <div className="specialtySection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="specialtySection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
              className="specialtySection__slider__item__img"
            />
            <div className="specialtySection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="specialtySection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
              className="specialtySection__slider__item__img"
            />
            <div className="specialtySection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="specialtySection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
              className="specialtySection__slider__item__img"
            />
            <div className="specialtySection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

function SampleNextArrowHighLight(props) {
  const { className, style, onClick, index } = props;
  return (
    <svg
      className={className}
      onClick={onClick}
      width="16"
      height="30"
      viewBox="0 0 8 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="test"
        d="M1.53125 1L7.25 6.96875C7.375 7.125 7.46875 7.3125 7.46875 7.5C7.46875 7.6875 7.375 7.875 7.25 8L1.53125 13.9688C1.25 14.2812 0.75 14.2812 0.46875 14C0.15625 13.7188 0.15625 13.25 0.4375 12.9375L5.6875 7.46875L0.4375 2.03125C0.15625 1.75 0.15625 1.25 0.46875 0.96875C0.75 0.6875 1.25 0.6875 1.53125 1Z"
        fill="#ED1B34"
      />
    </svg>
  );
}

function SamplePrevArrowHighLight(props) {
  const { className, style, onClick } = props;
  return (
    <svg
      className={className}
      onClick={onClick}
      width="16"
      height="30"
      viewBox="0 0 8 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="test"
        d="M6.4375 14.0312L0.71875 8.0625C0.5625 7.875 0.5 7.6875 0.5 7.5C0.5 7.34375 0.5625 7.15625 0.6875 7L6.40625 1.03125C6.6875 0.71875 7.1875 0.71875 7.46875 1C7.78125 1.28125 7.78125 1.75 7.5 2.0625L2.28125 7.5L7.53125 13C7.8125 13.2812 7.8125 13.7812 7.5 14.0625C7.21875 14.3438 6.71875 14.3438 6.4375 14.0312Z"
        fill="#BFBFBF"
      />
    </svg>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
