import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currSeq: this.props.currSeq,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    const currSeq = { ...this.state.currSeq, [name]: value };

    this.setState({ currSeq });
  };

  render() {
    const { toggle, onSubmit } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>DNA Sequence</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="sequence">Sequence</Label>
              <Input
                type="text"
                id="seq"
                name="sequence"
                value={this.state.currSeq.sequence}
                // onChange={this.handleChange}
                placeholder="Enter Sequence"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSubmit(this.state.currSeq)}
          >
            Search
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}