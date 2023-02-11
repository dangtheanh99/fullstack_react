import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";
import { getDetailDoctorService } from "../../../services/userService";
import { languages } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "./ProfileDoctor";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
  }

  toggle = () => {
    this.setState({
      modal: false,
    });
  };

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let { isOpen, toggle, data } = this.props;
    console.log("check prop data booking modal", this.props.data);
    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="bookingModal"
        size="lg"
        centered
      >
        <ModalHeader className="bookingModal__header" toggle={toggle}>
          Thông tin đặt lịch khám bệnh
        </ModalHeader>
        <ModalBody className="bookingModal__body">
          <div className="row">
            <div className="doctor-infor col-12">
              <ProfileDoctor
                doctorId={data.doctorId}
                isShowDesc={false}
                dataTime={data}
              />
            </div>

            <div className="col-6 form-group">
              <label>Họ và tên</label>
              <input className="form-control"></input>
            </div>
            <div className="col-6 form-group">
              <label>Số điện thoại</label>
              <input className="form-control"></input>
            </div>
            <div className="col-6 form-group">
              <label>Địa chỉ email</label>
              <input className="form-control"></input>
            </div>
            <div className="col-6 form-group">
              <label>Địa chỉ liên hệ</label>
              <input className="form-control"></input>
            </div>
            <div className="col-12 form-group">
              <label>Lí do khám</label>
              <input className="form-control"></input>
            </div>
            <div className="col-6 form-group">
              <label>Đặt cho ai</label>
              <input className="form-control"></input>
            </div>
            <div className="col-6 form-group">
              <label>Giới tính</label>
              <input className="form-control"></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="bookingModal__footer">
          <Button color="primary" className="px-3" onClick={toggle}>
            Xác nhận
          </Button>{" "}
          <Button color="secondary" className="px-3" onClick={toggle}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
