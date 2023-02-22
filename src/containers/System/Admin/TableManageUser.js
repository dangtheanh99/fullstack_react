import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Modal, notification, Spin } from "antd";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
      // loading: false,
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
    Modal.confirm({
      onOk: async () => {
        try {
          // this.setState({
          //   loading: true,
          // });
          this.props.deleteUserRedux(user.id);
          // this.setState({
          //   loading: false,
          // });
          notification.success({
            message: "Xóa người dùng thành công!",
          });
        } catch (error) {
          notification.error({
            message: "Có lỗi trong quá trình xử lý!",
          });
        }
      },
      onCancel() {},
      content: <div>Xác nhận xóa người dùng?</div>,
      okText: "Đồng ý",
      cancelText: "Hủy",
    });
  };

  render() {
    // console.log("check props all users: ", this.props.allUsers);
    // console.log("check state: ", this.state.usersRedux);
    let arrUsers = this.state.usersRedux;
    return (
      <>
        <div className="users-container">
          <div className="users-table mt-3">
            <table id="customers">
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="manage-user.lastName" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.firstName" />
                  </th>

                  <th>
                    <FormattedMessage id="manage-user.email" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.address" />
                  </th>
                  <th>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchUserStart()),
    deleteUserRedux: (userId) => dispatch(actions.deleteUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
