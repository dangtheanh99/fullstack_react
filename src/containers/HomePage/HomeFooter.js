import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";
import { path } from "../../utils";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  render() {
    return (
      <div className="footerSection">
        <div className="footerSection__bigBlock">
          <div className="footerSection__bigBlock__about">
            <div
              className="footerSection__bigBlock__about__logo"
              onClick={() => {
                if (this.props.history) {
                  this.props.history.push(path.HOMEPAGE);
                }
              }}
            >
              <i className="fas fa-heartbeat"></i>
              <div className="footerSection__bigBlock__about__logo__text">
                Your Health
              </div>
            </div>
            <div className="footerSection__bigBlock__about__name">
              <FormattedMessage id="homefooter.name-company" />
            </div>
            <div className="footerSection__bigBlock__about__address">
              <i className="fas fa-location-arrow"></i>{" "}
              <FormattedMessage id="homefooter.address-company" />
            </div>
          </div>
          <ul className="footerSection__bigBlock__contact">
            <li>
              {" "}
              <FormattedMessage id="homefooter.contact" />
            </li>
            <li>
              <FormattedMessage id="homefooter.recruitment" />
            </li>
            <li>
              <FormattedMessage id="homefooter.question" />
            </li>
            <li>
              <FormattedMessage id="homefooter.rule" />
            </li>
            <li>
              <FormattedMessage id="homefooter.privacy" />
            </li>
          </ul>
          <div className="footerSection__bigBlock__support">
            <div>
              <FormattedMessage id="homefooter.support" />
            </div>
            <span>support@yourhealth.vn</span>
          </div>
        </div>
        <div className="footerSection__smallBlock">
          <div className="footerSection__smallBlock__copyright">
            &copy; 2023 YourHealth.
          </div>
          <div className="footerSection__smallBlock__social">
            <a href="https://www.facebook.com/" target="_blank">
              <i
                className="fab fa-facebook-square"
                style={{ color: "blue" }}
              ></i>
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <i className="fab fa-youtube" style={{ color: "red" }}></i>
            </a>
          </div>
        </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeFooter)
);
