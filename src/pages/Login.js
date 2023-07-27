import React, { useEffect } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { firebaseAuth, firebaseDB, usersRef } from "../utils/firebaseConfig";
import { Image, Card } from "react-bootstrap";
import logo from "../assets/logo.png";
import animation from "../assets/animation.gif";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);

    if (email) {
      const firestoreQuery = query(usersRef, where("uid", "==", uid));
      const fetchedUser = await getDocs(firestoreQuery);
      if (fetchedUser.docs.length === 0) {
        await addDoc(collection(firebaseDB, "users"), {
          uid,
          name: displayName,
          email,
        });
      }
      dispatch(setUser({ uid, email: email, name: displayName }));
      navigate("/");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0b5cff", // Blue background color
      }}
    >
      <div className="p-5">
        <Card
          style={{
            padding: "20px",
            backgroundColor: "white", // White card background color
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", // Shadow effect
            transition: "box-shadow 0.3s ease-in-out", // Transition for hover effect
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0px 0px 15px rgba(0, 0, 0, 0.5)"; // Increase shadow on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.3)"; // Restore shadow on hover out
          }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <div className="mr-4">
              <Image src={animation} alt="logo" />
            </div>
            <div>
              <Image src={logo} alt="logo" style={{ width: "230px" }} />
              <h3 className="text-center">
                One Platform to <span style={{ color: "#0b5cff" }}>connect</span>
              </h3>
              <button
                className="btn btn-primary btn-block mt-4"
                style={{ backgroundColor: "#0b5cff" }} // Blue button color
                onClick={login}
              >
                Login with Google
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;
