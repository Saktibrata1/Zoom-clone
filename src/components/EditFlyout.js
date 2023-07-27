import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { format } from "date-fns";
import useFetchUsers from "../hooks/useFetchUsers";
import useToast from "../hooks/useToast";
import { firebaseDB } from "../utils/firebaseConfig";
import CreateMeetingButtons from "./FormComponents/CreateMeetingButtons";
import MeetingDateField from "./FormComponents/MeetingDateField";
import MeetingMaximumUsersField from "./FormComponents/MeetingMaximumUsersField";
import MeetingNameField from "./FormComponents/MeetingNameField";
import MeetingUserField from "./FormComponents/MeetingUserField";

export default function EditFlyout({ closeFlyout, meeting }) {
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const [meetingName, setMeetingName] = useState(meeting.meetingName);
  const [meetingType] = useState(meeting.meetingType);
  const [selectedUser, setSelectedUser] = useState([]);
  const [startDate, setStartDate] = useState(new Date(meeting.meetingDate));
  const [size, setSize] = useState(1);
  const [status, setStatus] = useState(false);
  const onUserChange = (selectedOptions) => {
    setSelectedUser(selectedOptions);
  };

  useEffect(() => {
    if (users) {
      const foundUsers = [];
      meeting.invitedUsers.forEach((user) => {
        const findUser = users.find((tempUser) => tempUser.uid === user);
        if (findUser) foundUsers.push(findUser);
      });
      setSelectedUser(foundUsers);
    }
  }, [users, meeting]);

  const [showErrors] = useState({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUsers: {
      show: false,
      message: [],
    },
  });

  const editMeeting = async () => {
    const editedMeeting = {
      ...meeting,
      meetingName,
      meetingType,
      invitedUsers: selectedUser.map((user) => user.uid),
      maxUsers: size,
      meetingDate: format(startDate, "MM/dd/yyyy"),
      status: !status,
    };
    delete editedMeeting.docId;
    const docRef = firebaseDB.collection("meetings").doc(meeting.docId);
    await docRef.update(editedMeeting);
    createToast({ title: "Meeting updated successfully.", type: "success" });
    closeFlyout(true);
  };

  return (
    <div>
      <h2>{meeting.meetingName}</h2>
      <Form>
        <MeetingNameField
          label="Meeting name"
          isInvalid={showErrors.meetingName.show}
          error={showErrors.meetingName.message}
          placeholder="Meeting name"
          value={meetingName}
          setMeetingName={setMeetingName}
        />
        {meetingType === "anyone-can-join" ? (
          <MeetingMaximumUsersField value={size} setSize={setSize} />
        ) : (
          <MeetingUserField
            label="Invite Users"
            isInvalid={showErrors.meetingUsers.show}
            error={showErrors.meetingUsers.message}
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUser}
            singleSelection={meetingType === "1-on-1"}
            isClearable={false}
            placeholder="Select a User"
          />
        )}
        <MeetingDateField selected={startDate} setStartDate={setStartDate} />
        <Form.Group as={Row} controlId="cancelMeeting">
          <Form.Label column sm="auto">
            Cancel Meeting
          </Form.Label>
          <Col sm="auto">
            <Form.Check
              type="switch"
              id="cancelMeetingSwitch"
              label=""
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </Col>
        </Form.Group>
        <CreateMeetingButtons
          createMeeting={editMeeting}
          isEdit
          closeFlyout={closeFlyout}
        />
      </Form>
    </div>
  );
}
