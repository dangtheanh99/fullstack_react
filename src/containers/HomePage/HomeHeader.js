import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { withRouter } from "react-router";
import { path } from "../../utils";
import { languages } from "../../utils";
import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import vi from "../../assets/vi.png";
import en from "../../assets/en.png";

const options = [
  {
    titleVi: "Khám Chuyên khoa",
    titleEn: "Specialist Examination",
    icon: "far fa-hospital",
  },
  {
    titleVi: "Khám từ xa",
    titleEn: "Remote examination",
    icon: "fas fa-phone-square",
  },
  {
    titleVi: "Khám tổng quát",
    titleEn: "General examination",
    icon: "fas fa-hospital-alt",
  },
  {
    titleVi: "Xét nghiệm y học",
    titleEn: "Medical test",
    icon: "fas fa-vials",
  },
  {
    titleVi: "Sức khỏe tinh thần",
    titleEn: "Mental health",
    icon: "far fa-hospital",
  },
  {
    titleVi: "Khám nha khoa",
    titleEn: "Dental examination",
    icon: "fas fa-syringe",
  },
];
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
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
                {/* <i className="fas fa-bars"></i> */}
                <i className="fas fa-heartbeat"></i>
              </div>
              <div
                className="homeHeader__content__left__logo"
                onClick={() => {
                  if (this.props.history) {
                    this.props.history.push(path.HOMEPAGE);
                  }
                }}
              >
                Your Health
              </div>
            </div>
            <div className="homeHeader__content__center">
              <div
                className="homeHeader__content__center__item"
                onClick={() => {
                  if (this.props.history) {
                    this.props.history.push(path.LIST_SPECIALTY);
                  }
                }}
              >
                <div className="homeHeader__content__center__title">
                  <FormattedMessage id="homeheader.specialty" />
                </div>
                <div className="homeHeader__content__center__des">
                  <FormattedMessage id="homeheader.des-specialty" />
                </div>
              </div>
              <div
                className="homeHeader__content__center__item"
                onClick={() => {
                  if (this.props.history) {
                    this.props.history.push(path.LIST_CLINIC);
                  }
                }}
              >
                <div className="homeHeader__content__center__title">
                  <FormattedMessage id="homeheader.health-facility" />
                </div>
                <div className="homeHeader__content__center__des">
                  <FormattedMessage id="homeheader.des-health-facility" />
                </div>
              </div>
              <div
                className="homeHeader__content__center__item"
                onClick={() => {
                  if (this.props.history) {
                    this.props.history.push(path.LIST_DOCTOR);
                  }
                }}
              >
                <div className="homeHeader__content__center__title">
                  <FormattedMessage id="homeheader.doctor" />
                </div>
                <div className="homeHeader__content__center__des">
                  <FormattedMessage id="homeheader.des-doctor" />
                </div>
              </div>
              <div
                className="homeHeader__content__center__item"
                onClick={() => {
                  if (this.props.history) {
                    this.props.history.push(path.LIST_HANDBOOK);
                  }
                }}
              >
                <div className="homeHeader__content__center__title">
                  <FormattedMessage id="homeheader.handbook" />
                </div>
                <div className="homeHeader__content__center__des">
                  <FormattedMessage id="homeheader.des-handbook" />
                </div>
              </div>
            </div>
            <div className="homeHeader__content__right">
              <div className="homeHeader__content__right__language">
                <span
                  className="language-vi"
                  onClick={() => this.handleChangLanguage(languages.VI)}
                >
                  <img
                    src={vi}
                    title={
                      language === languages.VI ? "Tiếng Việt" : "Vietnamese"
                    }
                  />
                </span>
                <span
                  className="language-en"
                  onClick={() => this.handleChangLanguage(languages.EN)}
                >
                  <img
                    src={en}
                    title={language === languages.VI ? "Tiếng Anh" : "English"}
                  />
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
                <FormattedMessage id="homeheader.medical-background" /> <br />
                <b>
                  <FormattedMessage id="homeheader.health-care" />
                </b>
              </div>
              <div className="banner__search">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder={
                    language === languages.VI
                      ? "Tìm bệnh viện"
                      : "Find a hospital"
                  }
                />
              </div>
            </div>
            <div className="banner__bottom">
              <div className="banner__options">
                {options.map((item, index) => {
                  return (
                    <div className="banner__options__item" key={index}>
                      <div className="banner__options__item__icon">
                        <i className={item.icon}></i>
                      </div>
                      <div className="banner__options__item__title">
                        {language === languages.VI
                          ? item.titleVi
                          : item.titleEn}
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
