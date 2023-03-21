import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { FormattedMessage } from "react-intl";
import { getProfileDoctorService } from "../../../services/userService";
import "./ProfileDoctor.scss";
import { languages, path } from "../../../utils";
import NumberFormat from "react-number-format";
import moment from "moment";
import _ from "lodash";
import { Link } from "react-router-dom";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileDoctor: {},
    };
  }

  async componentDidMount() {
    let profileDoctor = await this.getProfileDoctor(this.props.doctorId);
    this.setState({
      profileDoctor,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
    }
  }

  getProfileDoctor = async (doctorId) => {
    let result = {};
    if (doctorId) {
      let res = await getProfileDoctorService(doctorId);
      // console.log("check res profile", res);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let dateVi = moment(dataTime.date, "DD/MM/YYYY").format(
        "dddd - DD/MM/YYYY"
      );

      let date =
        language === languages.VI
          ? this.capitalizeFirstLetter(dateVi)
          : moment(dataTime.date, "DD/MM/YYYY")
              .locale("en")
              .format("dddd - DD/MM/YYYY");
      let time =
        language === languages.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      return (
        <div className="profileDoctor__info__content__time">
          <div>
            {time} - {date}
          </div>
          <div>
            <FormattedMessage id="patient.booking.free" />
          </div>
        </div>
      );
    }
    return <></>;
  };

  render() {
    let { profileDoctor } = this.state;
    let {
      language,
      isShowDesc,
      dataTime,
      isShowPrice,
      isShowDetail,
      doctorId,
    } = this.props;
    // console.log("check props profile: ", this.props);
    let nameVi = "",
      nameEn = "";

    if (profileDoctor && profileDoctor.positionData) {
      nameVi = `${profileDoctor.positionData.valueVi}, ${profileDoctor.lastName} ${profileDoctor.firstName}`;
      nameEn = `${profileDoctor.positionData.valueEn}, ${profileDoctor.firstName} ${profileDoctor.lastName}`;
    }

    let extraInforDoctor =
      profileDoctor && profileDoctor.Doctor_infor
        ? profileDoctor.Doctor_infor
        : "";
    return (
      <div className="profileDoctor">
        <div className="profileDoctor__info">
          <div className="profileDoctor__info__img">
            <img src={profileDoctor.image} />
            {isShowDetail && (
              <Link
                style={{ color: "#27ae60" }}
                to={`${path.DETAIL_DOCTOR}/${doctorId}`}
              >
                <FormattedMessage id="patient.profile.more" />
              </Link>
            )}
          </div>
          <div className="profileDoctor__info__content">
            <div className="profileDoctor__info__content__title">
              {language === languages.VI ? nameVi : nameEn}
            </div>
            <>
              {isShowDesc ? (
                <div className="profileDoctor__info__content__des">
                  {profileDoctor.Markdown && profileDoctor.Markdown.description
                    ? profileDoctor.Markdown.description
                    : ""}
                </div>
              ) : (
                <>{this.renderTimeBooking(dataTime)} </>
              )}
            </>

            <div className="profileDoctor__location">
              {/* <span>
                <i
                  className="fas fa-thumbs-up"
                  style={{ marginRight: "6px" }}
                ></i>
                Thích
              </span>
              <span>Chia sẻ</span> */}
              <i
                className="fas fa-map-marker-alt"
                style={{ marginRight: "6px" }}
              ></i>
              <span>
                {extraInforDoctor &&
                extraInforDoctor.provinceData &&
                language === languages.VI
                  ? extraInforDoctor.provinceData.valueVi
                  : ""}
                {extraInforDoctor &&
                extraInforDoctor.provinceData &&
                language === languages.EN
                  ? extraInforDoctor.provinceData.valueEn
                  : ""}
              </span>
            </div>
          </div>
        </div>
        {isShowPrice && (
          <div className="profileDoctor__price">
            <FormattedMessage id="patient.booking.price" />:{" "}
            {extraInforDoctor &&
              extraInforDoctor.priceData &&
              language === languages.VI && (
                <NumberFormat
                  value={extraInforDoctor.priceData.valueVi}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              )}
            {extraInforDoctor &&
              extraInforDoctor.priceData &&
              language === languages.EN && (
                <NumberFormat
                  value={extraInforDoctor.priceData.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" $"}
                />
              )}
          </div>
        )}
        {/* {isShowDetail && (
          <div className="profileDoctor__detail">
            <Link to={`${path.DETAIL_DOCTOR}/${doctorId}`}>Xem thêm</Link>
          </div>
        )} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
