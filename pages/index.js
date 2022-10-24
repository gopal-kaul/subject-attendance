import Head from "next/head";
import { useRef } from "react";
import Admin from "../components/Admin";
import Student from "../components/Student";
import { app } from "../lib/firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth(app);
export default function Home() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const login = () => {
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    );
  };
  const logout = () => {
    signOut(auth);
  };
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    if (user.email === "faculty@uceou.edu") {
      return (
        <div>
          <Admin />
          <button
            className="px-4 py-2.5 rounded-md bg-red-500 text-white"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      );
    }
    if (user.email === "student@uceou.edu") {
      return (
        <div>
          <Student />
          <button
            className="px-4 py-2.5 rounded-md bg-red-500 text-white"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      );
    }
  }
  return (
    <form
      className="flex flex-col gap-2 w-min"
      onSubmit={(e) => {
        e.preventDefault();
        login();
      }}
    >
      <label htmlFor="email">Enter your email : </label>
      <input
        className="border-2 border-gray-500"
        type={"email"}
        name="email"
        ref={emailRef}
      />
      <label htmlFor="password">Enter your password : </label>
      <input
        className="border-2 border-gray-500"
        type={"password"}
        name="password"
        ref={passwordRef}
      />
      <button
        type="submit"
        className="bg-blue-500 px-4 py-2.5 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
}
