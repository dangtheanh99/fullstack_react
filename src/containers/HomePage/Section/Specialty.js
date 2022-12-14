import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";

class Specialty extends Component {
  render() {
    return (
      <div className="commonSection specialtySection">
        <div className="commonSection__header">
          <div className="commonSection__header__title">
            Chuyên khoa phổ biến
          </div>
          <button className="commonSection__header__btn">Xem thêm</button>
        </div>
        <Slider {...this.props.settings} className="commonSection__slider">
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
