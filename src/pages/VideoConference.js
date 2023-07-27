import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
import MeetingNameField from "../components/FormComponents/MeetingNameField";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import { meetingsRef } from "../utils/firebaseConfig";
import { generateMeetingID } from "../utils/generateMeetingId";
import { format } from "date-fns";

export default function VideoConference() {
  useAuth();
  const [createToast] = useToast();
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [showErrors, setShowErrors] = useState({
    meetingName: {
      show: false,
      message: [],
    },
  });

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
    setShowErrors(showErrorsClone);
    return errors;
  };

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: "anyone-can-join",
        meetingDate: format(startDate, "MM/dd/yyyy"),
        maxUsers: 100,
        status: true,
      });
      createToast({
        title: "Video Conference Created Successfully",
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
        <MeetingDateField selected={startDate} setStartDate={setStartDate} />
        <CreateMeetingButtons createMeeting={createMeeting} />
      </Container>
    </div>
  );
}
