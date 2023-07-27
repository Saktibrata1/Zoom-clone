import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Badge,
  Button,
  ButtonGroup,
  Container,
  Table,
} from "react-bootstrap";
import { getDocs, query } from "firebase/firestore";
import { useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { meetingsRef } from "../utils/firebaseConfig";

export default function Meeting() {
  useAuth();
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const getMyMeetings = async () => {
      const firestoreQuery = query(meetingsRef);
      const fetchedMeetings = await getDocs(firestoreQuery);
      if (fetchedMeetings.docs.length) {
        const myMeetings = [];
        fetchedMeetings.forEach((meeting) => {
          const data = meeting.data();
          if (data.createdBy === userInfo?.uid)
            myMeetings.push(meeting.data());
          else if (data.meetingType === "anyone-can-join")
            myMeetings.push(meeting.data());
          else {
            const index = data.invitedUsers.findIndex(
              (user) => user === userInfo?.uid
            );
            if (index !== -1) {
              myMeetings.push(meeting.data());
            }
          }
        });

        setMeetings(myMeetings);
      }
    };
    if (userInfo) getMyMeetings();
  }, [userInfo]);

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
    } else return <Badge variant="danger">Cancelled</Badge>;
  };

  const renderCopyButton = (meetingId) => {
    const handleCopy = () => {
      navigator.clipboard.writeText(
        `${process.env.REACT_APP_HOST}/join/${meetingId}`
      );
    };

    return (
      <ButtonGroup>
        <Button variant="secondary" onClick={handleCopy} aria-label="meeting-copy">
          Copy Link
        </Button>
      </ButtonGroup>
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header />
      <Container style={{ margin: "1rem" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Meeting Name</th>
              <th>Meeting Type</th>
              <th>Meeting Date</th>
              <th>Status</th>
              <th>Copy Link</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.meetingId}>
                <td>{meeting.meetingName}</td>
                <td>{meeting.meetingType}</td>
                <td>{meeting.meetingDate}</td>
                <td>{renderStatusBadge(meeting)}</td>
                <td>{renderCopyButton(meeting.meetingId)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
