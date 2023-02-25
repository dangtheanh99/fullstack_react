import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Modal, notification, Spin } from "antd";
import { languages } from "../../../utils";
import { toast } from "react-toastify";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }
  async componentDidMount() {
    this.props.fetchUserRedux();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allUsers !== this.props.allUsers) {
      this.setState({
        usersRedux: this.props.allUsers,
      });
    }
  }

  handleEditUser = (user) => {
    this.props.editUser(user);
  };

  handleDeleteUser = (user) => {
    let { language } = this.props;
    Modal.confirm({
      onOk: async () => {
        this.props.deleteUserRedux(user.id, language);
      },
      onCancel() {},
      content:
        language === languages.VI ? (
          <div>Xác nhận xóa người dùng?</div>
        ) : (
          <div>Confirm user deletion?</div>
        ),
      okText: language === languages.VI ? "Đồng ý" : "Confirm",
      cancelText: language === languages.VI ? "Hủy" : "Cancel",
    });
  };

  render() {
    let arrUsers = this.state.usersRedux;
    return (
      <>
        <div className="users-container">
          <div className="users-table mt-3">
            <table id="customers">
              <thead>
                <tr>
                  <th scope="col">
                    <FormattedMessage id="manage-user.lastName" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="manage-user.firstName" />
                  </th>

                  <th scope="col">
                    <FormattedMessage id="manage-user.email" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="manage-user.address" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="manage-user.action" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {arrUsers &&
                  arrUsers.length > 0 &&
                  arrUsers.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.lastName}</td>
                        <td>{item.firstName}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>
                          <span
                            className="button-edit"
                            onClick={() => {
                              this.handleEditUser(item);
                            }}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </span>
                          <span
                            className="button-delete"
                            onClick={() => {
                              this.handleDeleteUser(item);
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* <Spin spinning={this.state.loading} /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.admin.users,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchUserStart()),
    deleteUserRedux: (userId, language) =>
      dispatch(actions.deleteUser(userId, language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
