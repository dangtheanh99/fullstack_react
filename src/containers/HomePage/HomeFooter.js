import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";

class HomeFooter extends Component {
  render() {
    return (
      <div className="FooterSection">
        <div className="FooterSection__bigBlock">
          <div className="FooterSection__bigBlock__about">
            <div className="FooterSection__bigBlock__about__logo">
              <img src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" />
            </div>
            <div className="FooterSection__bigBlock__about__name">
              Công ty Cổ phần Công nghệ BookingCare
            </div>
            <div className="FooterSection__bigBlock__about__address">
              <i className="fas fa-location-arrow"></i> 28 Thành Thái, Dịch
              Vọng, Cầu Giấy, Hà Nội
            </div>
          </div>
          <ul className="FooterSection__bigBlock__contact">
            <li>Liên hệ hợp tác</li>
            <li>Tuyển dụng</li>
            <li>Câu hỏi thường gặp</li>
            <li>Điều khoản sử dụng</li>
            <li>Chính sách Bảo mật</li>
          </ul>
          <div className="FooterSection__bigBlock__support">
            <div>Hỗ trợ khách hàng</div>
            <span>support@bookingcare.vn (7h - 18h)</span>
          </div>
        </div>
        <div className="FooterSection__smallBlock">
          <div className="FooterSection__smallBlock__copyright">
            &copy; 2023 BookingCare.
          </div>
          <div className="FooterSection__smallBlock__social">
            <a href="https://www.facebook.com/" target="_blank">
              <i
                className="fab fa-facebook-square"
                style={{ color: "blue" }}
              ></i>
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <i className="fab fa-youtube" style={{ color: "red" }}></i>
            </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
