import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageHandbook.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewHandbook } from "../../../services/userService";
import { toast } from "react-toastify";
import "react-markdown-editor-lite/lib/index.css";
import { languages } from "../../../utils";
import { UploadOutlined } from "@ant-design/icons";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "../../App.scss";

const mdParser = new MarkdownIt();

class ManageHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
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

  checkValidateInput = () => {
    let { language } = this.props;
    let isValid = true;
    let arrCheck = ["name", "image", "descriptionHTML", "descriptionMarkdown"];

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

    return isValid;
  };

  handleSaveClinic = async () => {
    let { language } = this.props;
    if (!this.checkValidateInput()) return;
    let res = await createNewHandbook(this.state);
    console.log("res", res);
    if (res && res.errCode === 0) {
      if (language === languages.VI) {
        toast.success("Tạo mới cẩm nang thành công!");
      } else {
        toast.success("Create a new handbook successfully!");
      }

      this.setState({
        name: "",
        image: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      if (language === languages.VI) {
        toast.error("Tạo mới cẩm nang không thành công!");
      } else {
        toast.error("Create a new handbook failed!");
      }
    }
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

  render() {
    let { language } = this.props;
    let { image, name, descriptionMarkdown, isOpen } = this.state;
    return (
      <div className="manageHandbook">
        <div className="manageHandbook__title">
          <FormattedMessage id="manage-handbook.title" />{" "}
        </div>
        <div className="manageHandbook__content row">
          <div className="manageHandbook__content__name form-group col-6">
            <label>
              <FormattedMessage id="manage-handbook.name" />
            </label>
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(event) => this.handleChangeInput(event, "name")}
            ></input>
          </div>
          <div className="manageHandbook__content__image form-group col-6">
            <label style={{ marginBottom: "16px" }}>
              <FormattedMessage id="manage-handbook.image" />
            </label>
            <div>
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
              {isOpen && (
                <Lightbox
                  mainSrc={image}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                />
              )}
            </div>
          </div>
          <div className="manageHandbook__content__description form-group col-12 ">
            <label>
              <FormattedMessage id="manage-handbook.description" />
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
          <FormattedMessage id="manage-handbook.save" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
