import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
    };
  }
  async componentDidMount() {
    let res = await getAllUsers("ALL");
    console.log("get user from nodejs: ", res);
    if (res && res.errCode === 0) {
      this.setState({
        allUsers: res.users,
      });
    }
  }

  render() {
    let { allUsers } = this.state;
    return (
      <div className="users-container">
        <div className="title text-center">Manage users with The Anh</div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {allUsers &&
              allUsers.map((item, index) => {
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
                          alert("Edit user");
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </span>
                      <span
                        className="button-delete"
                        onClick={() => {
                          alert("Delete user");
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
