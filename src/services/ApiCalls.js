import axios from "axios";
const BASE_URL = "http://localhost:3001/api/v1";

export const Login = async (email, pwd) => {
  try {
    return await axios
      .post(`${BASE_URL}/user/login`, {
        email: email,
        password: pwd,
      })
      .then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};

export const SignUp = async (data) => {
  const { email, password, firstName, lastName } = data;
  try {
    return await axios
      .post(`${BASE_URL}/user/signup`, {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
      .then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};

export const fetchProfile = async (token) => {
  try {
    return await axios({
      method: "POST",
      url: `${BASE_URL}/user/profile`,
      headers: {
        Authorization: `Bearer${token}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateProfile = async (firstName, lastName, token) => {
  try {
    return await axios({
      method: "PUT",
      url: `${BASE_URL}/user/profile`,
      data: {
        firstName: firstName,
        lastName: lastName,
      },
      headers: {
        Authorization: `Bearer${token}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
