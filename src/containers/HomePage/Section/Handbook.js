import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";

class Handbook extends Component {
  render() {
    return (
      <div className="commonSection HandbookSection">
        <div className="commonSection__header">
          <div className="commonSection__header__title">
            <FormattedMessage id="homepage.handbook" />
          </div>
          <button className="commonSection__header__btn">
            <FormattedMessage id="homepage.all-posts" />
          </button>
        </div>
        <Slider {...this.props.settings} className="commonSection__slider">
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2022/12/30/143149-thumbnail-4.png"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2022/12/30/143149-thumbnail-4.png"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2022/12/30/143149-thumbnail-4.png"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2022/12/30/143149-thumbnail-4.png"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2022/12/30/143149-thumbnail-4.png"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Cơ Xương Khớp
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w300/2022/12/30/143149-thumbnail-4.png"
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
