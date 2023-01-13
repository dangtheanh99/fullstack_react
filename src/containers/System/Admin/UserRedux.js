import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { languages } from "../../../utils";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrGender: [],
    };
  }
  async componentDidMount() {
    try {
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        this.setState({
          arrGender: res.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let { arrGender } = this.state;
    let lang = this.props.language;
    return (
      <div className="user-redux-container">
        <div className="title">User Redux with TheAnh</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input type="email" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input type="password" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phoneNumber" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select class="form-control">
                  {arrGender &&
                    arrGender.length > 0 &&
                    arrGender.map((item, index) => {
                      return (
                        <option key={index}>
                          {lang === languages.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select class="form-control">
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select class="form-control">
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12 mt-4">
                <button className="btn btn-primary px-3">
                  <FormattedMessage id="manage-user.save" />
                </button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
