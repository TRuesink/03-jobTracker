import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  fetchContacts,
  fetchOpportunities,
  fetchScripts,
  createActivity,
} from "../../actions";
import { Dropdown, Form } from "semantic-ui-react";

class ActivityForm extends React.Component {
  componentDidMount() {
    this.props.fetchContacts();
    this.props.fetchOpportunities();
    this.props.fetchScripts();
  }

  onFormSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    this.props.closeModal(false);
  };

  renderDropdown({ input, options, disabled }) {
    const optionsArray = options.map((opt) => {
      return {
        key: opt._id || opt.purpose,
        text: opt.name || opt.purpose,
        value: opt._id,
      };
    });
    return (
      <Form.Select
        {...input}
        fluid
        selection
        options={optionsArray}
        onChange={(e, { value }) => input.onChange(value)}
        disabled={disabled}
        clearable={true}
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
          <label>Activity Date</label>
          <Field name="createdAt" component="input" type="date" />
        </div>
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
          <label>Script (if applicable)</label>
          {this.props.scripts.length === 0 ? (
            <div>No Scripts</div>
          ) : (
            <Field
              name="script"
              component={this.renderDropdown}
              options={this.props.scripts}
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
    scripts: Object.values(state.scripts.data),
  };
};

export default connect(mapStateToProps, {
  fetchContacts,
  fetchOpportunities,
  createActivity,
  fetchScripts,
})(ActivityForm);
