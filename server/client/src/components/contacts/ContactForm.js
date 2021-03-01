import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { fetchOpportunities } from "../../actions";
import { Form } from "semantic-ui-react";

const roleOptions = [
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

class ContactForm extends React.Component {
  componentDidMount() {
    this.props.fetchOpportunities();
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
        id="contactForm"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form"
      >
        <div className="field">
          <label>Name</label>
          <Field name="name" component="input" type="text" />
        </div>
        <div className="field">
          <label>Role</label>
          <Field
            name="role"
            component={this.renderRoleDropdown}
            options={roleOptions}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <Field name="email" component="input" type="text" />
        </div>
        <div className="field">
          <label>Phone Number</label>
          <Field name="phone" component="input" type="text" />
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
      </form>
    );
  }
}

ContactForm = reduxForm({
  form: "contactForm",
})(ContactForm);

const mapStateToProps = (state) => {
  return {
    opportunities: Object.values(state.opportunities.data),
  };
};

export default connect(mapStateToProps, {
  fetchOpportunities,
})(ContactForm);
