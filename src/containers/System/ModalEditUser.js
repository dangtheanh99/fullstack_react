import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user)
      this.setState({
        id: user.id,
        email: user.email,
        password: "hardcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
  }
  toggle = async () => {
    await this.props.toggle();
  };

  handleOnChange = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidate = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`Missing parameter ${arrInput[i]}`);
        break;
      }
    }
    return isValid;
  };

  handleSave = () => {
    let isValid = this.checkValidate();
    if (isValid === true) {
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        size="lg"
        className="custom-modal"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
          className="custom-modal-body"
        >
          Edit user
        </ModalHeader>
        <ModalBody className="custom-modal-body">
          <div className="container">
            <div className="row">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="inputEmail4">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => this.handleOnChange(e, "email")}
                    value={this.state.email}
                    disabled
                  />
                </div>
                <div className="form-group col-md-6">
                  <label for="inputPassword4">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                    onChange={(e) => this.handleOnChange(e, "password")}
                    value={this.state.password}
                    disabled
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="inputEmail4">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    name="firstName"
                    placeholder="First name"
                    onChange={(e) => this.handleOnChange(e, "firstName")}
                    value={this.state.firstName}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label for="inputPassword4">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    name="lastName"
                    placeholder="Last name"
                    onChange={(e) => this.handleOnChange(e, "lastName")}
                    value={this.state.lastName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label for="inputAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  name="address"
                  placeholder="1234 Main St"
                  onChange={(e) => this.handleOnChange(e, "address")}
                  value={this.state.address}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary px-3"
            onClick={() => {
              this.handleSave();
            }}
          >
            Save changes
          </Button>{" "}
          <Button
            color="secondary px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
