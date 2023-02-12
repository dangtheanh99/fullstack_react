import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { languages } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import { Select } from "antd";
import { getScheduleByDateService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      selectedDay: "",
      allTime: [],
      isOpenModal: false,
      dataSchedulTime: {},
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);
    this.setState({
      allDays,
      selectedDay: allDays[0]?.value,
    });
    // if (this.props.doctorId) {
    //   let res = await getScheduleByDateService(
    //     this.props.doctorId,
    //     this.state.selectedDay
    //   );
    //   console.log("check res by date 1: ", res);
    // }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays,
        // selectedDay: allDays[0]?.value,
      });
    }

    if (prevProps.doctorId !== this.props.doctorId) {
      let res = await getScheduleByDateService(
        this.props.doctorId,
        this.state.allDays[0].value
      );
      this.setState({
        allTime: res.data ? res.data : [],
      });
    }
  }

  onHandleSelect = async (value) => {
    this.setState({
      selectedDay: value,
    });
    if (this.props.doctorId) {
      let res = await getScheduleByDateService(this.props.doctorId, value);
      console.log("check res by date: ", res);
      if (res && res.errCode === 0) {
        this.setState({
          allTime: res.data ? res.data : [],
        });
      }
    }
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === languages.VI) {
        if (i === 0) {
          let ddmm = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddmm}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddmm = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddmm}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").format("DD/MM/YYYY");
      allDays.push(object);
    }
    return allDays;
  };
  openBookingModal = (time) => {
    console.log("Check time schedule", time);
    this.setState({
      isOpenModal: true,
      dataSchedulTime: time,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  render() {
    let { allDays, selectedDay, allTime, dataSchedulTime } = this.state;
    let { language } = this.props;
    console.log("check state", this.state);
    return (
      <>
        <div className="doctorSchedule">
          <div className="doctorSchedule__day">
            <Select
              showSearch
              placeholder="Select day"
              onChange={(value) => {
                this.onHandleSelect(value);
              }}
              style={{ width: 150 }}
              value={selectedDay}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={allDays}
              className="doctorSchedule__day__select"
            />
          </div>
          <div className="doctorSchedule__time">
            <div className="doctorSchedule__time__calendar">
              <span className="doctorSchedule__time__calendar__icon">
                <i className="fas fa-calendar-alt"></i>
              </span>
              <span className="doctorSchedule__time__calendar__text">
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </div>
            <div className="doctorSchedule__time__content">
              {allTime && allTime.length > 0 ? (
                allTime.map((item, index) => {
                  let timeDisplay =
                    language === languages.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn;
                  return (
                    <span
                      key={index}
                      className={
                        language === languages.VI ? "btn-vi" : "btn-en"
                      }
                      onClick={() => this.openBookingModal(item)}
                    >
                      {timeDisplay}
                    </span>
                  );
                })
              ) : (
                <div>
                  <FormattedMessage id="patient.detail-doctor.description" />
                </div>
              )}
            </div>

            {/* <> */}
            {allTime && allTime.length > 0 && (
              <div className="doctorSchedule__book">
                <i
                  className="far fa-hand-point-up"
                  style={{ marginRight: "6px" }}
                ></i>
                <FormattedMessage id="patient.detail-doctor.book" />
              </div>
            )}
            {/* </> */}
          </div>
        </div>
        <BookingModal
          isOpen={this.state.isOpenModal}
          closeModal={this.closeModal}
          dataTime={dataSchedulTime}
        />
      </>
    );
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
