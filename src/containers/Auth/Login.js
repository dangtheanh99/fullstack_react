import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
import adminService from "../../services/adminService";
import { userLoginSuccess } from "../../store/actions/userActions";

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

  handleShowHide = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <h2 className="login-content-heading">Login</h2>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter your username"
                  value={this.state.username}
                  onChange={(event) => this.handleOnChange(event, "username")}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <div className="custom-password">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={(event) => this.handleOnChange(event, "password")}
                  />
                  <span onClick={() => this.handleShowHide()}>
                    <i
                      class={
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
              <div className="col-12 text-right">Forgot password?</div>

              <div>
                <button
                  // type="submit"
                  class="btn btn-primary btn-login"
                  onClick={(e) => this.handleLogin(e)}
                >
                  LOGIN
                </button>
              </div>
              <div className="other-login">
                <div className="other-login-text text-center">
                  Or login with
                </div>
                <div className="social-login">
                  <a href="#" className="btn-face m-b-10" role={"button"}>
                    <i className="fa fa-facebook-official"></i>Facebook
                  </a>
                  <a href="#" className="btn-google m-b-10" role={"button"}>
                    <i className="fa-brands fa-google"></i>Google
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
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
