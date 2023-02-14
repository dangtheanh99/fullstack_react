import React, { Component } from "react";
import { connect } from "react-redux";
import "./VerifyEmail.scss";
import { FormattedMessage } from "react-intl";
import { verifyBookingAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import { Spin } from "antd";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      status: 1,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      console.log("check prop verify: ", this.props);
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await verifyBookingAppointment({
        doctorId: doctorId,
        token: token,
      });
      this.setState({
        loading: false,
      });
      if (res && res.errCode === 0) {
        this.setState({
          status: res.errCode,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <>
        <HomeHeader />
        <Spin spinning={this.state.loading}>
          {this.state.status === 0 ? (
            <div className="statusVerify" style={{ color: "#28a745" }}>
              Xác nhận lịch hẹn thành công.
            </div>
          ) : (
            <div className="statusVerify" style={{ color: "#c82333" }}>
              Lịch hẹn không tồn tại hoặc đã được xác nhận.
            </div>
          )}
        </Spin>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
