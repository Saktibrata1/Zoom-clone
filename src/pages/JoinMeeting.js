import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import { firebaseAuth, meetingsRef } from "../utils/firebaseConfig";
import { generateMeetingID } from "../utils/generateMeetingId";
import { format, isBefore, isAfter } from "date-fns";

export default function JoinMeeting() {
  const params = useParams();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const [isAllowed, setIsAllowed] = useState(false);
  const [user, setUser] = useState(undefined);
  const [userLoaded, setUserLoaded] = useState(false);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
    setUserLoaded(true);
  });

  useEffect(() => {
    const getMeetingData = async () => {
      if (params.id && userLoaded) {
        const firestoreQuery = query(
          meetingsRef,
          where("meetingId", "==", params.id)
        );
        const fetchedMeetings = await getDocs(firestoreQuery);

        if (fetchedMeetings.docs.length) {
          const meeting = fetchedMeetings.docs[0].data();
          const isCreator = meeting.createdBy === user?.uid;
          if (meeting.meetingType === "1-on-1") {
            if (meeting.invitedUsers[0] === user?.uid || isCreator) {
              if (meeting.meetingDate === format(new Date(), "MM/dd/yyyy")) {
                setIsAllowed(true);
              } else if (
                isBefore(new Date(meeting.meetingDate), new Date())
              ) {
                createToast({ title: "Meeting has ended.", type: "danger" });
                navigate(user ? "/" : "/login");
              } else if (isAfter(new Date(meeting.meetingDate), new Date())) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: "warning",
                });
                navigate(user ? "/" : "/login");
              }
            } else navigate(user ? "/" : "/login");
          } else if (meeting.meetingType === "video-conference") {
            const index = meeting.invitedUsers.findIndex(
              (invitedUser) => invitedUser === user?.uid
            );
            if (index !== -1 || isCreator) {
              if (meeting.meetingDate === format(new Date(), "MM/dd/yyyy")) {
                setIsAllowed(true);
              } else if (
                isBefore(new Date(meeting.meetingDate), new Date())
              ) {
                createToast({ title: "Meeting has ended.", type: "danger" });
                navigate(user ? "/" : "/login");
              } else if (isAfter(new Date(meeting.meetingDate), new Date())) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: "warning",
                });
              }
            } else {
              createToast({
                title: `You are not invited to the meeting.`,
                type: "danger",
              });
              navigate(user ? "/" : "/login");
            }
          } else {
            setIsAllowed(true);
          }
        }
      }
    };
    getMeetingData();
  }, [params.id, user, userLoaded, createToast, navigate]);

  const myMeeting = (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt("1019490523"),
      "074e2a357366f633fc8f1cf9b1e89811",
      params.id,
      user?.uid ? user.uid : generateMeetingID(),
      user?.displayName ? user.displayName : generateMeetingID()
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp?.joinRoom({
      container: element,
      maxUsers: 50,
      sharedLinks: [
        {
          name: "Personal link",
          url: window.location.origin,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return isAllowed ? (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    </div>
  ) : null;
}
