import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { getExtraInforDoctorService } from "../../../services/userService";
import { languages } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInforDoctor: [],
    };
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  async componentDidMount() {
    let res = await getExtraInforDoctorService(this.props.doctorId);
    if (res && res.errCode === 0) {
      this.setState({
        extraInforDoctor: res.data,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    // if (prevProps.)
    if (prevProps.doctorId !== this.props.doctorId) {
      let res = await getExtraInforDoctorService(this.props.doctorId);
      console.log("data", res);
      if (res && res.errCode === 0) {
        this.setState({
          extraInforDoctor: res.data,
        });
      }
    }
  }
  render() {
    let { isShowDetailInfor, extraInforDoctor } = this.state;
    let { language } = this.props;
    console.log("check state extraInfor", this.state);
    return (
      <div className="doctorExtraInfor">
        <div className="doctorExtraInfor__up">
          <div className="doctorExtraInfor__up__title">
            <FormattedMessage id="patient.extra-infor-doctor.title" />{" "}
          </div>
          <div className="doctorExtraInfor__up__nameClinic">
            {extraInforDoctor && extraInforDoctor.nameClinic
              ? extraInforDoctor.nameClinic
              : ""}
          </div>
          <div className="doctorExtraInfor__up__addressClinic">
            {extraInforDoctor && extraInforDoctor.addressClinic
              ? extraInforDoctor.addressClinic
              : ""}
          </div>
        </div>
        <div className="doctorExtraInfor__down">
          {!isShowDetailInfor && (
            <div className="firstBlock">
              <span className="firstBlock__title">
                <FormattedMessage id="patient.extra-infor-doctor.price" />:{" "}
              </span>
              <span className="firstBlock__price">
                {extraInforDoctor &&
                  extraInforDoctor.priceData &&
                  language === languages.VI && (
                    <NumberFormat
                      value={extraInforDoctor.priceData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"VND"}
                    />
                  )}
                {extraInforDoctor &&
                  extraInforDoctor.priceData &&
                  language === languages.EN && (
                    <NumberFormat
                      value={extraInforDoctor.priceData.valueEn}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"$"}
                    />
                  )}
              </span>
              <span
                onClick={() => this.showHideDetailInfor(true)}
                className="firstBlock__show"
              >
                <FormattedMessage id="patient.extra-infor-doctor.detail" />
              </span>
            </div>
          )}

          {isShowDetailInfor && (
            <div className="secondBlock">
              <div className="secondBlock__title">
                <FormattedMessage id="patient.extra-infor-doctor.price" />:{" "}
              </div>
              <div className="secondBlock__price">
                <div style={{ paddingRight: "10px", width: "70%" }}>
                  <div>
                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                  </div>
                  <div style={{ color: "#666", fontSize: "12px" }}>
                    {extraInforDoctor && extraInforDoctor.note
                      ? extraInforDoctor.note
                      : ""}
                  </div>
                </div>
                <span>
                  {extraInforDoctor &&
                    extraInforDoctor.priceData &&
                    language === languages.VI && (
                      <NumberFormat
                        value={extraInforDoctor.priceData.valueVi}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"VND"}
                      />
                    )}
                  {extraInforDoctor &&
                    extraInforDoctor.priceData &&
                    language === languages.EN && (
                      <NumberFormat
                        value={extraInforDoctor.priceData.valueEn}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"$"}
                      />
                    )}
                </span>
              </div>
              <div className="secondBlock__payment">
                <FormattedMessage id="patient.extra-infor-doctor.methodPayment" />
                {/* Phòng khám có thanh toán bằng hình thức */}
                <span style={{ marginLeft: "4px", textTransform: "lowercase" }}>
                  {extraInforDoctor &&
                  extraInforDoctor.paymentData &&
                  language === languages.VI
                    ? extraInforDoctor.paymentData.valueVi
                    : ""}
                  {extraInforDoctor &&
                  extraInforDoctor.paymentData &&
                  language === languages.EN
                    ? extraInforDoctor.paymentData.valueEn
                    : ""}
                </span>
              </div>
              <div
                className="secondBlock__hide"
                onClick={() => this.showHideDetailInfor(false)}
              >
                <FormattedMessage id="patient.extra-infor-doctor.hide" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // systemMenuPath: state.app.systemMenuPath,
    // isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
