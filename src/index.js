import React, { Component } from "react";
import PropTypes from "prop-types";

class PromiseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { status: "pending", result: undefined, error: undefined };
  }

  attachPromise = promise => {
    const onSuccess = result =>
      new Promise(resolve =>
        this.setState({ status: "resolved", result }, resolve)
      );

    const onError = error =>
      new Promise((undefined, reject) =>
        this.setState({ status: "rejected", error }, () => reject(error))
      );

    promise.then(onSuccess).catch(onError);
  };

  componentDidMount() {
    this.attachPromise(this.props.promise);
  }

  componentWillReceiveProps = ({ promise: nextPromise }) => {
    if (this.props.promise === nextPromise) return;

    this.setState({ status: "pending" }, () => this.attachPromise(nextPromise));
  };

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
