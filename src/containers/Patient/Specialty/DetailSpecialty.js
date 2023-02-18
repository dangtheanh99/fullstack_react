import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [1, 2],
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let { arrDoctorId } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="detailSpecialty">
          <div className="detailSpecialty__description">
            <h1>Cơ Xương Khớp</h1>
            <ul>
              <li>
                Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm
              </li>
              <li>
                Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy
                tại Đại học Y khoa Hà Nội
              </li>
              <li>
                Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội
                Cơ Xương Khớp, Hội Thấp khớp học,...
              </li>
              <li>
                Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy
                thuốc Ưu tú, Bác sĩ Cao cấp,...
              </li>
            </ul>
          </div>
          <div className="detailSpecialty__content">
            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="detailSpecialty__item" key={index}>
                    <div className="detailSpecialty__item__doctorInfor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDesc={true}
                        // dataTime={dataTime}
                      />
                    </div>
                    <div className="detailSpecialty__item__schedule">
                      <div className="detailSpecialty__item__schedule__time">
                        <DoctorSchedule doctorId={item} />
                      </div>
                      <div className="detailSpecialty__item__schedule__address">
                        <DoctorExtraInfor doctorId={item} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
