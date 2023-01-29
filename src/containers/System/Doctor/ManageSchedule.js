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
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      listDoctors: [],
      rangeTime: [],
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
      this.setState({
        rangeTime: this.props.listTime,
      });
    }
  }
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    // let res = await getDetailDoctorService(selectedOption.value);
    // if (res && res.errCode === 0 && res.data && res.data.Markdown) {
    //   let markdown = res.data.Markdown;
    //   this.setState({
    //     contentHTML: markdown.contentHTML,
    //     contentMarkdown: markdown.contentMarkdown,
    //     description: markdown.description,
    //     hasData: true,
    //   });
    // } else {
    //   this.setState({
    //     contentHTML: "",
    //     contentMarkdown: "",
    //     description: "",
    //     hasData: false,
    //   });
    // }
    console.log(`Option selected:`, this.state.selectedOption);
    // console.log("check res", res);
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
    console.log("pick date", value.format("DD-MM-YYYY"));
  };
  render() {
    let { selectedOption, listDoctors, rangeTime } = this.state;
    let { language } = this.props;
    console.log("check state: ", this.state);
    console.log("check prop", this.props);
    return (
      <div className="manageSchedule">
        <div className="manageSchedule__heading">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="manageSchedule__content">
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.doctor" />
                </label>
                <Select
                  value={selectedOption}
                  onChange={this.handleChangeSelect}
                  options={listDoctors}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.date" />
                </label>
                {/* <input className="form-control" /> */}
                <DatePicker
                  onChange={this.onChangeDate}
                  className="form-control"
                  disabledDate={(current) => {
                    let customDate = moment().format("DD-MM-YYYY");
                    return (
                      current && current < moment(customDate, "DD-MM-YYYY")
                    );
                  }}
                  locale="vi"
                  format="DD/MM/YYYY"
                />
              </div>
              <div className="pickTime">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <div className="pickTime__item" key={index}>
                        {language === languages.VI
                          ? item.valueVi
                          : item.valueEn}
                      </div>
                    );
                  })}
              </div>
              <button className="btn btn-primary px-3 ml-3">
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
    fetchAllcodeTimeRedux: () => dispatch(actions.fetchAllcodeTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
