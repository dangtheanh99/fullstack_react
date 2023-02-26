import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import {
  getDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userService";
import _, { orderBy } from "lodash";
import Select from "react-select";
import { languages } from "../../../utils";
import { Empty } from "antd";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      detailSpecialty: {},
      listProvince: [],
      selectedProvince: "",
    };
  }

  async componentDidMount() {
    if (this.props.match?.params?.id) {
      let id = this.props.match.params.id;
      let res = await getDetailSpecialtyById(id);
      let resProvince = await getAllCodeService("PROVINCE");
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = orderBy(data.doctorSpecialty, "doctorId", "asc");
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          detailSpecialty: res.data,
          arrDoctorId,
        });
      }
      if (resProvince && resProvince.errCode === 0) {
        let listProvince = this.buildDataSelect(resProvince.data);
        console.log("listProvince", listProvince);
        this.setState({
          listProvince,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      let resProvince = await getAllCodeService("PROVINCE");
      if (resProvince && resProvince.errCode === 0) {
        let listProvince = this.buildDataSelect(resProvince.data);
        this.setState({
          listProvince,
        });
      }
    }
  }

  handleChangeSelect = (selectedOption) => {
    this.setState(
      {
        selectedProvince: selectedOption,
      },
      async () => {
        if (this.props.match?.params?.id) {
          let id = this.props.match.params.id;
          let res = await getDetailSpecialtyById(id);
          if (res && res.errCode === 0) {
            let data = res.data;
            let arrDoctorId = [];
            if (data && !_.isEmpty(data)) {
              let arr = orderBy(data.doctorSpecialty, "doctorId", "asc");
              if (arr && arr.length > 0) {
                if (this.state.selectedProvince.value !== "ALL") {
                  arr = arr.filter(
                    (item) =>
                      item.provinceId === this.state.selectedProvince.value
                  );
                }
                arr.map((item) => {
                  arrDoctorId.push(item.doctorId);
                });
              }
            }
            this.setState({
              detailSpecialty: res.data,
              arrDoctorId,
            });
          }
        }

        console.log("selectedOption", selectedOption);
      }
    );
  };
  buildDataSelect = (inputData) => {
    let { language } = this.props;
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.unshift({
        valueVi: "Toàn quốc",
        valueEn: "All",
        keyMap: "ALL",
      });
      inputData.map((item) => {
        let object = {};
        object.label = language === languages.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  render() {
    let { arrDoctorId, detailSpecialty, listProvince, selectedProvince } =
      this.state;
    let { language } = this.props;
    console.log("check state detail specialty: ", this.state);
    return (
      <>
        <HomeHeader />
        <div className="detailSpecialty">
          <div className="detailSpecialty__description">
            {detailSpecialty && !_.isEmpty(detailSpecialty) && (
              <>
                <h4>
                  {language === languages.VI
                    ? detailSpecialty.nameVi
                    : detailSpecialty.nameEn}
                </h4>
                <div
                  // className="detailSpecialty__description__content"
                  dangerouslySetInnerHTML={{
                    __html: detailSpecialty.descriptionHTML,
                  }}
                ></div>
              </>
            )}
          </div>

          <div className="detailSpecialty__content">
            <div className="detailSpecialty__content__filterLocation">
              <Select
                value={selectedProvince}
                onChange={this.handleChangeSelect}
                options={listProvince}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.chooseProvince" />
                }
              />
            </div>
            {arrDoctorId && arrDoctorId.length > 0 ? (
              arrDoctorId.map((item, index) => {
                return (
                  <div className="detailSpecialty__item" key={index}>
                    <div className="detailSpecialty__item__doctorInfor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDesc={true}
                        isShowPrice={false}
                        isShowDetail={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
