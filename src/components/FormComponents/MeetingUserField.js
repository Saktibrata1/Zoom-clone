import React from "react";
import { Form } from "react-bootstrap";

function MeetingUserField({
  label,
  isInvalid,
  error,
  options,
  onChange,
  selectedOptions,
  singleSelection = false,
  isClearable,
  placeholder,
}) {
  const selectedValues = Array.isArray(selectedOptions)
    ? selectedOptions.map((option) => option.uid)
    : singleSelection && selectedOptions ? selectedOptions.uid : "";

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        multiple={!singleSelection}
        onChange={onChange}
        value={selectedValues}
        isInvalid={isInvalid}
      >
        {options.map((option) => (
          <option key={option.uid} value={option.uid}>
            {option.label}
          </option>
        ))}
      </Form.Control>
      {isInvalid && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
    </Form.Group>
  );
}

export default MeetingUserField;
