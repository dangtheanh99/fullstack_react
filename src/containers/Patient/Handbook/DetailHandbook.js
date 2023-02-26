import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailHandbook.scss";
import { FormattedMessage } from "react-intl";

class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return <div>detail handbook</div>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
