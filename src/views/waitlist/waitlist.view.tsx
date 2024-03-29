import LandingNavBar from "../home/navbar/navbar.comp";
import styles from "./waitlist.module.scss";
import React, { useState } from "react";
import FooterHome from "../home/footer/footer.comp";
import { InputButton, InputText } from "../../comps/forms";
import WaitListModal from "./modal";
import axios from "axios";
import ToastMessage from "../../comps/toast";
import Loader from "../../comps/loader";
import { AddToWaitlistResponse } from "../../../dto/waitlist";
import { formartNumberToWords } from "../../helper/numberFIlter";
import { TopSection } from "../terms-privacy/comps";

export function WaitList() {
  const [showModalSuccessful, setshowModalSuccessful] = useState(false);
  const [sentSuccessful, setsentSuccessful] = useState(false);
  const [showLoader, setLoader] = useState(false);
  const [warningMsg, setWarningMsg] = useState(false);
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);
  const [waitlist, setWaitlistData] = useState<AddToWaitlistResponse>();

  const [waitlistDto, setWaitlist] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleSubmit = async () => {
    // console.log(formartNumberToWords(24));
    setLoader(true);
    if (waitlistDto.first_name && waitlistDto.last_name && waitlistDto.email) {
      setWaitlist({ first_name: "", last_name: "", email: "" });
      axios
        .post(`${process.env.NEXT_PUBLIC_SEVER_DOMAIN}/waitlist`, waitlistDto)
        .then((e) => {
          console.log(e, "then");
          setWaitlist({ first_name: "", last_name: "", email: "" });
          setsentSuccessful(true);
          setWaitlistData(e.data);
          setshowModalSuccessful(true);
          setTimeout(() => {
            setLoader(false);
            setsentSuccessful(false);
          }, 5000);
        })
        .catch((e) => {
          setLoader(false);
          const msg = e.response.data.message;
          if (msg === "Email already exixts") {
            setEmailAlreadyExist(true);
            setTimeout(() => {
              setEmailAlreadyExist(false);
            }, 4000);
          }
        });
    } else {
      setWarningMsg(true);
      setLoader(false);
      setTimeout(() => {
        setWarningMsg(false);
      }, 4000);
    }
    setTimeout(() => {
      setLoader(false);
    }, 8000);
  };

  return (
    <div>
      <LandingNavBar />
      {sentSuccessful && (
        <ToastMessage type={"success"} message={"Added successfully"} />
      )}
      {warningMsg && (
        <ToastMessage message="Kindly fill all fields" type="error" />
      )}
      {emailAlreadyExist && (
        <ToastMessage
          message="Thanks, email is already on the waitlist"
          type="info"
        />
      )}

      {showLoader && <Loader />}
      <TopSection
        title={"Join the waitlist!"}
        subtitle={`
         Our global spend management platform helps companies streamline
              their finance workflow so decision makers can easily analyze
              patterns and make data informed decisions in real time
      `}
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputText
              label={"First name"}
              name={"first_name"}
              value={waitlistDto.first_name}
              placeholder={"First name"}
              id={"first_name"}
              onChange={(e) => {
                setWaitlist({
                  ...waitlistDto,
                  first_name: e.target.value,
                });
              }}
            />

            <InputText
              label={"Last name"}
              placeholder={"Last name"}
              name={"last_name"}
              value={waitlistDto.last_name}
              id={"last_name"}
              onChange={(e) => {
                setWaitlist({
                  ...waitlistDto,
                  last_name: e.target.value,
                });
              }}
            />

            <InputText
              label={"Email"}
              placeholder={"Email"}
              name={"email"}
              value={waitlistDto.email}
              id={"email"}
              onChange={(e) =>
                setWaitlist({
                  ...waitlistDto,
                  email: e.target.value,
                })
              }
            />

            {/* <InputButton name={"Join"} onClick={() => handleSubmit()} /> */}
            <InputButton name={"Join"} onClick={() => handleSubmit()} />

            {showModalSuccessful && (
              <WaitListModal
                heading={"doow"}
                position={`You are the ${formartNumberToWords(
                  waitlist.count
                )} in line`}
                content={`
                  You are now on the waitlist. We can't wait to show you what
                  Cross-border business banking should feel like.
                `}
                onClose={() => setshowModalSuccessful(false)}
                name={waitlist.first_name}
              />
            )}
            {showModalSuccessful && (
              <WaitListModal
                heading={"doow"}
                position={`You are the ${formartNumberToWords(
                  waitlist.count
                )} in line`}
                content={`
                  You are now on the waitlist. We can't wait to show you what
                  Cross-border business banking should feel like.
                `}
                onClose={() => setshowModalSuccessful(false)}
                name={waitlist.first_name}
              />
            )}
          </form>
        </div>
      </div>
      <FooterHome />
    </div>
  );
}
