import React, { Component } from "react";
import PropTypes from "prop-types";

class PromiseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "pending",
      result: undefined,
      error: undefined
    };
  }

  componentDidMount() {
    const { promise } = this.props;

    promise
      .then(result => this.setState({ status: "resolved", result }))
      .catch(error => this.setState({ status: "rejected", error }));
  }

  render() {
    const { status, error } = this.state;
    const { resolved, rejected, pending, ...props } = this.props;

    switch (status) {
      case "resolved":
        return typeof resolved === "function"
          ? React.createElement(resolved, props)
          : resolved;
      case "rejected":
        return typeof rejected === "function"
          ? React.createElement(rejected, error)
          : rejected;
      default:
        return typeof pending === "function"
          ? React.createElement(pending, props)
          : pending;
    }
  }
}

PromiseComponent.propTypes = {
  promise: PropTypes.object,
  pending: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  resolved: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  rejected: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};

PromiseComponent.defaultProps = {
  promise: Promise.resolve(),
  pending: React.createElement("div", { children: "Pending" }),
  resolved: React.createElement("div", { children: "Resolved" }),
  rejected: React.createElement("div", { children: "Rejected" })
};

export default PromiseComponent;
