import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dashboard1 from "../assets/dashboard1.png";
import dashboard2 from "../assets/dashboard2.png";
import dashboard3 from "../assets/dashboard3.png";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

function Dashboard() {
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
          style={{ margin: "5vh 17vw" }}
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
              onClick={() => navigate("/create")}
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
                src={dashboard1}
                alt="icon"
                style={{ width: "60%", margin: "0 auto", paddingTop: "1rem" }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "1.25rem" }}>
                  Create Meeting
                </Card.Title>
                <Card.Text>
                  Create a new meeting and invite people.
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
              onClick={() => navigate("/mymeetings")}
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
                src={dashboard2}
                alt="icon"
                style={{ width: "60%", margin: "0 auto", paddingTop: "1rem" }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "1.25rem" }}>
                  My Meetings
                </Card.Title>
                <Card.Text>View your created meetings.</Card.Text>
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
              onClick={() => navigate("/meetings")}
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
                src={dashboard3}
                alt="icon"
                style={{ width: "60%", margin: "0 auto", paddingTop: "1rem" }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "1.25rem" }}>
                  Meetings
                </Card.Title>
                <Card.Text>
                  View the meetings that you are invited to.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;