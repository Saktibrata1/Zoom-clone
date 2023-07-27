import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
import MeetingNameField from "../components/FormComponents/MeetingNameField";
import MeetingUserField from "../components/FormComponents/MeetingUserField";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import useToast from "../hooks/useToast";
import { meetingsRef } from "../utils/firebaseConfig";
import { generateMeetingID } from "../utils/generateMeetingId";
import { format } from "date-fns";

export default function OneOnOneMeeting() {
  useAuth();
  const [createToast] = useToast();
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2023-07-06"));
  const [showErrors, setShowErrors] = useState({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

  const [users] = useFetchUsers(); // Fetching user options

  const onUserChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map((option) => {
      return {
        uid: option.value,
        label: option.text,
      };
    });
    setSelectedUser(selectedOptions);
  };
  

  const validateForm = () => {
    const showErrorsClone = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUser.length) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      const invitedUserIds = selectedUser.map((user) => user.uid); // Extract user IDs from selectedUser
      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: "1-on-1",
        invitedUsers: invitedUserIds, // Pass the array of user IDs
        meetingDate: format(startDate, "MM/dd/yyyy"),
        maxUsers: 1,
        status: true,
      });
      createToast({
        title: "One on One Meeting Created Successfully",
        type: "success",
      });
      navigate("/");
    }
  };
  


  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <Container>
        <MeetingNameField
          label="Meeting name"
          isInvalid={showErrors.meetingName.show}
          error={showErrors.meetingName.message}
placeholder="Meeting name"
          value={meetingName}
          setMeetingName={setMeetingName}
        />
        <MeetingUserField
          label="Invite User"
          isInvalid={showErrors.meetingUser.show}
          error={showErrors.meetingUser.message}
          options={users} // Pass the fetched user options
          onChange={onUserChange}
          selectedOptions={selectedUser}
          singleSelection={{ asPlainText: true }}
          isClearable={false}
          placeholder="Select a User"
        />
        <MeetingDateField selected={startDate} setStartDate={setStartDate} />
        <CreateMeetingButtons createMeeting={createMeeting} />
      </Container>
    </div>
  );
}
