/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "redux-zero/react";

import actions from "./stores/actions.js";
import Toolbar from "./components/Toolbar.jsx";
import { getByteCountByContent, fileSize } from "./utils/fileSize.js";

const SCALE_STEP = 0.5;

class ToolbarContainer extends Component {
  componentDidMount() {
    window.document.addEventListener("mouseup", this.onButtonMouseUp);
  }

  componentWillUnmount() {
    window.document.removeEventListener("mouseup", this.onButtonMouseUp);
  }

  onChangeBackgroundButtonClick = (e) => {
    this.props.changeBackground(e.srcElement.getAttribute("name"));
  };

  onButtonMouseDown = (e) => {
    this.setState({ activeButton: e.currentTarget.name });
  };

  onBtnMouseUp = () => {
    this.setState({ activeButton: "" });
  };

  zoomIn = () => {
    this.props.zoomIn(SCALE_STEP);
  };

  zoomOut = () => {
    this.props.zoomOut(SCALE_STEP);
  };

  getFileSize() {
    return this.props.source.data
      ? fileSize(getByteCountByContent(this.props.source.data))
      : "0 B";
  }

  render() {
    return (
      <Toolbar
        onChangeBackgroundButtonClick={this.onChangeBackgroundButtonClick}
        zoomIn={this.zoomIn}
        zoomOut={this.zoomOut}
        zoomReset={this.props.zoomReset}
        fileSize={this.getFileSize()}
        sourceImageValidity={this.props.sourceImageValidity}
        onButtonMouseDown={this.onButtonMouseDown}
        activeButton={this.state.activeButton}
      />
    );
  }
}

const mapToProps = (state) => ({
  source: state.source,
  sourceImageValidity: state.sourceImageValidity,
});

export default connect(mapToProps, actions)(ToolbarContainer);
