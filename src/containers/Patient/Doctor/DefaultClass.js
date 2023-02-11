import React, { Component } from "react";
import { connect } from "react-redux";
import "./DefaultClass.scss";
import { FormattedMessage } from "react-intl";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return <div>default class</div>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
