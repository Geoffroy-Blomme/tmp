import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { fetchProfilePost } from "../features/SignIn";
import { updateProfilePut } from "../features/UpdateProfile";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose/lib/driver";

const Main = styled.main`
  flex: 1;
`;

const MainDarkBg = styled(Main)`
  background-color: #12002b;
`;

const WelcomeMessageWrapper = styled.div`
  color: #fff;
  margin-bottom: 2rem;
`;

const WelcomeMessage = styled.h1``;

const WelcomeMessageName = styled.span``;

const EditButton = styled.button`
  border-color: #00bc77;
  background-color: #00bc77;
  color: #fff;
  font-weight: bold;
  padding: 10px;
`;

const Transaction = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  background-color: #fff;
  width: 80%;
  margin: 0 auto;
  flex-direction: column;
  padding: 1.5rem;
  box-sizing: border-box;
  text-align: left;
  margin-bottom: 2rem;
  @media (min-width: 720px) {
    flex-direction: row;
  }
`;

const TransactionWrapper = styled.div`
  width: 100%;
  flex: 1;
`;

const TransactionTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: normal;
`;

const TransactionAmount = styled.p`
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
`;

const TransactionDescription = styled.p`
  margin: 0;
`;

const TransactionWrapperCta = styled(TransactionWrapper)`
  @media (min-width: 720px) {
    flex: 0;
  }
`;

const TransactionButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  border-color: #00bc77;
  background-color: #00bc77;
  color: #fff;
  @media (min-width: 720px) {
    width: 200px;
  }
`;

const EditProfileInputWrapper = styled.div`
  display: flex;
  margin-bottom: 25px;
  justify-content: center;
`;

const EditProfileInput = styled.input`
  font-size: 18px;
  padding: 10px;
  &:first-of-type {
    margin-right: 10px;
  }
  &:last-of-type {
    margin-left: 10px;
  }
`;

const EditProfileButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const EditProfileButton = styled.button`
  height: 40px;
  width: 130px;
  color: #00bc77;
  border-color: #00bc77;
  font-weight: bold;
  background-color: white;
  border-radius: 3px;
  font-size: 15px;
  &:first-of-type {
    margin-right: 10px;
  }
  &:last-of-type {
    margin-left: 10px;
  }
`;

const EditProfileErrorWarning = styled.span`
  font-size: 12px;
`;

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignedIn = useSelector((state) => state.SignIn.isLoggedIn);
  const userInfo = useSelector((state) => state.SignIn.data.user);
  const token = useSelector((state) => state.SignIn.data.body.token);
  const [userIsModifyingProfile, setUserIsModifyingProfile] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  let firstName = "";
  let lastName = "";
  let firstNameWarningContent;
  let lastNameWarningContent;
  if (firstNameError) {
    firstNameWarningContent = "Votre prénom doit contenir au moins 2 lettres";
  } else {
    firstNameWarningContent = "";
  }
  if (lastNameError) {
    lastNameWarningContent = "Votre nom doit contenir au moins 2 lettres";
  } else {
    lastNameWarningContent = "";
  }

  if (userInfo) {
    firstName = userInfo.firstName;
    lastName = userInfo.lastName;
  }
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

  const editNameSaved = async () => {
    console.log(firstNameInput, lastNameInput);
    if (firstNameInput.length > 1 && lastNameInput.length > 1) {
      await dispatch(
        updateProfilePut({
          firstNameInput,
          lastNameInput,
          token,
        })
      );
      dispatch(fetchProfilePost(token));
      setUserIsModifyingProfile(!userIsModifyingProfile);
      setFirstNameInput("");
      setLastNameInput("");
      setFirstNameError(false);
      setLastNameError(false);
    } else {
      if (firstNameInput.length <= 1) {
        setFirstNameError(true);
      } else {
        setFirstNameError(false);
      }
      if (lastNameInput.length <= 1) {
        setLastNameError(true);
      } else {
        setLastNameError(false);
      }
    }
  };
  useEffect(() => {
    console.log(isSignedIn);
    if (isSignedIn) {
      dispatch(fetchProfilePost(token));
    } else {
      navigate("/Home");
    }
  }, []);

  return (
    <>
      <Header></Header>
      <MainDarkBg>
        <WelcomeMessageWrapper>
          <WelcomeMessage>
            Welcome back <br />
            <WelcomeMessageName
              style={{ display: userIsModifyingProfile ? "none" : "revert" }}
            >
              {firstName + " " + lastName}!
            </WelcomeMessageName>
          </WelcomeMessage>
          <EditButton
            style={{ display: userIsModifyingProfile ? "none" : "revert" }}
            onClick={() => {
              setUserIsModifyingProfile(!userIsModifyingProfile);
            }}
          >
            Edit Name
          </EditButton>
          <EditProfileInputWrapper
            style={{
              display: !userIsModifyingProfile ? "none" : "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
              }}
            >
              <EditProfileInput
                placeholder={firstName}
                value={firstNameInput}
                style={{
                  border: firstNameError ? "2px solid red" : "2px inset ",
                }}
                onChange={(e) => {
                  setFirstNameInput(e.target.value);
                }}
              ></EditProfileInput>
              <EditProfileErrorWarning>
                {firstNameWarningContent}
              </EditProfileErrorWarning>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
              }}
            >
              <EditProfileInput
                placeholder={lastName}
                value={lastNameInput}
                style={{
                  border: lastNameError ? "2px solid red" : "2px inset ",
                }}
                onChange={(e) => {
                  setLastNameInput(e.target.value);
                }}
              ></EditProfileInput>
              <EditProfileErrorWarning>
                {lastNameWarningContent}
              </EditProfileErrorWarning>
            </div>
          </EditProfileInputWrapper>
          <EditProfileButtonWrapper
            style={{ display: !userIsModifyingProfile ? "none" : "revert" }}
          >
            <EditProfileButton
              onClick={() => {
                editNameSaved();
              }}
            >
              Save
            </EditProfileButton>
            <EditProfileButton
              onClick={() => {
                setUserIsModifyingProfile(!userIsModifyingProfile);
              }}
            >
              Cancel
            </EditProfileButton>
          </EditProfileButtonWrapper>
        </WelcomeMessageWrapper>

        <Transaction>
          <TransactionWrapper>
            <TransactionTitle>Argent Bank Checking (x8349)</TransactionTitle>
            <TransactionAmount>$2,082.79</TransactionAmount>
            <TransactionDescription>Available Balance</TransactionDescription>
          </TransactionWrapper>
          <TransactionWrapperCta>
            <TransactionButton>View transactions</TransactionButton>
          </TransactionWrapperCta>
        </Transaction>

        <Transaction>
          <TransactionWrapper>
            <TransactionTitle>Argent Bank Savings (x6712)</TransactionTitle>
            <TransactionAmount>$10,928.42</TransactionAmount>
            <TransactionDescription>Available Balance</TransactionDescription>
          </TransactionWrapper>
          <TransactionWrapperCta>
            <TransactionButton>View transactions</TransactionButton>
          </TransactionWrapperCta>
        </Transaction>

        <Transaction>
          <TransactionWrapper>
            <TransactionTitle>Argent Bank Credit Card (x8349)</TransactionTitle>
            <TransactionAmount>$184.30</TransactionAmount>
            <TransactionDescription>Current Balance</TransactionDescription>
          </TransactionWrapper>
          <TransactionWrapperCta>
            <TransactionButton>View transactions</TransactionButton>
          </TransactionWrapperCta>
        </Transaction>
      </MainDarkBg>

      <Footer></Footer>
    </>
  );
}
