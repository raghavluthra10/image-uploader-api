import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import axiosConfig from "../axios.config";
import Cookies from "js-cookie";
import { LoginForm, User, SignUpForm } from "../interfaces/user";

export const loginUser = async (loginInfo: LoginForm) => {
  const { email, password } = loginInfo;

  if (!(email && password)) {
    window.alert("please provide all credentials");
    // replace with toast later
    return;
  }

  try {
    const response = await axios.post(axiosConfig + "/login", loginInfo, {
      withCredentials: true,
    });

    const { message, accessToken } = response.data;

    Cookies.set("auth", accessToken);
    window.localStorage.setItem("Authenticate", accessToken);
    return response;
  } catch (error: any) {
    const message: string = error.message;
    // add toaster
    window.alert(message);
    console.log(error);
  }
};

export const signupUser = async (signUpInfo: SignUpForm) => {
  const { name, email, password } = signUpInfo;
  if (!(email && password && name)) {
    window.alert("please enter all the credentials");
    // replace with toaster later
    return;
  }

  try {
    const response = await axios.post(
      axiosConfig + "/signup",
      { name, email, password },
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (error: any) {
    window.alert(error.message);
  }
};

export const uploadImage = async (formData: any) => {
  try {
    const response = await axios.post(`${axiosConfig}/image`, formData, {
      headers: { auth: localStorage.getItem("Authenticate") },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (src: string) => {
  try {
    const response = await axios.delete(`${axiosConfig}/image`, {
      params: { firebase_public_url: src },
      headers: { auth: localStorage.getItem("Authenticate") },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
