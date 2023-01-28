import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { withRouter } from "react-router";
import { path } from "../../utils";
// import logo from "../../assets/logo.svg";
// import

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
  render() {
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
              {headerData.map((item, index) => {
                return (
                  <div
                    className="homeHeader__content__center__item"
                    key={index}
                  >
                    <div className="homeHeader__content__center__title">
                      {item.title}
                    </div>
                    <div className="homeHeader__content__center__des">
                      {item.description}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="homeHeader__content__right">
              <div className="homeHeader__content__right__language">VN</div>
              <div className="homeHeader__content__right__support">
                <i className="fas fa-question-circle"></i>
                Hỗ trợ
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
