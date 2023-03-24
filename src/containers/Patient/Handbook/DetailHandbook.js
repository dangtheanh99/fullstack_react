import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailHandbook.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import { getDetailHandbookById } from "../../../services/userService";
import _ from "lodash";
import { Empty } from "antd";
import { languages } from "../../../utils";

class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailHandbook: {},
    };
  }

  async componentDidMount() {
    if (this.props.match?.params?.id) {
      let id = this.props.match.params.id;
      let res = await getDetailHandbookById(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailHandbook: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let { detailHandbook } = this.state;
    let { language } = this.props;
    console.log("detailHandbook", this.state.detailHandbook);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <HomeHeader />
        {detailHandbook && !_.isEmpty(detailHandbook) ? (
          <div className="detailHandbook">
            <div className="detailHandbook__title">{detailHandbook.name}</div>
            <div
              className="detailHandbook__content"
              dangerouslySetInnerHTML={{
                __html: detailHandbook.descriptionHTML,
              }}
            ></div>
          </div>
        ) : (
          <Empty description={<FormattedMessage id="common.no-data" />} />
        )}
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
