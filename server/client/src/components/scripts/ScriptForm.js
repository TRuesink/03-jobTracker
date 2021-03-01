import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";

const recipientOptions = [
  {
    key: "talent acquisition",
    text: "talent acquisition",
    value: "talent acquisition",
  },
  {
    key: "management",
    text: "management",
    value: "management",
  },
  {
    key: "engineering",
    text: "engineering",
    value: "engineering",
  },
  {
    key: "other",
    text: "other",
    value: "other",
  },
];

const modeOptions = [
  {
    key: "email",
    text: "email",
    value: "email",
  },
  {
    key: "linkedIn",
    text: "linkedIn",
    value: "linkedIn",
  },
  {
    key: "other",
    text: "other",
    value: "other",
  },
];

class ScriptForm extends React.Component {
  onFormSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    this.props.closeModal(false);
  };

  renderDropdown({ input, options }) {
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
        id="scriptForm"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form"
      >
        <div className="field">
          <label>Purpose of Message</label>
          <Field name="purpose" component="input" type="text" />
        </div>
        <div className="field">
          <label>Recipient Type</label>
          <Field
            name="recipient"
            component={this.renderDropdown}
            options={recipientOptions}
          />
        </div>
        <div className="field">
          <label>Mode of Communication</label>
          <Field
            name="mode"
            component={this.renderDropdown}
            options={modeOptions}
          />
        </div>
        <div className="field">
          <label>Script</label>
          <Field name="message" component="textarea" row="3" />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "scriptForm",
})(ScriptForm);
