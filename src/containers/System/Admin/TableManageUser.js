import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

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
    this.props.deleteUserRedux(user.id);
  };

  render() {
    // console.log("check props all users: ", this.props.allUsers);
    // console.log("check state: ", this.state.usersRedux);
    let arrUsers = this.state.usersRedux;
    return (
      <div className="users-container">
        <div className="users-table mt-3">
          <table id="customers">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.length > 0 &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
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
