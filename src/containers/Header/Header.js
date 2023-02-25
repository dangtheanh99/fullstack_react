import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { languages, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import vi from "../../assets/vi.png";
import en from "../../assets/en.png";
// import { changeLanguageApp } from "../../store/actions"
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  handleChangLanguage = (language) => {
    console.log("click");
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
    // console.log("menuApp", this.state.menuApp);
    console.log("check userInfo", this.props.userInfo);
  }
  render() {
    const { processLogout, language, userInfo } = this.props;
    // console.log("Check userInfo", userInfo);

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="header-blockRight">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />{" "}
            {userInfo && userInfo.firstName ? userInfo.firstName : ""}!
          </span>
          <div className="language">
            <span
              className="language-vi"
              onClick={() => this.handleChangLanguage(languages.VI)}
            >
              <img
                src={vi}
                title={language === languages.VI ? "Tiếng Việt" : "Vietnamese"}
              />
            </span>
            <span
              className="language-en"
              onClick={() => this.handleChangLanguage(languages.EN)}
            >
              {/* EN */}
              <img
                src={en}
                title={language === languages.VI ? "Tiếng Anh" : "English"}
              />
            </span>
          </div>

          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title={language === languages.VI ? "Đăng xuất" : "Log out"}
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
