import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListClinic.scss";
import { FormattedMessage } from "react-intl";
import { path } from "../../../utils";
import { withRouter } from "react-router";
import { getAllClinic } from "../../../services/userService";
import { languages } from "../../../utils";
import { Input, Empty } from "antd";
import _ from "lodash";

const { Search } = Input;
class ListClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allClinic: [],
      searchValue: "",
      allData: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        allClinic: res.data ? res.data : [],
        allData: res.data ? res.data : [],
      });
    }
  }

  viewDetailClinic = (id) => {
    this.props.history.push(`${path.DETAIL_CLINIC}/${id}`);
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
              allClinic: result,
            });
          } else {
            this.setState({
              allClinic: [],
            });
          }
        } else {
          this.setState({
            allClinic: allData,
          });
        }
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let { allClinic } = this.state;
    let { language } = this.props;
    return (
      <div className="listClinic">
        <div className="listClinic__header">
          <i
            className="fas fa-arrow-left"
            onClick={() => {
              if (this.props.history) {
                this.props.history.push(path.HOMEPAGE);
              }
            }}
          ></i>
          <div className="listClinic__header__title">
            <FormattedMessage id="common.clinic" />
          </div>
        </div>
        <div className="listClinic__search">
          <Search
            placeholder={
              language === languages.VI
                ? "Tìm kiếm phòng khám"
                : "Search for a clinic"
            }
            onSearch={this.onSearch}
            enterButton
            className="listClinic__search__input"
          />
        </div>
        <div className="listClinic__list">
          {allClinic && allClinic.length > 0 ? (
            allClinic.map((item, index) => {
              return (
                <div
                  className="listClinic__item"
                  key={index}
                  onClick={() => this.viewDetailClinic(item.id)}
                >
                  <div className="listClinic__item__image">
                    <img src={item.image} />
                  </div>
                  <div className="listClinic__item__heading">{item.name}</div>
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
  connect(mapStateToProps, mapDispatchToProps)(ListClinic)
);
