import React from "react";
import { Form, Row, Col } from "react-bootstrap";

function MeetingMaximumUsersField({
  value,
  setSize,
}) {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
        Maximum People
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          type="number"
          min={1}
          max={50}
          placeholder="Maximum People"
          value={value}
          onChange={(e) => {
            if (!e.target.value.length || parseInt(e.target.value) === 0)
              setSize(1);
            else if (parseInt(e.target.value) > 50) setSize(50);
            else setSize(parseInt(e.target.value));
          }}
        />
      </Col>
    </Form.Group>
  );
}

export default MeetingMaximumUsersField;
