import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { languages } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}
  render() {
    return <div>Doctor Schedule</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
