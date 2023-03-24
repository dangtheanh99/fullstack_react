import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import { getAllHandbook } from "../../../services/userService";
import { path } from "../../../utils";
import { withRouter } from "react-router";
import "./Handbook.scss";
import { Empty } from "antd";

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
  viewDetailHandbook = (handbook) => {
    this.props.history.push(`${path.DETAIL_HANDBOOK}/${handbook.id}`);
  };
  render() {
    let { arrHandbook } = this.state;
    return (
      <div className="commonSection HandbookSection">
        <div className="commonSection__header">
          <div className="commonSection__header__title">
            <FormattedMessage id="homepage.handbook" />
          </div>
          <button
            className="commonSection__header__btn"
            onClick={() => {
              this.props.history.push(path.LIST_HANDBOOK);
            }}
          >
            <FormattedMessage id="homepage.all-posts" />
          </button>
        </div>

        <Slider {...this.props.settings} className="commonSection__slider">
          {arrHandbook && arrHandbook.length > 0 ? (
            arrHandbook.map((item, index) => {
              return (
                <div
                  className="commonSection__slider__item"
                  key={index}
                  onClick={() => this.viewDetailHandbook(item)}
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
            })
          ) : (
            <Empty description={<FormattedMessage id="common.no-data" />} />
          )}
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
  connect(mapStateToProps, mapDispatchToProps)(Handbook)
);
