import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { DatePicker } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import _, { result } from "lodash";
import {
  getListPatientService,
  sendRemedyService,
} from "../../../services/userService";
import RemedyModal from "./RemedyModal";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(),
      listPatient: [],
      isOpenModal: false,
      dataModal: {},
    };
  }
  async componentDidMount() {
    await this.getListPatient(this.props.user, this.state.selectedDate);
  }

  getListPatient = async (user, date) => {
    let formatedDate = date.format("DD/MM/YYYY");
    let res = await getListPatientService(user.id, formatedDate);
    console.log("check res patient", res.data);
    if (res && res.errCode === 0) {
      this.setState({
        listPatient: res.data,
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {}

  onChangeDate = (value) => {
    this.setState(
      {
        selectedDate: value,
      },
      () => {
        this.getListPatient(this.props.user, this.state.selectedDate);
      }
    );
  };

  handleConfirmPatient = (item) => {
    console.log("check item", item);
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenModal: true,
      dataModal: data,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  sendDataModal = async (dataFromModal) => {
    let { dataModal } = this.state;
    let res = await sendRemedyService({
      ...dataFromModal,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res && res.errCode === 0) {
      toast.success("Send Remedy successfully!");
      this.closeModal();
      await this.getListPatient(this.props.user, this.state.selectedDate);
    } else {
      toast.error("Send Remedy failed!");
    }
    console.log("check res change status: ", res);
  };

  render() {
    let { listPatient, isOpenModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="managePatient">
          <div className="managePatient__heading">
            <FormattedMessage id="manage-patient.title" />
          </div>
          <div className="managePatient__content">
            <div className="container">
              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="manage-patient.date" />
                  </label>
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
                    value={this.state.selectedDate}
                  />
                </div>
                <div className="col-12 form-group">
                  <table className="table table-hover table-sm table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">
                          <FormattedMessage id="manage-patient.order" />
                        </th>
                        <th scope="col">
                          <FormattedMessage id="manage-patient.time" />
                        </th>
                        <th scope="col">
                          <FormattedMessage id="manage-patient.fullName" />
                        </th>
                        <th scope="col">
                          <FormattedMessage id="manage-patient.gender" />
                        </th>
                        <th scope="col">
                          <FormattedMessage id="manage-patient.address" />
                        </th>
                        <th scope="col">
                          <FormattedMessage id="manage-patient.action" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listPatient && listPatient.length > 0 ? (
                        listPatient.map((item, index) => {
                          let timeVi = item.timeTypePatient.valueVi;
                          let timeEn = item.timeTypePatient.valueEn;
                          let genderVi = item.patientData.genderData.valueVi;
                          let genderEn = item.patientData.genderData.valueEn;

                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>
                                {language === languages.VI ? timeVi : timeEn}
                              </td>
                              <td>{item.patientData.firstName}</td>
                              <td>
                                {language === languages.VI
                                  ? genderVi
                                  : genderEn}
                              </td>
                              <td>{item.patientData.address}</td>
                              <td>
                                <button
                                  className="btn btn-primary px-3"
                                  onClick={() =>
                                    this.handleConfirmPatient(item)
                                  }
                                >
                                  <FormattedMessage id="manage-patient.confirm" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6}>Không có lịch đặt</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RemedyModal
          isOpenModal={isOpenModal}
          dataModal={dataModal}
          closeModal={this.closeModal}
          sendDataModal={this.sendDataModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.userInfo,
    language: state.app.language,
    // allDoctors: state.admin.allDoctors,
    // listTime: state.admin.listTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
    fetchAllcodeTimeRedux: () => dispatch(actions.fetchAllcodeTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
