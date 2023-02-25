import React, { Component } from "react";
import { connect } from "react-redux";
// import "./RemedyModal.scss";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import { Spin } from "antd";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imageBase64: "",
    };
  }

  async componentDidMount() {
    let { dataModal } = this.props;
    if (dataModal) {
      this.setState({
        email: dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  //   closeModal = () => {
  //     this.props.closeModal()
  //   }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleSaveInfo = async () => {
    // this.setState({
    //   loading: true,
    // });
    await this.props.sendDataModal(this.state);
    // this.setState({
    //   loading: false,
    // });
  };

  render() {
    let { isOpenModal, dataModal, closeModal } = this.props;
    let { email, imageBase64 } = this.state;
    console.log("check prop modal", this.props);
    return (
      // <Spin spinning={loading} tip="Loading">
      <>
        <Modal
          isOpen={isOpenModal}
          // toggle={closeModal}
          className="bookingModal"
          size="lg"
          centered
        >
          <ModalHeader className="bookingModal__header" toggle={closeModal}>
            <FormattedMessage id="manage-patient.bill" />
          </ModalHeader>
          <ModalBody className="bookingModal__body">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="manage-patient.email-patient" />
                </label>
                <input
                  className="form-control"
                  value={email}
                  onChange={(event) => this.handleChangeEmail(event)}
                />
                {/* {dataModal ? dataModal.email : ""} */}
                {/* {dataModal.email} */}
              </div>
              <div className="col-6 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="manage-patient.file" />
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={(event) => this.handleOnChangeImage(event)}
                ></input>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="bookingModal__footer">
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleSaveInfo()}
            >
              <FormattedMessage id="common.confirm" />
            </Button>{" "}
            <Button color="secondary" className="px-3" onClick={closeModal}>
              <FormattedMessage id="common.cancel" />
            </Button>
          </ModalFooter>
        </Modal>
        <Spin spinning={true} />
      </>
      // </Spin>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
