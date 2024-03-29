import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "./ProfileDoctor";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { DatePicker, Spin, Button } from "antd";
import moment from "moment";
import { postBookingAppointment } from "../../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      // birthday: "",
      genders: [],
      selectedGender: "",
      doctorId: "",
      timeType: "",
      date: "",
      loading: false,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
  }

  buildDataGenders = (array) => {
    let finalArr = [];
    if (array && array.length > 0) {
      array.map((item) => {
        let object = {};
        object.label =
          this.props.language === languages.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        finalArr.push(object);
      });
    }
    return finalArr;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genders: this.buildDataGenders(this.props.genderRedux),
      });
    }
    if (prevProps.language !== this.props.language) {
      this.setState({
        genders: this.buildDataGenders(this.props.genderRedux),
      });
    }
    if (prevProps.dataTime !== this.props.dataTime) {
      let { dataTime } = this.props;
      this.setState({
        doctorId: dataTime.doctorId,
        timeType: dataTime.timeType,
        date: dataTime.date,
      });
    }
  }

  handleChangeInput = (e, type) => {
    let copyState = { ...this.state };
    copyState[type] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  // onChangeDate = (value) => {
  //   this.setState({
  //     birthday: value,
  //   });
  // };

  handleChangeSelect = (selectedGender) => {
    this.setState({
      selectedGender,
    });
  };

  validateEmail = (text) => {
    if (text) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(text.toLowerCase());
    }
    return false;
  };

  validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      var re =
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
      return re.test(phoneNumber);
    }
    return false;
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let dateVi = moment(dataTime.date, "DD/MM/YYYY").format(
        "dddd - DD/MM/YYYY"
      );

      let date =
        language === languages.VI
          ? this.capitalizeFirstLetter(dateVi)
          : moment(dataTime.date, "DD/MM/YYYY")
              .locale("en")
              .format("dddd - DD/MM/YYYY");
      let time =
        language === languages.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      return `${time} - ${date}`;
    }
    return <></>;
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let nameVi = `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
      let nameEn = `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
      let doctorName = language === languages.VI ? nameVi : nameEn;
      return doctorName;
    }
    return "";
  };

  checkValidateInput = () => {
    let { language } = this.props;
    let { email, phoneNumber } = this.state;
    let isValid = true;
    let arrCheck = [
      "email",
      "fullName",
      "phoneNumber",
      "reason",
      "selectedGender",
      "address",
    ];

    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        if (language === languages.VI) {
          toast.error(`Thiếu trường, vui lòng nhập đủ thông tin`);
        } else {
          toast.error(`Missing field, please enter enough information`);
        }
        break;
      }
    }
    if (email) {
      if (!this.validateEmail(email)) {
        isValid = false;
        if (language === languages.VI) {
          toast.error(`Chưa đúng định dạng email, vui lòng nhập lại!`);
        } else {
          toast.error(`Email format is not correct, please re-enter!`);
        }
      }
    }
    if (phoneNumber) {
      if (!this.validatePhoneNumber(phoneNumber)) {
        isValid = false;
        if (language === languages.VI) {
          toast.error(`Chưa đúng định dạng số điện thoại, vui lòng nhập lại!`);
        } else {
          toast.error(`Invalid phone number format, please re-enter!`);
        }
      }
    }
    return isValid;
  };

  handleSaveInfo = async () => {
    let { dataTime, language } = this.props;
    console.log("save infor", this.state);
    let isValidated = this.checkValidateInput();
    if (!isValidated) return;
    let timeText = this.buildTimeBooking(dataTime);
    let doctorName = this.buildDoctorName(dataTime);
    this.setState({
      loading: true,
    });

    let res = await postBookingAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.state.date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      timeText: timeText,
      doctorName: doctorName,
      language: language,
    });
    if (res && res.errCode === 0) {
      this.setState({
        loading: false,
      });
      if (language === languages.VI) {
        toast.success(
          "Đặt lịch hẹn thành công. Vui lòng check email để xác nhận đặt lịch!"
        );
      } else {
        toast.success(
          "Book a appointment successfully. Please check your email to confirm your booking!"
        );
      }
      this.props.closeModal();
      this.setState({
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        reason: "",
        date: "",
        selectedGender: undefined,
        doctorId: "",
        timeType: "",
      });
    } else {
      this.setState({
        loading: false,
      });
      if (language === languages.VI) {
        toast.error("Đặt lịch hẹn không thành công!");
      } else {
        toast.error("Book a appointment failed!");
      }
    }
  };

  render() {
    let { isOpen, closeModal, dataTime, language } = this.props;
    let { genders, selectedGender, loading } = this.state;
    return (
      <Modal isOpen={isOpen} className="bookingModal" size="lg" centered>
        <Spin
          spinning={loading}
          tip={
            language === languages.VI
              ? "Đang thực hiện đặt lịch..."
              : "Loading..."
          }
        >
          <ModalHeader className="bookingModal__header" toggle={closeModal}>
            <FormattedMessage id="patient.booking.title" />
          </ModalHeader>
          <ModalBody className="bookingModal__body">
            <div className="row">
              <div className="doctor-infor col-12">
                <ProfileDoctor
                  doctorId={dataTime.doctorId}
                  isShowDesc={false}
                  isShowPrice={true}
                  isShowDetail={false}
                  dataTime={dataTime}
                />
              </div>

              <div className="col-6 form-group">
                <label>
                  *<FormattedMessage id="patient.booking.fullName" />
                </label>
                <input
                  className="form-control"
                  onChange={(e) => this.handleChangeInput(e, "fullName")}
                  value={this.state.fullName}
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>
                  *<FormattedMessage id="patient.booking.phoneNumber" />
                </label>
                <input
                  className="form-control"
                  onChange={(e) => this.handleChangeInput(e, "phoneNumber")}
                  value={this.state.phoneNumber}
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>
                  *<FormattedMessage id="patient.booking.email" />
                </label>
                <input
                  className="form-control"
                  onChange={(e) => this.handleChangeInput(e, "email")}
                  value={this.state.email}
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>
                  *<FormattedMessage id="patient.booking.address" />
                </label>
                <input
                  className="form-control"
                  onChange={(e) => this.handleChangeInput(e, "address")}
                  value={this.state.address}
                ></input>
              </div>
              <div className="col-12 form-group">
                <label>
                  *<FormattedMessage id="patient.booking.reason" />
                </label>
                <input
                  className="form-control"
                  onChange={(e) => this.handleChangeInput(e, "reason")}
                  value={this.state.reason}
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>
                  *<FormattedMessage id="patient.booking.gender" />
                </label>
                <Select
                  value={selectedGender}
                  onChange={this.handleChangeSelect}
                  options={genders}
                  placeholder={
                    <FormattedMessage id="patient.booking.chooseGender" />
                  }
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="bookingModal__footer">
            <Button type="primary" onClick={() => this.handleSaveInfo()}>
              <FormattedMessage id="patient.booking.confirm" />
            </Button>
            <Button onClick={closeModal}>
              <FormattedMessage id="patient.booking.cancel" />
            </Button>
          </ModalFooter>
        </Spin>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
