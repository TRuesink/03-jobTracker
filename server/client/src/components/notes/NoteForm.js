import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { fetchOpportunities } from "../../actions";
import { Form } from "semantic-ui-react";

class NoteForm extends React.Component {
  componentDidMount() {
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
        id="noteForm"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form"
      >
        <div className="field">
          <label>What ppportunity is this related to?</label>
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
          <label>Note</label>
          <Field name="content" component="textarea" row="3" />
        </div>
      </form>
    );
  }
}

NoteForm = reduxForm({
  form: "noteForm",
})(NoteForm);

const mapStateToProps = (state) => {
  return {
    opportunities: Object.values(state.opportunities.data),
  };
};

export default connect(mapStateToProps, {
  fetchOpportunities,
})(NoteForm);
