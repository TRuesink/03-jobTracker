import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createOpportunity } from "../../actions";
import { Dropdown, Form } from "semantic-ui-react";

const stageOptions = [
  {
    key: "research",
    text: "research",
    value: "research",
  },
  {
    key: "info meeting",
    text: "info meeting",
    value: "info meeting",
  },
  {
    key: "screening interview",
    text: "screening interview",
    value: "screening interview",
  },
  {
    key: "technical interview",
    text: "technical interview",
    value: "technical interview",
  },
  {
    key: "negotiation",
    text: "negotiation",
    value: "negotiation",
  },
  {
    key: "won",
    text: "won",
    value: "won",
  },
  {
    key: "lost",
    text: "lost",
    value: "lost",
  },
];

const sizeOptions = [
  {
    key: "1-10",
    text: "1-10",
    value: "1-10",
  },
  {
    key: "11-50",
    text: "11-50",
    value: "11-50",
  },
  {
    key: "51-100",
    text: "51-100",
    value: "51-100",
  },
  {
    key: "101-200",
    text: "101-200",
    value: "101-200",
  },
  {
    key: "201-500",
    text: "201-500",
    value: "201-500",
  },
  {
    key: "501-1000",
    text: "501-1000",
    value: "501-1000",
  },
  {
    key: "1001-5000",
    text: "1001-5000",
    value: "1001-5000",
  },
  {
    key: "5001-10000",
    text: "5001-10000",
    value: "5001-10000",
  },
];

const industryOptions = [
  {
    key: "healthcare",
    text: "healthcare",
    value: "healthcare",
  },
  {
    key: "finance",
    text: "finance",
    value: "finance",
  },
  {
    key: "internet",
    text: "internet",
    value: "internet",
  },
  {
    key: "insurance",
    text: "insurance",
    value: "insurance",
  },
  {
    key: "technology",
    text: "technology",
    value: "technology",
  },
  {
    key: "other",
    text: "other",
    value: "other",
  },
];

class OpportunityForm extends React.Component {
  onFormSubmit = (formValues) => {
    this.props.createOpportunity(formValues);
    this.props.closeModal(false);
  };

  renderDropdown({ input, options }) {
    console.log(input);
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
        <div className="two fields">
          <div className="field">
            <label>Name</label>
            <Field name="name" component="input" type="text" />
          </div>
          <div className="field">
            <label>Size</label>
            <Field
              name="size"
              component={this.renderDropdown}
              options={sizeOptions}
            />
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>Location</label>
            <Field name="location" component="input" type="text" />
          </div>
          <div className="field">
            <label>Industry</label>
            <Field
              name="industry"
              component={this.renderDropdown}
              options={industryOptions}
            />
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>Stage</label>
            <Field
              name="stage"
              component={this.renderDropdown}
              options={stageOptions}
            />
          </div>
          <div className="field">
            <label>About</label>
            <Field name="about" component="textarea" rows="3" />
          </div>
        </div>
      </form>
    );
  }
}

OpportunityForm = reduxForm({
  form: "opportunityForm",
})(OpportunityForm);

export default connect(null, { createOpportunity })(OpportunityForm);
