import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

class Doctor extends Component {
  render() {
    return (
      <div className="commonSection doctorSection">
        <div className="commonSection__header">
          <div className="commonSection__header__title">
            Bác sĩ nổi bật tuần qua
          </div>
          <button className="commonSection__header__btn">Tìm kiếm</button>
        </div>
        <Slider {...this.props.settings} className="commonSection__slider">
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w200/2018/04/09/151800292142135730131997187173031663525568184320n.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title ">
              <h5 className="hover-effect">
                Giáo sư, Tiến sĩ, Bác sĩ Trần Ngọc Ân
              </h5>
              <span>Cơ Xương Khớp</span>
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w200/2018/04/09/151800292142135730131997187173031663525568184320n.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              <h5 className="hover-effect">
                Giáo sư, Tiến sĩ, Bác sĩ Trần Ngọc Ân
              </h5>
              <span>Cơ Xương Khớp</span>
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w200/2018/04/09/151800292142135730131997187173031663525568184320n.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              <h5 className="hover-effect">
                Giáo sư, Tiến sĩ, Bác sĩ Trần Ngọc Ân
              </h5>
              <span>Cơ Xương Khớp</span>
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w200/2018/04/09/151800292142135730131997187173031663525568184320n.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              <h5 className="hover-effect">
                Giáo sư, Tiến sĩ, Bác sĩ Trần Ngọc Ân
              </h5>
              <span>Cơ Xương Khớp</span>
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w200/2018/04/09/151800292142135730131997187173031663525568184320n.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              <h5 className="hover-effect">
                Giáo sư, Tiến sĩ, Bác sĩ Trần Ngọc Ân
              </h5>
              <span>Cơ Xương Khớp</span>
            </div>
          </div>
          <div className="commonSection__slider__item">
            <img
              src="https://cdn.bookingcare.vn/fr/w200/2018/04/09/151800292142135730131997187173031663525568184320n.jpg"
              className="commonSection__slider__item__img"
            />
            <div className="commonSection__slider__item__title">
              <h5 className="hover-effect">
                Giáo sư, Tiến sĩ, Bác sĩ Trần Ngọc Ân
              </h5>
              <span>Cơ Xương Khớp</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
