import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import { getAllHandbook } from "../../../services/userService";

class Handbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHandbook: [],
    };
  }

  async componentDidMount() {
    let res = await getAllHandbook();
    if (res && res.errCode === 0) {
      this.setState({
        arrHandbook: res.data,
      });
    }
  }
  render() {
    let { arrHandbook } = this.state;
    return (
      <div className="commonSection HandbookSection">
        <div className="commonSection__header">
          <div className="commonSection__header__title">
            <FormattedMessage id="homepage.handbook" />
          </div>
          <button className="commonSection__header__btn">
            <FormattedMessage id="homepage.all-posts" />
          </button>
        </div>
        <Slider {...this.props.settings} className="commonSection__slider">
          {arrHandbook &&
            arrHandbook.length > 0 &&
            arrHandbook.map((item, index) => {
              return (
                <div className="commonSection__slider__item" key={index}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
