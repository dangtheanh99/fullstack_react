import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListSpecialty.scss";
import { FormattedMessage } from "react-intl";
import { path } from "../../../utils";
import { withRouter } from "react-router";
import { getAllSpecialty } from "../../../services/userService";
import { languages } from "../../../utils";
import { Input, Empty } from "antd";
import _ from "lodash";

const { Search } = Input;
class ListSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSpecialty: [],
      searchValue: "",
      allData: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        allSpecialty: res.data ? res.data : [],
        allData: res.data ? res.data : [],
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  viewDetailSpecialty = (id) => {
    this.props.history.push(`${path.DETAIL_SPECIALTY}/${id}`);
  };

  onSearch = (value) => {
    let { language } = this.props;
    let { allData } = this.state;
    this.setState(
      {
        searchValue: value,
      },
      async () => {
        if (this.state.searchValue) {
          let strSearch = this.state.searchValue.toLowerCase();
          let result = [];
          if (language === languages.VI) {
            result = allData.filter((item) =>
              item.nameVi.toLowerCase().includes(strSearch)
            );
          } else {
            result = allData.filter((item) =>
              item.nameEn.toLowerCase().includes(strSearch)
            );
          }
          if (result && !_.isEmpty(result)) {
            this.setState({
              allSpecialty: result,
            });
          } else {
            this.setState({
              allSpecialty: [],
            });
          }
        } else {
          this.setState({
            allSpecialty: this.state.allData,
          });
        }
      }
    );
  };
  render() {
    let { allSpecialty } = this.state;
    let { language } = this.props;
    console.log("check state", allSpecialty);
    return (
      <div className="listSpecialty">
        <div className="listSpecialty__header">
          <i
            className="fas fa-arrow-left"
            onClick={() => {
              if (this.props.history) {
                this.props.history.push(path.HOMEPAGE);
              }
            }}
          ></i>
          <div className="listSpecialty__header__title">
            <FormattedMessage id="common.specialty" />
          </div>
        </div>
        <div className="listSpecialty__search">
          <Search
            placeholder={
              language === languages.VI
                ? "Tìm kiếm chuyên khoa"
                : "Search for a specialty"
            }
            onSearch={this.onSearch}
            enterButton
            className="listSpecialty__search__input"
          />
        </div>
        <div className="listSpecialty__list">
          {allSpecialty && allSpecialty.length > 0 ? (
            allSpecialty.map((item, index) => {
              let name = language === languages.VI ? item.nameVi : item.nameEn;
              return (
                <div
                  className="listSpecialty__item"
                  key={index}
                  onClick={() => this.viewDetailSpecialty(item.id)}
                >
                  <div className="listSpecialty__item__image">
                    <img src={item.image} />
                  </div>
                  <div className="listSpecialty__item__heading">{name}</div>
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
  connect(mapStateToProps, mapDispatchToProps)(ListSpecialty)
);
