import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import OpportunityForm from "./OpportunityForm";

class CreateOpportunity extends React.Component {
  state = { open: false };
  changeModalState = (val) => {
    this.setState({ open: val });
  };
  render() {
    return (
      <Modal
        onClose={() => this.changeModalState(false)}
        onOpen={() => this.changeModalState(true)}
        open={this.state.open}
        trigger={
          <Button className="right floated primary">Add Opportunity</Button>
        }
      >
        <Modal.Header>Create An Opportunity</Modal.Header>
        <Modal.Content>
          <div>
            <OpportunityForm closeModal={this.changeModalState} />
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

export default CreateOpportunity;
