import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function MeetingDateField({
  selected,
  setStartDate,
}) {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
        Set Meeting Date
      </Form.Label>
      <Col sm={10}>
        <DatePicker
          selected={selected}
          onChange={(date) => setStartDate(date)}
          className="form-control"
        />
      </Col>
    </Form.Group>
  );
}

export default MeetingDateField;
