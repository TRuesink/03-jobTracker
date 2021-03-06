import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { createContact } from "../../actions";
import ContactForm from "./ContactForm";
import _ from "lodash";

class CreateContact extends React.Component {
  state = { open: false };
  changeModalState = (val) => {
    this.setState({ open: val });
  };
  onSubmit = (formValues) => {
    this.props.createContact(
      formValues.opportunity,
      _.omit(formValues, "opportunity")
    );
  };
  render() {
    return (
      <Modal
        onClose={() => this.changeModalState(false)}
        onOpen={() => this.changeModalState(true)}
        open={this.state.open}
        trigger={
          <Button className="right floated primary basic icon">
            <i className="plus icon"></i>
          </Button>
        }
      >
        <Modal.Header>Create A Contact</Modal.Header>
        <Modal.Content>
          <div>
            <ContactForm
              closeModal={this.changeModalState}
              onSubmit={this.onSubmit}
              initialValues={
                this.props.oppId ? { opportunity: this.props.oppId } : null
              }
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => this.changeModalState(false)}>
            Cancel
          </Button>
          <Button
            form="contactForm"
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            // onClick={() => this.onCloseModal()}
            primary
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(null, { createContact })(CreateContact);
