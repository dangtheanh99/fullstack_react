import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailDoctorService } from "../../../services/userService";
import { languages } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currDoctorId: "",
    };
  }

  async componentDidMount() {
    if (this.props.match?.params?.id) {
      let id = this.props.match.params.id;
      this.setState({
        currDoctorId: id,
      });
      let res = await getDetailDoctorService(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {}
  render() {
    // console.log("id", this.props.match.params.id);
    console.log("check state: ", this.state);
    let { detailDoctor } = this.state;
    let { language } = this.props;
    let nameVi = "",
      nameEn = "";

    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    return (
      <>
        <HomeHeader isShowBanner={false} />
        {detailDoctor && (
          <div className="detailDoctor">
            <div className="detailDoctor__info">
              <div className="detailDoctor__info__img">
                <img src={detailDoctor.image} />
              </div>
              <div className="detailDoctor__info__content">
                <div className="detailDoctor__info__content__title">
                  {language === languages.VI ? nameVi : nameEn}
                </div>
                <div className="detailDoctor__info__content__des">
                  {detailDoctor.Markdown && detailDoctor.Markdown.description
                    ? detailDoctor.Markdown.description
                    : ""}
                </div>
                <div className="detailDoctor__info__content__icon">
                  <span>
                    <i
                      className="fas fa-thumbs-up"
                      style={{ marginRight: "6px" }}
                    ></i>
                    Thích
                  </span>
                  <span>Chia sẻ</span>
                </div>
              </div>
            </div>
            <div className="detailDoctor__schedule">
              <div className="detailDoctor__schedule__time">
                <DoctorSchedule doctorId={this.state.currDoctorId} />
              </div>
              <div className="detailDoctor__schedule__address">
                <DoctorExtraInfor doctorId={this.state.currDoctorId} />
              </div>
            </div>
            <div className="detailDoctor__detail">
              {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
                <div
                  className="detailDoctor__detail__content"
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
            </div>
            <div className="detailDoctor__comment"></div>
          </div>
        )}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
