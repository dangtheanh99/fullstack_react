import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { languages, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "antd/dist/antd.css";
import TableManageUser from "./TableManageUser";
import { UploadOutlined } from "@ant-design/icons";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "../../App.scss";
import { toast } from "react-toastify";

const initialState = {
  imageUrl: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  address: "",
  gender: "",
  role: "",
  phoneNumber: "",
  position: "",
  image: "",
  action: "",
  userEditId: "",
};
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrGender: [],
      arrRole: [],
      arrPosition: [],
      isOpen: false,
      ...initialState,
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
    this.props.getPositionStart();
  }

  componentDidUpdate(prevProps, prevState) {
    let arrGender = this.props.genderRedux;
    let arrRole = this.props.roleRedux;
    let arrPosition = this.props.positionRedux;
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        arrPosition,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }

    if (prevProps.allUsers !== this.props.allUsers) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        image: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      var re =
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
      return re.test(phoneNumber);
    }
    return false;
  };

  handleSaveUser = () => {
    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      role,
      position,
      userEditId,
      image,
    } = this.state;
    let isValidated = this.checkValidateInput();
    let { action } = this.state;
    if (!isValidated) return;

    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editUserRedux({
        firstName: firstName,
        lastName: lastName,
        address: address,
        phoneNumber: phoneNumber,
        gender: gender,
        roleId: role,
        positionId: position,
        id: userEditId,
        image: image,
        language: this.props.language,
      });
    } else {
      this.props.createNewUser({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        address: address,
        phoneNumber: phoneNumber,
        gender: gender,
        roleId: role,
        positionId: position,
        image: image,
        language: this.props.language,
      });
    }
  };

  editUser = async (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "hardcode",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      gender: user.gender,
      role: user.roleId,
      phoneNumber: user.phoneNumber,
      position: user.positionId,
      image: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  onChangeInput = (e, value) => {
    let copyState = { ...this.state };
    copyState[value] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        image: base64,
      });
    }
  };

  checkValidateInput = () => {
    let { language } = this.props;
    let { email, phoneNumber } = this.state;
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      // "lastName",
      "firstName",
      // "address",
      "phoneNumber",
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

  render() {
    let { arrGender, arrPosition, arrRole } = this.state;
    let {
      email,
      password,
      lastName,
      firstName,
      address,
      phoneNumber,
      gender,
      role,
      position,
      image,
      action,
    } = this.state;
    let lang = this.props.language;
    return (
      <div className="user-redux-container" style={{ marginBottom: "30px" }}>
        <div className="title">
          <FormattedMessage id="manage-user.title" />
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div
                className="col-12 my-3"
                style={{ fontSize: "20px", fontWeight: "500" }}
              >
                {action === CRUD_ACTIONS.EDIT ? (
                  <FormattedMessage id="manage-user.edit" />
                ) : (
                  <FormattedMessage id="manage-user.add" />
                )}
              </div>
              <div className="col-3 form-group">
                <label>
                  *
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => this.onChangeInput(e, "email")}
                  disabled={action === CRUD_ACTIONS.EDIT}
                />
              </div>
              <div className="col-3 form-group">
                <label>
                  *
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => this.onChangeInput(e, "password")}
                  disabled={action === CRUD_ACTIONS.EDIT}
                />
              </div>
              <div className="col-3 form-group">
                <label>
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => this.onChangeInput(e, "lastName")}
                />
              </div>
              <div className="col-3 form-group">
                <label>
                  *
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => this.onChangeInput(e, "firstName")}
                />
              </div>
              <div className="col-3 form-group">
                <label>
                  *
                  <FormattedMessage id="manage-user.phoneNumber" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => this.onChangeInput(e, "phoneNumber")}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => this.onChangeInput(e, "address")}
                />
              </div>
              <div className="col-3 form-group">
                <label>
                  *
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  class="form-control"
                  onChange={(e) => this.onChangeInput(e, "gender")}
                  value={gender}
                >
                  {arrGender &&
                    arrGender.length > 0 &&
                    arrGender.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {lang === languages.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 form-group">
                <label>
                  *
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  class="form-control"
                  onChange={(e) => this.onChangeInput(e, "position")}
                  value={position}
                >
                  {arrPosition &&
                    arrPosition.length > 0 &&
                    arrPosition.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {lang === languages.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 form-group">
                <label>
                  *
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  class="form-control"
                  onChange={(e) => this.onChangeInput(e, "role")}
                  value={role}
                >
                  {arrRole &&
                    arrRole.length > 0 &&
                    arrRole.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {lang === languages.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 form-group">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div style={{ marginTop: "8px" }}>
                  <input
                    id="upload"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  {image && (
                    <img
                      src={image}
                      className="imageUpload"
                      onClick={() => {
                        this.setState({
                          isOpen: true,
                        });
                      }}
                    />
                  )}
                  <label htmlFor="upload" className="uploadBtn">
                    <UploadOutlined className="uploadBtn__icon" />{" "}
                    <FormattedMessage id="manage-user.upload" />
                  </label>
                  {this.state.isOpen && (
                    <Lightbox
                      mainSrc={image}
                      onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                  )}
                </div>
              </div>
              <div className="col-12 mt-4">
                <button
                  className={
                    action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning px-3"
                      : "btn btn-primary px-3"
                  }
                  onClick={() => this.handleSaveUser()}
                  style={{ marginRight: "8px" }}
                >
                  {action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.update" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>

                <button
                  className="btn btn-secondary px-3"
                  onClick={() => {
                    this.setState({
                      ...initialState,
                    });
                  }}
                >
                  <FormattedMessage id="manage-user.reset" />
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <h5
                  style={{
                    marginTop: "12px",
                    textAlign: "center",
                    fontSize: "20px",
                  }}
                >
                  <FormattedMessage id="manage-user.table" />
                </h5>
                <TableManageUser editUser={this.editUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    allUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    editUserRedux: (data) => dispatch(actions.editUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
