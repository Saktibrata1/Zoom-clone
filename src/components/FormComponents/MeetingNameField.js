import React from "react";
import { Form } from "react-bootstrap";
import ThemeSelector from "../ThemeSelector";

function MeetingNameField({
  label,
  isInvalid,
  error,
  placeholder,
  value,
  setMeetingName,
}) {
  return (
    <ThemeSelector>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setMeetingName(e.target.value)}
          isInvalid={isInvalid}
        />
        {isInvalid && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
      </Form.Group>
    </ThemeSelector>
  );
}

export default MeetingNameField;
