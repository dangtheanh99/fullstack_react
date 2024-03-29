import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { DatePicker } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import _, { result } from "lodash";
import { saveBulkScheduleService } from "../../../services/userService";
import vi_VN from "antd/es/date-picker/locale/vi_VN";
import en_US from "antd/es/date-picker/locale/en_US";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      listDoctors: [],
      rangeTime: [],
      selectedDate: moment(),
    };
  }
  async componentDidMount() {
    this.props.fetchAllDoctorsRedux();
    this.props.fetchAllcodeTimeRedux();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let selectDoctors = this.buildDataSelect(this.props.allDoctors);
      this.setState({
        listDoctors: selectDoctors,
      });
    }

    if (prevProps.language !== this.props.language) {
      let selectDoctors = this.buildDataSelect(this.props.allDoctors);
      this.setState({
        listDoctors: selectDoctors,
      });
    }

    if (prevProps.listTime !== this.props.listTime) {
      let data = this.props.listTime;
      data = data.map((item) => {
        return { ...item, isSelected: false };
      });
      // console.log("check data selected", data);
      this.setState({
        rangeTime: data,
      });
    }
  }
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleSelectTime = (itemSelected) => {
    // console.log("check itemSelected", itemSelected);
    let { rangeTime } = this.state;
    let result = rangeTime;
    if (result && result.length > 0) {
      let indexItem = result.findIndex((item) => item.id === itemSelected.id);
      result[indexItem].isSelected = !result[indexItem].isSelected;
      this.setState({
        rangeTime: result,
      });
    }
  };

  buildDataSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === languages.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  onChangeDate = (value) => {
    this.setState({
      selectedDate: value,
    });
  };

  handleSaveSchedule = async () => {
    let { selectedDate, selectedOption, rangeTime } = this.state;
    let { language, user } = this.props;
    let result = [];
    if (user.roleId !== "R2") {
      if (!selectedOption) {
        if (language === languages.VI) {
          toast.error("Chưa chọn bác sĩ!");
        } else {
          toast.error("Missing Doctor selection!");
        }
        return;
      }
    }
    if (!selectedDate) {
      if (language === languages.VI) {
        toast.error("Chưa chọn ngày khám!");
      } else {
        toast.error("Missing Date selection!");
      }
      return;
    }
    let formatedDate = selectedDate.format("DD/MM/YYYY");

    if (rangeTime && rangeTime.length > 0) {
      let arrTime = rangeTime.filter((item) => item.isSelected === true);
      if (arrTime && arrTime.length > 0) {
        arrTime.map((item) => {
          let object = {};
          object.doctorId =
            user.roleId === "R2" ? user.id : selectedOption.value;
          object.date = formatedDate;
          object.timeType = item.keyMap;
          result.push(object);
        });
      } else {
        if (language === languages.VI) {
          toast.error("Chưa chọn thời gian khám!");
        } else {
          toast.error("Missing Time selection!");
        }
        return;
      }
    }
    if (!_.isEmpty(result)) {
      let initRangeTime = rangeTime.map((item) => {
        return { ...item, isSelected: false };
      });
      this.setState({
        // selectedDate: moment(),
        // selectedOption: "",
        rangeTime: initRangeTime,
      });
    }

    let res = await saveBulkScheduleService({
      arrSchedule: result,
      doctorId: user.roleId === "R2" ? user.id : selectedOption.value,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      if (language === languages.VI) {
        toast.success("Lưu thành công!");
      } else {
        toast.success("Save successfully!");
      }
    } else {
      if (language === languages.VI) {
        toast.error("Lưu thất bại!");
      } else {
        toast.error("Save failed!");
      }
    }
    console.log("check res schedule: ", res);
  };
  render() {
    let { selectedOption, listDoctors, rangeTime, selectedDate } = this.state;
    let { language, user } = this.props;
    // console.log("user info", this.props.user);
    return (
      <div className="manageSchedule">
        <div className="manageSchedule__heading">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="manageSchedule__content">
          <div className="container">
            <div className="row">
              {user && user.roleId !== "R2" && (
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="manage-schedule.doctor" />
                  </label>
                  <Select
                    value={selectedOption}
                    onChange={this.handleChangeSelect}
                    options={listDoctors}
                    placeholder={
                      <FormattedMessage id="manage-schedule.choose-doctor" />
                    }
                    className="chooseDoctor"
                  />
                </div>
              )}
              <div className="col-6 form-group">
                <label style={{ display: "block" }}>
                  <FormattedMessage id="manage-schedule.date" />
                </label>
                <DatePicker
                  onChange={this.onChangeDate}
                  className="form-control chooseDate"
                  disabledDate={(current) => {
                    let customDate = moment().format("DD-MM-YYYY");
                    return (
                      current && current < moment(customDate, "DD-MM-YYYY")
                    );
                  }}
                  locale={language === languages.VI ? vi_VN : en_US}
                  format="DD/MM/YYYY"
                  value={selectedDate}
                />
              </div>
              <div className="pickTime">
                <div className="pickTime__title">
                  <FormattedMessage id="manage-schedule.choose-time" />
                </div>
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <div
                        className={`${
                          item.isSelected
                            ? "pickTime__item active"
                            : "pickTime__item"
                        } ${language === languages.VI ? "vi" : "en"}`}
                        key={index}
                        onClick={() => this.handleSelectTime(item)}
                      >
                        {language === languages.VI
                          ? item.valueVi
                          : item.valueEn}
                      </div>
                    );
                  })}
              </div>
              <button
                className="btn btn-primary px-3 ml-3"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    listTime: state.admin.listTime,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
    fetchAllcodeTimeRedux: () => dispatch(actions.fetchAllcodeTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
