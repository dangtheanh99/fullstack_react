import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="commonSection medicalSection">
        <div className="commonSection__header">
          <div className="commonSection__header__title">
            <FormattedMessage id="homepage.outstanding-medical-facility" />
          </div>
          <button className="commonSection__header__btn">
            <FormattedMessage id="homepage.search" />
          </button>
        </div>
        <Slider {...this.props.settings} className="commonSection__slider">
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Bệnh viện Hữu nghị Việt Đức
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Bệnh viện Hữu nghị Việt Đức
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Bệnh viện Hữu nghị Việt Đức
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Bệnh viện Hữu nghị Việt Đức
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Bệnh viện Hữu nghị Việt Đức
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              Bệnh viện Hữu nghị Việt Đức
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
