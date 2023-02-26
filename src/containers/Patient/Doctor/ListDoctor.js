import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListDoctor.scss";
import { FormattedMessage } from "react-intl";
import { path } from "../../../utils";
import { withRouter } from "react-router";
import { getAllDoctorsService } from "../../../services/userService";
import { languages } from "../../../utils";
import { Input, Empty } from "antd";
import _ from "lodash";

const { Search } = Input;
class ListDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctor: [],
      searchValue: "",
      allData: [],
    };
  }

  async componentDidMount() {
    let res = await getAllDoctorsService();
    if (res && res.errCode === 0) {
      if (!_.isEmpty(res.data)) {
        let allData = res.data.map((item) => {
          return {
            ...item,
            name: `Bác sĩ ${item.lastName} ${item.firstName}`,
          };
        });
        this.setState({
          allDoctor: allData,
          allData: allData,
        });
      }
      console.log("allDoctor", this.state.allDoctor);
    }
  }

  viewDetailDoctor = (id) => {
    this.props.history.push(`${path.DETAIL_DOCTOR}/${id}`);
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
              allDoctor: result,
            });
          } else {
            this.setState({
              allDoctor: [],
            });
          }
        } else {
          this.setState({
            allDoctor: allData,
          });
        }
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let { allDoctor } = this.state;
    let { language } = this.props;
    return (
      <div className="listDoctor">
        <div className="listDoctor__header">
          <i
            className="fas fa-arrow-left"
            onClick={() => {
              if (this.props.history) {
                this.props.history.push(path.HOMEPAGE);
              }
            }}
          ></i>
          <div className="listDoctor__header__title">
            <FormattedMessage id="common.doctor" />
          </div>
        </div>
        <div className="listDoctor__search">
          <Search
            placeholder={
              language === languages.VI
                ? "Tìm kiếm bác sĩ"
                : "Search for a doctor"
            }
            onSearch={this.onSearch}
            enterButton
            className="listDoctor__search__input"
          />
        </div>
        <div className="listDoctor__list">
          {allDoctor && allDoctor.length > 0 ? (
            allDoctor.map((item, index) => {
              return (
                <div
                  className="listDoctor__item"
                  key={index}
                  onClick={() => this.viewDetailDoctor(item.id)}
                >
                  <div className="listDoctor__item__image">
                    <img src={item.image} />
                  </div>
                  <div className="listDoctor__item__heading">{item.name}</div>
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
  connect(mapStateToProps, mapDispatchToProps)(ListDoctor)
);
