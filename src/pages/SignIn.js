import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginPost } from "../features/SignIn";
import { useNavigate } from "react-router-dom";

const Main = styled.main`
  flex: 1;
`;

const MainDarkBg = styled(Main)`
  background-color: #12002b;
`;

const SignInContent = styled.section`
  box-sizing: border-box;
  background-color: white;
  width: 300px;
  margin: 0 auto;
  margin-top: 3rem;
  padding: 2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 1rem;
  label {
    font-weight: bold;
  }
  input {
    padding: 5px;
    font-size: 1.2rem;
  }
`;

const InputRemember = styled.div`
  display: flex;
  label {
    margin-left: 0.25rem;
  }
`;

const SignInButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  border-color: #00bc77;
  background-color: #00bc77;
  color: #fff;
`;
export function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = useSelector((state) => state.SignIn.isLoggedIn);
  if (isLoggedIn) {
    console.log("ok");
    navigate("/User");
  }
  const loginAttempt = async () => {
    await dispatch(loginPost({ email: username, pwd: password }));
  };

  return (
    <>
      <Header></Header>
      <MainDarkBg>
        <SignInContent>
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <InputWrapper>
              <label htmlFor="username">Username</label>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                id="username"
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
              />
            </InputWrapper>
            <InputRemember>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </InputRemember>
            <SignInButton
              type="button"
              onClick={() => {
                loginAttempt();
              }}
            >
              {" "}
              Sign In
            </SignInButton>
          </form>
        </SignInContent>
      </MainDarkBg>
      <Footer></Footer>
    </>
  );
}
