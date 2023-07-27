import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import meeting1 from "../assets/meeting1.png";
import meeting2 from "../assets/meeting2.png";

import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

export default function CreateMeeting() {
  useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Header />
        <Row
          className="justify-content-center align-items-center"
          style={{ margin: "5vh 10vw" }}
        >
          <Col>
            <Card
              style={{
                width: "18rem",
                backgroundColor: "#0b5cff",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onClick={() => navigate("/create1on1")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
              }}
            >
              <Card.Img
                variant="top"
                src={meeting1}
                alt="icon"
                style={{ width: "60%", margin: "0 auto", paddingTop: "1rem" }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "1.25rem" }}>
                  Create 1 on 1 Meeting
                </Card.Title>
                <Card.Text>
                  Create a personal single person meeting.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                width: "18rem",
                backgroundColor: "#0b5cff",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onClick={() => navigate("/videoconference")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
              }}
            >
              <Card.Img
                variant="top"
                src={meeting2}
                alt="icon"
                style={{ width: "60%", margin: "0 auto", paddingTop: "1rem" }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "1.25rem" }}>
                  Create Video Conference
                </Card.Title>
                <Card.Text>
                  Invite multiple persons to the meeting.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
