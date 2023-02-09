import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";
import { getDetailDoctorService } from "../../../services/userService";
import { languages } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}
  render() {
    return <div>Hello from booking modal</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
