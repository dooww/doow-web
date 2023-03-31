import type { NextPage } from "next";
import styles from "./login.module.scss";
import { useRouter } from "next/router";
import SignIn from "./signIn";
import SignUp from "./signUp";
import { useState } from "react";
import LandingNavBar from "../home/navbar/navbar.comp";

export interface IProps {
  onChange: () => void;
}

export const LoginView: NextPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();

  return (
    <div>
      <div className={styles.login}>
        {/* <LandingNavBar /> */}
        <div className={styles.container}>
          {showSignUp ? (
            <SignUp onChange={() => setShowSignUp(false)} />
          ) : (
            <SignIn onChange={() => setShowSignUp(true)} />
          )}
        </div>
      </div>
    </div>
  );
};
