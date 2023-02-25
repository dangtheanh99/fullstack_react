import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
import "react-markdown-editor-lite/lib/index.css";
import { languages } from "../../../utils";
import { UploadOutlined } from "@ant-design/icons";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "../../App.scss";

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVi: "",
      nameEn: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      isOpen: false,
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleChangeInput = (e, type) => {
    let copyState = { ...this.state };
    copyState[type] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleSaveSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Create a new specialty successfully!");
      this.setState({
        nameVi: "",
        nameEn: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Create a new specialty failed!");
    }
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  render() {
    let { language } = this.props;
    let { imageBase64, nameEn, nameVi, descriptionMarkdown, isOpen } =
      this.state;
    return (
      <div className="manageSpecialty">
        <div className="manageSpecialty__title">
          <FormattedMessage id="manage-specialty.title" />{" "}
        </div>
        <div className="manageSpecialty__content row">
          <div className="manageSpecialty__content__name form-group col-6">
            <label>
              <FormattedMessage id="manage-specialty.nameSpecialty" />
            </label>
            <input
              className="form-control"
              type="text"
              value={this.state.nameVi}
              placeholder={
                language === languages.VI
                  ? "Nhập tên Tiếng Việt"
                  : "Enter Vietnamese name"
              }
              style={{ width: "70%" }}
              onChange={(event) => this.handleChangeInput(event, "nameVi")}
            ></input>
            <input
              className="form-control"
              type="text"
              value={this.state.nameEn}
              placeholder={
                language === languages.VI
                  ? "Nhập tên Tiếng Anh"
                  : "Enter English name"
              }
              style={{ width: "70%" }}
              onChange={(event) => this.handleChangeInput(event, "nameEn")}
            ></input>
          </div>
          <div className="manageSpecialty__content__image form-group col-6">
            <label style={{ marginBottom: "16px" }}>
              <FormattedMessage id="manage-specialty.image" />
            </label>
            <div>
              <input
                id="upload"
                type="file"
                hidden
                onChange={(event) => this.handleOnChangeImage(event)}
              />
              {imageBase64 && (
                <img
                  src={imageBase64}
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
              {isOpen && (
                <Lightbox
                  mainSrc={imageBase64}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                />
              )}
            </div>
          </div>
          <div className="manageSpecialty__content__description form-group col-12 ">
            <label>
              <FormattedMessage id="manage-specialty.description" />
            </label>
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
        </div>
        <button
          className="btn btn-primary px-3"
          onClick={() => this.handleSaveSpecialty()}
        >
          <FormattedMessage id="manage-specialty.save" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
