import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { FormattedMessage } from "react-intl";

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctors: this.props.topDoctors,
      });
    }
  }
  render() {
    console.log("check props redux", this.props.topDoctors);
    let { arrDoctors } = this.state;
    let { language } = this.props;
    return (
      <div className="commonSection doctorSection">
        <div className="commonSection__header">
          <div className="commonSection__header__title">
            <FormattedMessage id="homepage.out-standing-doctor" />
          </div>
          <button className="commonSection__header__btn">
            <FormattedMessage id="homepage.search" />
          </button>
        </div>
        <Slider {...this.props.settings} className="commonSection__slider">
          {arrDoctors &&
            arrDoctors.length > 0 &&
            arrDoctors.map((item, index) => {
              let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
              let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
              let imageBase64 = "";
              if (item.image) {
                imageBase64 = new Buffer(item.image, "base64").toString(
                  "binary"
                );
              }
              return (
                <div className="commonSection__slider__item" key={index}>
                  <img
                    src={imageBase64}
                    className="commonSection__slider__item__img"
                  />
                  <div className="commonSection__slider__item__title ">
                    <h5 className="hover-effect">
                      {language === languages.VI ? nameVi : nameEn}
                    </h5>
                    <span>Cơ Xương Khớp</span>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctors: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctorsStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
