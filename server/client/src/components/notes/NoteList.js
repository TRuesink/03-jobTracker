import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNotes } from "../../actions";
import CreateNote from "./CreateNote";

class NoteList extends React.Component {
  componentDidMount() {
    this.props.fetchNotes();
  }

  renderNotes() {
    return this.props.notes.map((note) => {
      return (
        <tr>
          <td style={{ paddingLeft: "0.7em" }}>{note.opportunity.name}</td>
          <td>{note.content}</td>
          <td>{new Date(note.createdAt).toLocaleDateString()}</td>
        </tr>
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
          <h3 style={{ marginBottom: "0" }}>Notes</h3>
          <CreateNote />
        </div>

        <div
          style={{
            padding: "0",
          }}
          className="ui segment"
        >
          <div class={loaderClass}></div>
          <table class="ui compact very basic table">
            <thead class="full-width">
              <tr>
                <th style={{ paddingLeft: "0.7em" }} className="three wide">
                  Opportunity
                </th>
                <th className="eleven wide">Note</th>
                <th className="two wide">Date</th>
              </tr>
            </thead>
            <tbody>{this.renderNotes()}</tbody>
            <tfoot class="full-width">
              <tr></tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: Object.values(state.notes.data),
    inProgress: state.notes.inProgress,
  };
};

export default connect(mapStateToProps, {
  fetchNotes,
})(NoteList);
