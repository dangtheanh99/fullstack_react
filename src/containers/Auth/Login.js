import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
import adminService from "../../services/adminService";
import { userLoginSuccess } from "../../store/actions/userActions";
import { languages } from "../../utils";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChange = (event, type) => {
    if (type === "username") {
      this.setState({
        username: event.target.value,
      });
    }

    if (type === "password") {
      this.setState({
        password: event.target.value,
      });
    }
  };

  handleLogin = async (e) => {
    e.preventDefault();
    this.setState({
      errMessage: "",
    });
    console.log("state value: ", this.state);
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("Login succeed");
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
    }
  };

  handleOnPressEnter = (e) => {
    if (e.keyCode === 13) {
      this.handleLogin();
    }
  };

  handleShowHide = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    let { language } = this.props;
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <h2 className="login-content-heading">
              <FormattedMessage id="login.login" />
            </h2>
            <form>
              <div className="form-group">
                <label for="exampleInputEmail1">
                  <FormattedMessage id="login.email" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder={
                    language === languages.VI
                      ? "Nhập email của bạn"
                      : "Enter your email"
                  }
                  value={this.state.username}
                  onChange={(event) => this.handleOnChange(event, "username")}
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">
                  <FormattedMessage id="login.password" />
                </label>
                <div className="custom-password">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder={
                      language === languages.VI
                        ? "Nhập mật khẩu của bạn"
                        : "Enter your password"
                    }
                    value={this.state.password}
                    onChange={(event) => this.handleOnChange(event, "password")}
                    onKeyPress={(event) => this.handleOnPressEnter(event)}
                  />
                  <span onClick={() => this.handleShowHide()}>
                    <i
                      className={
                        this.state.isShowPassword
                          ? "far fa-eye"
                          : "far fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className="col-12 text-right">
                <FormattedMessage id="login.forget-password" />
              </div>

              <div>
                <button
                  // type="submit"
                  className="btn btn-primary btn-login"
                  onClick={(e) => this.handleLogin(e)}
                  style={{ textTransform: "uppercase" }}
                >
                  <FormattedMessage id="login.login" />
                </button>
              </div>
              <div className="other-login">
                <div className="other-login-text text-center">
                  <FormattedMessage id="login.login-with" />
                </div>
                <div className="social-login">
                  <a href="#" className="btn-face m-b-10" role={"button"}>
                    <i
                      className="fab fa-facebook-f"
                      style={{ color: "#0A82ED" }}
                    ></i>
                    Facebook
                  </a>
                  <a href="#" className="btn-google m-b-10" role={"button"}>
                    <i
                      className="fab fa-google"
                      style={{ color: "#E94235" }}
                    ></i>
                    Google
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
