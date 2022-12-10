import { useQuery } from "react-query";
import axios from "axios";
import axiosConfig from "../axios.config";

export const getContent = async () => {
  const data = await axios.get(`${axiosConfig}/users`);
  const response = data;
  console.log("response => ", response);
};

// export const loginUser = async
