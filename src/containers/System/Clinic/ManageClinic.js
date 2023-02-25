import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";
import "react-markdown-editor-lite/lib/index.css";
import { languages } from "../../../utils";
import { UploadOutlined } from "@ant-design/icons";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "../../App.scss";

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      address: "",
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

  handleSaveClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Create a new clinic successfully!");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        address: "",
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
    let { name, address, imageBase64, descriptionMarkdown } = this.state;
    return (
      <div className="manageClinic">
        <div className="manageClinic__title">
          <FormattedMessage id="manage-clinic.title" />{" "}
        </div>
        <div className="manageClinic__content row">
          <div className="manageClinic__content__name form-group col-6">
            <label>
              <FormattedMessage id="manage-clinic.nameSpecialty" />
            </label>
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(event) => this.handleChangeInput(event, "name")}
            ></input>
          </div>
          <div className="manageClinic__content__address form-group col-6">
            <label>
              <FormattedMessage id="manage-clinic.address" />
            </label>
            <input
              className="form-control"
              type="text"
              value={address}
              onChange={(event) => this.handleChangeInput(event, "address")}
            ></input>
          </div>
          <div className="manageClinic__content__image form-group col-6">
            <label style={{ marginBottom: "16px" }}>
              <FormattedMessage id="manage-clinic.image" />
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
              {this.state.isOpen && (
                <Lightbox
                  mainSrc={imageBase64}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                />
              )}
            </div>
          </div>
          <div className="manageClinic__content__description form-group col-12 ">
            <label>
              <FormattedMessage id="manage-clinic.description" />
            </label>
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={descriptionMarkdown}
            />
          </div>
        </div>
        <button
          className="btn btn-primary px-3"
          onClick={() => this.handleSaveClinic()}
        >
          <FormattedMessage id="manage-clinic.save" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
