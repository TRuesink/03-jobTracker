import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { createActivity } from "../../actions";
import ActivityForm from "./ActivityForm";
import _ from "lodash";

class CreateActivity extends React.Component {
  state = { open: false };
  changeModalState = (val) => {
    this.setState({ open: val });
  };
  onSubmit = (formValues) => {
    this.props.createActivity(
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
        <Modal.Header>Create An Activity</Modal.Header>
        <Modal.Content>
          <div>
            <ActivityForm
              closeModal={this.changeModalState}
              onSubmit={this.onSubmit}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => this.changeModalState(false)}>
            Cancel
          </Button>
          <Button
            form="oppForm"
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

export default connect(null, { createActivity })(CreateActivity);
