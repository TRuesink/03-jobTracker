import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

function CreateOpportunity() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button className="right floated primary">Add Opportunity</Button>
      }
    >
      <Modal.Header>Create An Opportunity</Modal.Header>
      <Modal.Content>test</Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default CreateOpportunity;
