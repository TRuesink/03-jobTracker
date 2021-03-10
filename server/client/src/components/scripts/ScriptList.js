import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchScripts } from "../../actions";
import CreateScript from "./CreateScript";
import requireAuth from "../requireAuth";
import EditScript from "./EditScript";

class ScriptList extends React.Component {
  componentDidMount() {
    this.props.fetchScripts();
  }

  renderScripts() {
    return this.props.scripts.map((script) => {
      return (
        <div class="item">
          <div class="content">
            <div class="header">{script.purpose}</div>
            <div class="meta">
              <span class="cinema">Recipient: {script.recipient}</span>
            </div>
            <div class="description">
              <p>{script.message}</p>
            </div>
            <div class="extra">
              <EditScript scriptId={script._id} />
              <div class="ui label">{script.mode}</div>
              <div class="ui label">Used: {script.activities.length} times</div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const loaderClass = this.props.inProgress
      ? "ui active loader"
      : "ui disabled loader";
    return (
      <div className="ui segments">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="ui secondary segment"
        >
          <h3 style={{ marginBottom: "0" }}>Scripts</h3>
          <CreateScript />
        </div>

        <div className="ui segment">
          <div class={loaderClass}></div>
          <div className="ui divided items">{this.renderScripts()}</div>
        </div>
      </div>
    );
  }
}

ScriptList = requireAuth(ScriptList);

const mapStateToProps = (state) => {
  return {
    scripts: Object.values(state.scripts.data),
    inProgress: state.scripts.inProgress,
  };
};

export default connect(mapStateToProps, {
  fetchScripts,
})(ScriptList);
