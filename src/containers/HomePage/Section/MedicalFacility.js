import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import { path } from "../../../utils";
import { withRouter } from "react-router";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allClinic: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    console.log("check res clinic: ", res);
    if (res && res.errCode === 0) {
      this.setState({
        allClinic: res.data ? res.data : [],
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  viewDetailClinic = (clinic) => {
    console.log("info clinic: ", clinic);
    this.props.history.push(`${path.DETAIL_CLINIC}/${clinic.id}`);
  };
  render() {
    let { allClinic } = this.state;
    return (
      <div className="commonSection medicalSection">
        <div className="commonSection__header">
          <div className="commonSection__header__title">
            <FormattedMessage id="homepage.outstanding-medical-facility" />
          </div>
          <button className="commonSection__header__btn">
            <FormattedMessage id="homepage.search" />
          </button>
        </div>
        <Slider {...this.props.settings} className="commonSection__slider">
          {allClinic &&
            allClinic.length > 0 &&
            allClinic.map((item, index) => {
              return (
                <div
                  className="commonSection__slider__item"
                  key={index}
                  onClick={() => this.viewDetailClinic(item)}
                >
                  <img
                    src={item.image}
                    className="commonSection__slider__item__img"
                  />
                  <div className="commonSection__slider__item__title">
                    {item.name}
                  </div>
                </div>
              );
            })}
        </Slider>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
