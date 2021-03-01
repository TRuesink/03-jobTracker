import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { fetchOpportunities, fetchContacts } from "../../actions";
import { Form } from "semantic-ui-react";

class MeetingForm extends React.Component {
  componentDidMount() {
    this.props.fetchOpportunities();
    this.props.fetchContacts();
  }

  onFormSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    this.props.closeModal(false);
  };

  renderDropdown({ input, options }) {
    const optionsArray = options.map((opt) => {
      return { key: opt._id, text: opt.name, value: opt._id };
    });
    return (
      <Form.Select
        {...input}
        fluid
        selection
        options={optionsArray}
        onChange={(e, { value }) => input.onChange(value)}
      />
    );
  }

  renderRoleDropdown({ input, options }) {
    return (
      <Form.Select
        {...input}
        fluid
        selection
        options={options}
        onChange={(e, { value }) => input.onChange(value)}
      />
    );
  }

  render() {
    return (
      <form
        id="oppForm"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form"
      >
        <div className="field">
          <label>Meeting Topic</label>
          <Field name="topic" component="input" type="text" />
        </div>
        <div className="field">
          <label>Meeting Date</label>
          <Field name="meetingDate" component="input" type="date" />
        </div>
        <div className="field">
          <label>Contact</label>
          {this.props.contacts.length === 0 ? null : (
            <Field
              name="contact"
              component={this.renderDropdown}
              options={this.props.contacts}
            />
          )}
        </div>
        <div className="field">
          <label>What ppportunity is this related to?</label>
          {this.props.opportunities.length === 0 ? null : (
            <Field
              name="opportunity"
              component={this.renderDropdown}
              options={this.props.opportunities}
            />
          )}
        </div>
        <div className="field">
          <label>Notes</label>
          <Field name="notes" component="textarea" row="3" />
        </div>
      </form>
    );
  }
}

MeetingForm = reduxForm({
  form: "meetingForm",
})(MeetingForm);

const mapStateToProps = (state) => {
  return {
    opportunities: Object.values(state.opportunities.data),
    contacts: Object.values(state.contacts.data),
  };
};

export default connect(mapStateToProps, {
  fetchOpportunities,
  fetchContacts,
})(MeetingForm);
