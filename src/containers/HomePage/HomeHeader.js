import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { withRouter } from "react-router";
import { path } from "../../utils";
import { languages } from "../../utils";
import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";

const headerData = [
  {
    title: "Chuyên khoa",
    description: "Tìm bác sĩ theo chuyên khoa",
  },
  {
    title: "Cơ sở y tế",
    description: "Chọn bệnh viện phòng khám",
  },
  {
    title: "Bác sĩ",
    description: "Chọn bác sĩ giỏi",
  },
  {
    title: "Gói khám",
    description: "Khám sức khỏe tổng quát",
  },
];

const option = [
  {
    title: "Khám Chuyên khoa",
    icon: "far fa-hospital",
  },
  {
    title: "Khám từ xa",
    icon: "fas fa-phone-square",
  },
  {
    title: "Khám tổng quát",
    icon: "fas fa-hospital-alt",
  },
  {
    title: "Xét nghiệm y học",
    icon: "fas fa-vials",
  },
  {
    title: "Sức khỏe tinh thần",
    icon: "far fa-hospital",
  },
  {
    title: "Khám nha khoa",
    icon: "fas fa-syringe",
  },
];
class HomeHeader extends Component {
  handleChangLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let { language } = this.props;
    return (
      <>
        <div className="homeHeader">
          <div className="homeHeader__content">
            <div className="homeHeader__content__left">
              <div className="homeHeader__content__left__menu">
                <i className="fas fa-bars"></i>
              </div>
              <div
                className="homeHeader__content__left__logo"
                onClick={() => {
                  if (this.props.history) {
                    this.props.history.push(path.HOMEPAGE);
                  }
                }}
              ></div>
            </div>
            <div className="homeHeader__content__center">
              {/* {headerData.map((item, index) => {
                return (
                  
                );
              })} */}

              <div className="homeHeader__content__center__item">
                <div className="homeHeader__content__center__title">
                  <FormattedMessage id="homeheader.specialty" />
                </div>
                <div className="homeHeader__content__center__des">
                  <FormattedMessage id="homeheader.des-specialty" />
                </div>
              </div>
              <div className="homeHeader__content__center__item">
                <div className="homeHeader__content__center__title">
                  <FormattedMessage id="homeheader.health-facility" />
                </div>
                <div className="homeHeader__content__center__des">
                  <FormattedMessage id="homeheader.des-health-facility" />
                </div>
              </div>
              <div className="homeHeader__content__center__item">
                <div className="homeHeader__content__center__title">
                  <FormattedMessage id="homeheader.doctor" />
                </div>
                <div className="homeHeader__content__center__des">
                  <FormattedMessage id="homeheader.des-doctor" />
                </div>
              </div>
              <div className="homeHeader__content__center__item">
                <div className="homeHeader__content__center__title">
                  <FormattedMessage id="homeheader.checkup-package" />
                </div>
                <div className="homeHeader__content__center__des">
                  <FormattedMessage id="homeheader.des-checkup-package" />
                </div>
              </div>
            </div>
            <div className="homeHeader__content__right">
              <div className="homeHeader__content__right__language">
                <span
                  className={
                    language == languages.VI
                      ? "language-vi active"
                      : "language-vi"
                  }
                  onClick={() => this.handleChangLanguage(languages.VI)}
                >
                  VN
                </span>
                <span
                  className={
                    language == languages.EN
                      ? "language-en active"
                      : "language-en"
                  }
                  onClick={() => this.handleChangLanguage(languages.EN)}
                >
                  EN
                </span>
              </div>
              <div className="homeHeader__content__right__support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
            </div>
          </div>
        </div>

        {this.props.isShowBanner && (
          <div className="banner">
            <div className="banner__top">
              <div className="banner__heading">
                Nền tảng y tế <br />
                <b>Chăm sóc sức khỏe toàn diện</b>
              </div>
              <div className="banner__search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm bệnh viện" />
              </div>
            </div>
            <div className="banner__bottom">
              <div className="banner__options">
                {option.map((item, index) => {
                  return (
                    <div className="banner__options__item" key={index}>
                      <div className="banner__options__item__icon">
                        <i className={item.icon}></i>
                      </div>
                      <div className="banner__options__item__title">
                        {item.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
