import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import {
  getAllCodeService,
  getDetailClinicById,
} from "../../../services/userService";
import _, { orderBy } from "lodash";
import Select from "react-select";
import { languages } from "../../../utils";
import { Empty } from "antd";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      detailClinic: {},
    };
  }

  async componentDidMount() {
    if (this.props.match?.params?.id) {
      let id = this.props.match.params.id;
      let res = await getDetailClinicById(id);
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = orderBy(data.doctorClinic, "doctorId", "asc");
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          detailClinic: res.data,
          arrDoctorId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
  }

  render() {
    let { arrDoctorId, detailClinic } = this.state;
    let { language } = this.props;
    console.log("check state detail specialty: ", this.state);
    return (
      <>
        <HomeHeader />
        <div className="detailClinic">
          <div className="detailClinic__title">
            {detailClinic && !_.isEmpty(detailClinic) ? detailClinic.name : ""}
          </div>
          <div className="detailClinic__description">
            {detailClinic && !_.isEmpty(detailClinic) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailClinic.descriptionHTML,
                }}
              ></div>
            )}
          </div>

          <div className="detailClinic__content">
            {arrDoctorId && arrDoctorId.length > 0 ? (
              arrDoctorId.map((item, index) => {
                return (
                  <div className="detailClinic__item" key={index}>
                    <div className="detailClinic__item__doctorInfor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDesc={true}
                        isShowPrice={false}
                        isShowDetail={true}
                        // dataTime={dataTime}
                      />
                    </div>
                    <div className="detailClinic__item__schedule">
                      <div className="detailClinic__item__schedule__time">
                        <DoctorSchedule doctorId={item} />
                      </div>
                      <div className="detailClinic__item__schedule__address">
                        <DoctorExtraInfor doctorId={item} />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Empty description={<FormattedMessage id="common.no-data" />} />
            )}
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
