import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  fetchContacts,
  fetchOpportunities,
  createActivity,
} from "../../actions";
import { Dropdown, Form } from "semantic-ui-react";

class ActivityForm extends React.Component {
  componentDidMount() {
    this.props.fetchContacts();
    this.props.fetchOpportunities();
  }

  onFormSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    this.props.closeModal(false);
  };

  renderDropdown({ input, options, disabled }) {
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
        disabled={disabled}
      />
    );
  }

  render() {
    return (
      <form
        id="activityForm"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form"
      >
        <div className="field">
          <label>What oppportunity is this related to?</label>
          {this.props.opportunities.length === 0 ? null : (
            <Field
              name="opportunity"
              component={this.renderDropdown}
              options={this.props.opportunities}
              disabled={this.props.initialValues ? true : false}
            />
          )}
        </div>
        <div className="field">
          <label>Contact (if applicable)</label>
          {this.props.contacts.length === 0 ? null : (
            <Field
              name="contact"
              component={this.renderDropdown}
              options={this.props.contacts}
            />
          )}
        </div>
        <div className="field">
          <label>What you did</label>
          <Field name="description" component="textarea" rows="3" />
        </div>
      </form>
    );
  }
}

ActivityForm = reduxForm({
  form: "activityForm",
})(ActivityForm);

const mapStateToProps = (state) => {
  return {
    contacts: Object.values(state.contacts.data),
    opportunities: Object.values(state.opportunities.data),
  };
};

export default connect(mapStateToProps, {
  fetchContacts,
  fetchOpportunities,
  createActivity,
})(ActivityForm);
