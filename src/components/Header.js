import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  Button,
  ButtonGroup,
  Container,
  Navbar,
  Nav,
  Breadcrumb,
} from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { changeTheme } from "../app/slices/AuthSlice";
import {
  getCreateMeetingBreadCrumbs,
  getDashboardBreadCrumbs,
  getMeetingsBreadCrumbs,
  getMyMeetingsBreadCrumbs,
  getOneOnOneMeetingBreadCrumbs,
  getVideoConferenceBreadCrumbs,
} from "../utils/breadcrumbs";
import { firebaseAuth } from "../utils/firebaseConfig";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.name);
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  const [breadCrumbs, setBreadCrumbs] = useState([
    {
      text: "Dashboard",
    },
  ]);

  const dispatch = useDispatch();
  const [isResponsive, setIsResponsive] = useState(false);

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/") setBreadCrumbs(getDashboardBreadCrumbs(navigate));
    else if (pathname === "/create")
      setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
    else if (pathname === "/create1on1")
      setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate));
    else if (pathname === "/videoconference")
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
    else if (pathname === "/mymeetings")
      setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
    else if (pathname === "/meetings") {
      setBreadCrumbs(getMeetingsBreadCrumbs(navigate));
    }
  }, [location, navigate]);

  const logout = () => {
    signOut(firebaseAuth);
  };

  const invertTheme = () => {
    const theme = localStorage.getItem("zoom-theme");
    localStorage.setItem("zoom-theme", theme === "light" ? "dark" : "light");
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
  };

  useEffect(() => {
    if (window.innerWidth < 480) {
      setIsResponsive(true);
    }
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" style={{ minHeight: "8vh" }}>
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <span style={{ padding: "0 1vw", fontSize: "105%" }}>
                <span style={{ color: "#0b5cff" }}>Zoom</span>
              </span>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <span
                style={{
                  padding: "0 30vw",
                  color: "white",
                  fontSize: "105%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Hello,{" "}
                <span style={{ color: "#0b5cff", fontSize: "105%" }}>
                  {userName}
                </span>
              </span>
              <ButtonGroup>
                <Button
                  variant={isDarkTheme ? "warning" : "ghost"}
                  size="sm"
                  onClick={invertTheme}
                  aria-label="theme-button"
                >
                  {isDarkTheme ? (
                    <i className="bi bi-sun"></i>
                  ) : (
                    <i className="bi bi-moon"></i>
                  )}
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  onClick={logout}
                  aria-label="logout-button"
                >
                  <i className="bi bi-lock">Logout</i>
                </Button>
              </ButtonGroup>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar bg="light" variant="light" style={{ minHeight: "8vh" }}>
        <Container>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Breadcrumb>
                {breadCrumbs.map((breadcrumb, index) => (
                  <Breadcrumb.Item
                    key={index}
                    active={index === breadCrumbs.length - 1}
                    onClick={() => {
                      if (index !== breadCrumbs.length - 1) {
                        navigate(breadcrumb.path);
                      }
                    }}
                  >
                    {breadcrumb.text}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
