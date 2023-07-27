const ToastType = {
  id: "",
  title: "",
  color: "success", // Can be "success", "primary", "warning", "danger", or undefined
};

const BreadCrumbsType = {
  text: "",
  href: undefined,
  onClick: undefined,
};

const MeetingJoinType = "anyone-can-join" | "video-conference" | "1-on-1";

const MeetingType = {
  docId: undefined,
  createdBy: "",
  invitedUsers: [],
  maxUsers: 0,
  meetingDate: "",
  meetingId: "",
  meetingName: "",
  meetingType: "", // Should be one of the MeetingJoinType values
  status: false,
};

const UserType = {
  email: "",
  name: "",
  uid: "",
  label: undefined,
};

const FieldErrorType = {
  show: false,
  message: [],
};
