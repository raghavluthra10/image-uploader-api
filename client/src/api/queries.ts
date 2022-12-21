import { useQuery } from "react-query";
import axios from "axios";
import axiosConfig from "../axios.config";
import Cookies from "js-cookie";

export const getContent = async () => {
  const data = await axios.get(`${axiosConfig}/users`, {
    headers: { auth: localStorage.getItem("Authenticate") },
  });
  const response = data.data.data;
  console.log("response => ", JSON.parse(response));

  const parsedData = JSON.parse(response);
  return parsedData;
};

export const checkAuth = () => {
  const cookie = Cookies.get("auth");
  console.log(cookie);
  return cookie;
};

// export const loginUser = async
