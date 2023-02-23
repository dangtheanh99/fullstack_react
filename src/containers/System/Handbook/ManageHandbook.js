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

const mdParser = new MarkdownIt();

class ManageHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
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
    let res = await createNewHandbook(this.state);
    if (res && res.errCode === 0) {
      toast.success("Create a new handbook successfully!");
      this.setState({
        name: "",
        image: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Create a new handbook failed!");
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
              value={this.state.name}
              onChange={(event) => this.handleChangeInput(event, "name")}
            ></input>
          </div>
          <div className="manageHandbook__content__image form-group col-6">
            <label style={{ marginBottom: "16px" }}>
              <FormattedMessage id="manage-handbook.image" />
            </label>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnChangeImage(event)}
            ></input>
          </div>
          <div className="manageHandbook__content__description form-group col-12 ">
            <label>
              <FormattedMessage id="manage-handbook.description" />
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
