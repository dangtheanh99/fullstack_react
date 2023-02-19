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
      listSpecialty: [],
      listClinic: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedSpecialty: "",
      selectedClinic: "",
      nameClinic: "",
      addressClinic: "",
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
      let { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
        this.props.allDoctorInfor;
      let listPrice = this.buildDataSelect(resPrice, "PRICE");
      let listPayment = this.buildDataSelect(resPayment, "PAYMENT");
      let listProvince = this.buildDataSelect(resProvince, "PROVINCE");
      let listSpecialty = this.buildDataSelect(resSpecialty, "SPECIALTY");
      let listClinic = this.buildDataSelect(resClinic, "CLINIC");

      this.setState({
        listDoctors: selectDoctors,
        listPrice,
        listPayment,
        listProvince,
        listSpecialty,
        listClinic,
      });
    }

    if (prevProps.allDoctorInfor !== this.props.allDoctorInfor) {
      let { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
        this.props.allDoctorInfor;
      let listPrice = this.buildDataSelect(resPrice, "PRICE");
      let listPayment = this.buildDataSelect(resPayment, "PAYMENT");
      let listProvince = this.buildDataSelect(resProvince, "PROVINCE");
      let listSpecialty = this.buildDataSelect(resSpecialty, "SPECIALTY");
      let listClinic = this.buildDataSelect(resClinic, "CLINIC");
      this.setState({
        listPrice,
        listPayment,
        listProvince,
        listSpecialty,
        listClinic,
      });
    }
  }

  buildDataSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = language === languages.VI ? item.nameVi : item.nameEn;
          object.value = item.id;
          result.push(object);
        });
      } else if (type === "CLINIC") {
        inputData.map((item) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      } else {
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
    }
    return result;
  };

  findObjSelected = (array, id) => {
    let item = array.find((item) => item.value === id);
    return item;
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPrice, listPayment, listProvince, listSpecialty, listClinic } =
      this.state;
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
    // doctor_infor
    if (res && res.errCode === 0 && res.data && res.data.Doctor_infor) {
      let Doctor_infor = res.data.Doctor_infor;
      let selectedPrice = this.findObjSelected(listPrice, Doctor_infor.priceId);
      let selectedPayment = this.findObjSelected(
        listPayment,
        Doctor_infor.paymentId
      );
      let selectedProvince = this.findObjSelected(
        listProvince,
        Doctor_infor.provinceId
      );
      let selectedSpecialty = this.findObjSelected(
        listSpecialty,
        Doctor_infor.specialtyId
      );
      let selectedClinic = this.findObjSelected(
        listClinic,
        Doctor_infor.clinicId
      );
      this.setState({
        nameClinic: Doctor_infor.nameClinic,
        addressClinic: Doctor_infor.addressClinic,
        note: Doctor_infor.note,
        selectedPrice,
        selectedPayment,
        selectedProvince,
        selectedSpecialty,
        selectedClinic,
      });
    } else {
      this.setState({
        nameClinic: "",
        addressClinic: "",
        note: "",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        selectedSpecialty: "",
        selectedClinic: "",
      });
    }
    // console.log(`Option selected:`, this.state.selectedOption);
    // console.log("check res", res);
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
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSaveInfo = () => {
    console.log("Thông tin khi lưu vào database: ", this.state);
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
      specialtyId: this.state.selectedSpecialty.value,
      clinicId: this.state.selectedClinic.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
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
      selectedSpecialty,
      selectedClinic,
      listPrice,
      listPayment,
      listProvince,
      listSpecialty,
      listClinic,
    } = this.state;
    return (
      <div className="manageDoctor">
        <div className="manageDoctor__title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="manageDoctor__info">
          <div className="manageDoctor__info__left form-group">
            <label></label>
            <FormattedMessage id="admin.manage-doctor.doctor" />
            <Select
              value={selectedOption}
              onChange={this.handleChangeSelect}
              options={listDoctors}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.choose-doctor" />
              }
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
              placeholder={
                <FormattedMessage id="admin.manage-doctor.choosePrice" />
              }
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
              placeholder={
                <FormattedMessage id="admin.manage-doctor.choosePayment" />
              }
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
              placeholder={
                <FormattedMessage id="admin.manage-doctor.chooseProvince" />
              }
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="admin.manage-doctor.specialty" />
            </label>
            <Select
              value={selectedSpecialty}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listSpecialty}
              name="selectedSpecialty"
              placeholder={
                <FormattedMessage id="admin.manage-doctor.chooseSpecialty" />
              }
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinic" />
            </label>
            <Select
              value={selectedClinic}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listClinic}
              name="selectedClinic"
              placeholder={
                <FormattedMessage id="admin.manage-doctor.chooseClinic" />
              }
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              className="form-control"
              onChange={(e) => this.handleChangeInput(e, "nameClinic")}
              value={this.state.nameClinic}
            ></input>
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              onChange={(e) => this.handleChangeInput(e, "addressClinic")}
              value={this.state.addressClinic}
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
            style={{ height: "300px" }}
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
