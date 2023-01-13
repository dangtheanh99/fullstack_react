import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="AboutSection">
        <div className="AboutSection__heading">
          Truyền thông nói về BookingCare
        </div>
        <div className="AboutSection__content">
          <div className="AboutSection__content__video">
            <iframe
              width="100%"
              height="350"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="AboutSection__content__des">
            Giải pháp của BookingCare là xây dựng nền tảng công nghệ kết nối
            mạng lưới bác sĩ giỏi và các cơ sở y tế uy tín với thông tin được
            xác thực rõ ràng, cập nhật. Ứng dụng công nghệ giúp người bệnh dễ
            dàng lựa chọn đúng bác sĩ chuyên khoa phù hợp với vấn đề của mình và
            Đặt lịch khám.
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
