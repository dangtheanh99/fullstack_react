import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListHandbook.scss";
import { FormattedMessage } from "react-intl";
import { path } from "../../../utils";
import { withRouter } from "react-router";
import { getAllHandbook } from "../../../services/userService";
import { languages } from "../../../utils";
import { Input, Empty } from "antd";
import _ from "lodash";

const { Search } = Input;
class ListHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allHandbook: [],
      searchValue: "",
      allData: [],
    };
  }

  async componentDidMount() {
    let res = await getAllHandbook();
    if (res && res.errCode === 0) {
      this.setState({
        allHandbook: res.data ? res.data : [],
        allData: res.data ? res.data : [],
      });
    }
  }

  viewDetailHandbook = (id) => {
    this.props.history.push(`${path.DETAIL_HANDBOOK}/${id}`);
  };

  onSearch = (value) => {
    let { allData } = this.state;
    this.setState(
      {
        searchValue: value,
      },
      async () => {
        if (this.state.searchValue) {
          let strSearch = this.state.searchValue.toLowerCase();
          let result = allData.filter((item) =>
            item.name.toLowerCase().includes(strSearch)
          );

          if (result && !_.isEmpty(result)) {
            this.setState({
              allHandbook: result,
            });
          } else {
            this.setState({
              allHandbook: [],
            });
          }
        } else {
          this.setState({
            allHandbook: allData,
          });
        }
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let { allHandbook } = this.state;
    let { language } = this.props;
    return (
      <div className="listHandbook">
        <div className="listHandbook__header">
          <i
            className="fas fa-arrow-left"
            onClick={() => {
              if (this.props.history) {
                this.props.history.push(path.HOMEPAGE);
              }
            }}
          ></i>
          <div className="listHandbook__header__title">
            <FormattedMessage id="common.handbook" />
          </div>
        </div>
        <div className="listHandbook__search">
          <Search
            placeholder={
              language === languages.VI
                ? "Tìm kiếm cẩm nang"
                : "Search for a handbook"
            }
            onSearch={this.onSearch}
            enterButton
            className="listHandbook__search__input"
          />
        </div>
        <div className="listHandbook__list">
          {allHandbook && allHandbook.length > 0 ? (
            allHandbook.map((item, index) => {
              return (
                <div
                  className="listHandbook__item"
                  key={index}
                  onClick={() => this.viewDetailHandbook(item.id)}
                >
                  <div className="listHandbook__item__image">
                    <img src={item.image} />
                  </div>
                  <div className="listHandbook__item__heading">{item.name}</div>
                </div>
              );
            })
          ) : (
            <Empty
              style={{
                position: "relative",
                top: "16px",
                marginLeft: "18px",
              }}
              description={<FormattedMessage id="common.no-data" />}
            />
          )}
        </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListHandbook)
);
