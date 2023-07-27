import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Badge, Button, ButtonGroup, Container, Table } from "react-bootstrap";
import { getDocs, query, where } from "firebase/firestore";
import { useAppSelector } from "../app/hooks";
import EditFlyout from "../components/EditFlyout";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { meetingsRef } from "../utils/firebaseConfig";

export default function MyMeetings() {
  useAuth();
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
  const [meetings, setMeetings] = useState([]);
  const [showEditFlyout, setShowEditFlyout] = useState(false);
  const [editMeeting, setEditMeeting] = useState(null);

  const getMyMeetings = useCallback(async () => {
    const firestoreQuery = query(
      meetingsRef,
      where("createdBy", "==", userInfo?.uid)
    );
    const fetchedMeetings = await getDocs(firestoreQuery);
    if (fetchedMeetings.docs.length) {
      const myMeetings = fetchedMeetings.docs.map((meeting) => ({
        docId: meeting.id,
        ...meeting.data(),
      }));
      setMeetings(myMeetings);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) getMyMeetings();
  }, [userInfo, getMyMeetings]);

  const openEditFlyout = (meeting) => {
    setShowEditFlyout(true);
    setEditMeeting(meeting);
  };

  const closeEditFlyout = (dataChanged = false) => {
    setShowEditFlyout(false);
    setEditMeeting(null);
    if (dataChanged) getMyMeetings();
  };

  const renderStatusBadge = (meeting) => {
    if (meeting.status) {
      if (meeting.meetingDate === format(new Date(), "MM/dd/yyyy")) {
        return (
          <Badge variant="success">
            <Link to={`/join/${meeting.meetingId}`} style={{ color: "black" }}>
              Join Now
            </Link>
          </Badge>
        );
      } else if (
        new Date(meeting.meetingDate) < new Date(format(new Date(), "MM/dd/yyyy"))
      ) {
        return <Badge variant="default">Ended</Badge>;
      } else if (
        new Date(meeting.meetingDate) > new Date(format(new Date(), "MM/dd/yyyy"))
      ) {
        return <Badge variant="primary">Upcoming</Badge>;
      }
    }
    return <Badge variant="danger">Cancelled</Badge>;
  };

  const renderEditButton = (meeting) => (
    <ButtonGroup>
      <Button
        variant="danger"
        onClick={() => openEditFlyout(meeting)}
        disabled={
          new Date(meeting.meetingDate) < new Date(format(new Date(), "MM/dd/yyyy")) ||
          !meeting.status
        }
        aria-label="meeting-edit"
      >
        Edit
      </Button>
    </ButtonGroup>
  );

  const renderCopyButton = (meetingId) => (
    <ButtonGroup>
      <Button
        variant="secondary"
        onClick={() =>
          navigator.clipboard.writeText(
            `${process.env.REACT_APP_HOST}/join/${meetingId}`
          )
        }
        aria-label="meeting-copy"
      >
        Copy Link
      </Button>
    </ButtonGroup>
  );

  return (
    <div style={{display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header />
      <Container style={{ margin: "1rem" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Meeting Name</th>
              <th>Meeting Type</th>
              <th>Meeting Date</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Copy Link</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.docId}>
                <td>{meeting.meetingName}</td>
                <td>{meeting.meetingType}</td>
                <td>{meeting.meetingDate}</td>
                <td>{renderStatusBadge(meeting)}</td>
                <td>{renderEditButton(meeting)}</td>
                <td>{renderCopyButton(meeting.meetingId)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {showEditFlyout && (
        <EditFlyout
          closeFlyout={closeEditFlyout}
          meeting={editMeeting}
        />
      )}
    </div>
  );
}
