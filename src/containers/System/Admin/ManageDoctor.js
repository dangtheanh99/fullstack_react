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
    };
  }
  async componentDidMount() {
    this.props.fetchAllDoctorsRedux();
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
  }

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

  handleChangeDesc = (e) => {
    this.setState({
      description: e.target.value,
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
    });
  };
  render() {
    const { selectedOption, listDoctors, hasData } = this.state;
    console.log("state: ", this.state);
    return (
      <div className="manageDoctor">
        <div className="manageDoctor__title">Thêm thông tin bác sĩ</div>
        <div className="manageDoctor__info">
          <div className="manageDoctor__info__left">
            <div>Chọn bác sĩ</div>
            <Select
              value={selectedOption}
              onChange={this.handleChangeSelect}
              options={listDoctors}
            />
          </div>
          <div className="manageDoctor__info__right">
            <div>Thông tin giới thiệu</div>
            <textarea
              className="manageDoctor__info__right__content"
              rows={6}
              onChange={(e) => this.handleChangeDesc(e)}
              value={this.state.description}
            ></textarea>
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
          {hasData ? <span>Cập nhật</span> : <span>Thêm mới</span>}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchUserStart()),
    deleteUserRedux: (userId) => dispatch(actions.deleteUser(userId)),
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
