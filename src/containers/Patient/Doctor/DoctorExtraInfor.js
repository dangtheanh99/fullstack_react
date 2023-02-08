import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { getDetailDoctorService } from "../../../services/userService";
import { languages } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
    };
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}
  render() {
    let { isShowDetailInfor } = this.state;
    return (
      <div className="doctorExtraInfor">
        <div className="doctorExtraInfor__up">
          <div className="doctorExtraInfor__up__title">ĐỊA CHỈ KHÁM</div>
          <div className="doctorExtraInfor__up__nameClinic">
            Phòng khám Bệnh viện Đại học Y Dược 1
          </div>
          <div className="doctorExtraInfor__up__addressClinic">
            20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM
          </div>
        </div>
        <div className="doctorExtraInfor__down">
          {!isShowDetailInfor && (
            <div className="firstBlock">
              <span className="firstBlock__title">GIÁ KHÁM:</span>
              <span className="firstBlock__price">250.000đ - 500.000đ.</span>
              <span
                onClick={() => this.showHideDetailInfor(true)}
                className="firstBlock__show"
              >
                Xem chi tiết
              </span>
            </div>
          )}

          {isShowDetailInfor && (
            <div className="secondBlock">
              <div className="secondBlock__title">GIÁ KHÁM: </div>
              <div className="secondBlock__price">
                <span>Giá khám</span>
                <span>250.000đ - 500.000đ</span>
              </div>
              <div className="secondBlock__payment">
                Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻ
              </div>
              <div
                className="secondBlock__hide"
                onClick={() => this.showHideDetailInfor(false)}
              >
                Ẩn bảng giá
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // systemMenuPath: state.app.systemMenuPath,
    // isLoggedIn: state.user.isLoggedIn,
    // language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
