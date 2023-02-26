import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import { languages, path } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    console.log("check res: ", res);
    if (res && res.errCode === 0) {
      this.setState({
        allSpecialty: res.data ? res.data : [],
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  viewDetailSpecialty = (specialty) => {
    console.log("info specialty: ", specialty);
    this.props.history.push(`${path.DETAIL_SPECIALTY}/${specialty.id}`);
  };

  render() {
    let { allSpecialty } = this.state;

    return (
      <div className="commonSection specialtySection">
        <div className="commonSection__header">
          <div className="commonSection__header__title">
            <FormattedMessage id="homepage.popular-specialty" />
          </div>
          <button
            className="commonSection__header__btn"
            onClick={() => {
              this.props.history.push(path.LIST_SPECIALTY);
            }}
          >
            <FormattedMessage id="homepage.more" />
          </button>
        </div>
        <Slider {...this.props.settings} className="commonSection__slider">
          {allSpecialty &&
            allSpecialty.length > 0 &&
            allSpecialty.map((item, index) => {
              return (
                <div
                  className="commonSection__slider__item"
                  key={index}
                  onClick={() => this.viewDetailSpecialty(item)}
                >
                  <img
                    src={item.image}
                    className="commonSection__slider__item__img"
                  />
                  <div className="commonSection__slider__item__title">
                    {this.props.language === languages.VI
                      ? item.nameVi
                      : item.nameEn}
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
