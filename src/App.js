import { useState, useEffect } from "react";
import { ToastContainer } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./pages/CreateMeeting";
import Dashboard from "./pages/Dashboard";
import JoinMeeting from "./pages/JoinMeeting";
import Login from "./pages/Login";
import Meeting from "./pages/Meeting";
import MyMeetings from "./pages/MyMeetings";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";
import VideoConference from "./pages/VideoConference";

export default function App() {
 
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  const [isInitialEffect, setIsInitialEffect] = useState(true);
 

  useEffect(() => {
    if (isInitialEffect) setIsInitialEffect(false);
    else {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkTheme]);

  const theme = localStorage.getItem("zoom-theme") || "light";
  useEffect(() => {
    localStorage.setItem("zoom-theme", theme);
  }, [theme]);

  return (
    <ThemeSelector>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateMeeting />} />
        <Route path="/create1on1" element={<OneOnOneMeeting />} />
        <Route path="/videoconference" element={<VideoConference />} />
        <Route path="/mymeetings" element={<MyMeetings />} />
        <Route path="/join/:id" element={<JoinMeeting />} />
        <Route path="/meetings" element={<Meeting />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeButton={false}
        draggable={false}
      />
    </ThemeSelector>
  );
}
