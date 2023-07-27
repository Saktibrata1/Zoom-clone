import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";

function CreateMeetingButtons({
  createMeeting,
  isEdit = false,
  closeFlyout,
}) {
  const navigate = useNavigate();
  return (
    <ButtonGroup>
      <Button
        variant="danger"
        onClick={() => (isEdit ? closeFlyout() : navigate("/"))}
      >
        Cancel
      </Button>
      <Button variant="primary" type="submit" onClick={createMeeting}>
        {isEdit ? "Edit Meeting" : "Create Meeting"}
      </Button>
    </ButtonGroup>
  );
}

export default CreateMeetingButtons;
