import { Button } from "@chakra-ui/react";
import * as React from "react";
import { useQuery } from "react-query";
import { getContent } from "../../api/queries";

import { User } from "../../interfaces/user";

import If from "../../components/If";
import axios from "axios";
import axiosConfig from "../../axios.config";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const { isError, isLoading, data, isSuccess, refetch } = useQuery(
    "users",
    getContent,
    {
      enabled: false,
    },
  );

  console.log("hahaha", isLoading, isSuccess, isError, data);
  const getData = () => {
    refetch();
  };
  const checkAuth = async () => {
    const data = await axios.get(`${axiosConfig}/image`, {
      headers: { auth: localStorage.getItem("Authenticate") },
    });

    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button onClick={getData}>Get content</Button>
      <If condition={isSuccess}>
        <React.Fragment>
          {data?.map((d: User) => (
            <div key={d.id}>
              <h1>{d.name}</h1>
            </div>
          ))}
        </React.Fragment>
      </If>
      <Button onClick={checkAuth}>Check auth with token</Button>
    </div>
  );
}
