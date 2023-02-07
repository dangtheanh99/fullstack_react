import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { CRUD_ACTIONS, languages } from "../../../utils";
import { getDetailDoctorService } from "../../../services/userService";

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      listDoctors: [],
      hasData: false,
      action: "",

      // state doctor_info
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      clinicName: "",
      clinicAddress: "",
      note: "",
    };
  }
  async componentDidMount() {
    this.props.fetchAllDoctorsRedux();
    this.props.getDoctorInfor();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let selectDoctors = this.buildDataSelect(this.props.allDoctors, "USER");
      this.setState({
        listDoctors: selectDoctors,
      });
    }

    if (prevProps.language !== this.props.language) {
      let selectDoctors = this.buildDataSelect(this.props.allDoctors, "USER");
      let { resPrice, resPayment, resProvince } = this.props.allDoctorInfor;
      let listPrice = this.buildDataSelect(resPrice, "PRICE");
      let listPayment = this.buildDataSelect(resPayment, "PAYMENT");
      let listProvince = this.buildDataSelect(resProvince, "PROVINCE");
      this.setState({
        listDoctors: selectDoctors,
        listPrice,
        listPayment,
        listProvince,
      });
    }

    if (prevProps.allDoctorInfor !== this.props.allDoctorInfor) {
      let { resPrice, resPayment, resProvince } = this.props.allDoctorInfor;
      let listPrice = this.buildDataSelect(resPrice, "PRICE");
      let listPayment = this.buildDataSelect(resPayment, "PAYMENT");
      let listProvince = this.buildDataSelect(resProvince, "PROVINCE");
      this.setState({
        listPrice,
        listPayment,
        listProvince,
      });
    }
  }

  buildDataSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi =
          type === "USER"
            ? `${item.lastName} ${item.firstName}`
            : type === "PRICE"
            ? `${item.valueVi} đồng`
            : item.valueVi;
        let labelEn =
          type === "USER"
            ? `${item.firstName} ${item.lastName}`
            : type === "PRICE"
            ? `${item.valueEn} USD`
            : item.valueEn;
        object.label = language === languages.VI ? labelVi : labelEn;
        object.value = type === "USER" ? item.id : item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailDoctorService(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasData: false,
      });
    }
    console.log(`Option selected:`, this.state.selectedOption);
    console.log("check res", res);
  };

  handleChangeSelectDoctorInfor = (selectedOption, name) => {
    let stateName = name.name;
    let copyState = { ...this.state };
    copyState[stateName] = selectedOption;
    this.setState({
      ...copyState,
    });
  };

  handleChangeInput = (e, type) => {
    let copyState = { ...this.state };
    copyState[type] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSaveInfo = () => {
    console.log("Thong tin khi luu", this.state);
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action:
        this.state.hasData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      priceId: this.state.selectedPrice.value,
      paymentId: this.state.selectedPayment.value,
      provinceId: this.state.selectedProvince.value,
      nameClinic: this.state.clinicName,
      addressClinic: this.state.clinicAddress,
      note: this.state.note,
    });
  };
  render() {
    const {
      selectedOption,
      listDoctors,
      hasData,
      selectedPayment,
      selectedPrice,
      selectedProvince,
      listPrice,
      listPayment,
      listProvince,
    } = this.state;
    console.log("state: ", this.state);
    return (
      <div className="manageDoctor">
        <div className="manageDoctor__title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="manageDoctor__info">
          <div className="manageDoctor__info__left form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.choose-doctor" />
            </label>
            <Select
              value={selectedOption}
              onChange={this.handleChangeSelect}
              options={listDoctors}
            />
          </div>
          <div className="manageDoctor__info__right form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              className="manageDoctor__info__right__content"
              rows={3}
              onChange={(e) => this.handleChangeInput(e, "description")}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-4">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              value={selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listPrice}
              name="selectedPrice"
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              value={selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listPayment}
              name="selectedPayment"
            />
          </div>
          <div className="form-group col-4">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              value={selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listProvince}
              name="selectedProvince"
            />
          </div>
          <div className="form-group col-4">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.clinicName" />
            </label>
            <input
              className="form-control"
              onChange={(e) => this.handleChangeInput(e, "clinicName")}
              value={this.state.clinicName}
            ></input>
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinicAddress" />
            </label>
            <input
              className="form-control"
              onChange={(e) => this.handleChangeInput(e, "clinicAddress")}
              value={this.state.clinicAddress}
            ></input>
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(e) => this.handleChangeInput(e, "note")}
              value={this.state.note}
            ></input>
          </div>
        </div>
        <div className="manageDoctor__editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={hasData ? "btn btn-warning px-3" : "btn btn-primary px-3"}
          onClick={() => this.handleSaveInfo()}
        >
          {hasData ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.update" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.add" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // allUsers: state.admin.users,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allDoctorInfor: state.admin.allDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchUserStart()),
    deleteUserRedux: (userId) => dispatch(actions.deleteUser(userId)),
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getDoctorInfor: () => dispatch(actions.getDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
