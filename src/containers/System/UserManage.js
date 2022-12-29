import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      showModal: false,
      showEditModal: false,
      userEdit: undefined,
    };
  }
  async componentDidMount() {
    await this.getAllData();
  }

  handleShowModal = () => {
    this.setState({
      showModal: true,
    });
  };

  handleEditUser = (user) => {
    this.setState({
      showEditModal: true,
      userEdit: user,
    });
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };
  toggleEditModal = () => {
    this.setState({
      showEditModal: !this.state.showEditModal,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllData();
        this.setState({
          showModal: false,
        });
        emitter.emit("EVENT_CLEAR_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  editUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          showEditModal: false,
        });
        await this.getAllData();
      } else {
        alert(res.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  getAllData = async () => {
    let res = await getAllUsers("ALL");
    console.log("get user from nodejs: ", res);
    if (res && res.errCode === 0) {
      this.setState({
        allUsers: res.users,
      });
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllData();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let { allUsers } = this.state;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.showModal}
          toggle={this.toggleModal}
          createNewUser={this.createNewUser}
        />
        {this.state.showEditModal && (
          <ModalEditUser
            isOpen={this.state.showEditModal}
            toggle={this.toggleEditModal}
            currentUser={this.state.userEdit}
            editUser={this.editUser}
          />
        )}
        <div className="title text-center">Manage users with The Anh</div>
        <div className="my-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleShowModal()}
          >
            <i className="fas fa-plus"></i> Add new user
          </button>
        </div>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
