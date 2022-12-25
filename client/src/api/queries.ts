import { useQuery } from "react-query";
import axios from "axios";
import axiosConfig from "../axios.config";
import Cookies from "js-cookie";

export const getContent = async () => {
  const data = await axios.get(`${axiosConfig}/users`, {
    headers: { auth: localStorage.getItem("Authenticate") },
  });
  const response = data.data.data;

  const parsedData = JSON.parse(response);
  return parsedData;
};

export const checkAuth = () => {
  const cookie = Cookies.get("auth");
  console.log(cookie);
  return cookie;
};

export const getAllImagesOfAUser = async () => {
  try {
    const response = await axios.get(`${axiosConfig}/usersImages`, {
      headers: { auth: localStorage.getItem("Authenticate") },
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
