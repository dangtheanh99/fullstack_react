import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { languages } from "../../utils";
import { FormattedMessage } from "react-intl";
// import { changeLanguageApp } from "../../store/actions"
class Header extends Component {
  handleChangLanguage = (language) => {
    console.log("click");
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { processLogout, language, userInfo } = this.props;
    // console.log("Check userInfo", userInfo);

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>

        <div className="header-blockRight">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />{" "}
            {userInfo && userInfo.firstName ? userInfo.firstName : ""}!
          </span>
          <div className="language">
            <span
              className={
                language == languages.VI ? "language-vi active" : "language-vi"
              }
              onClick={() => this.handleChangLanguage(languages.VI)}
            >
              VN
            </span>
            <span
              className={
                language == languages.EN ? "language-en active" : "language-en"
              }
              onClick={() => this.handleChangLanguage(languages.EN)}
            >
              EN
            </span>
          </div>

          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
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
