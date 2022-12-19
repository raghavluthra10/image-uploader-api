import { Button } from "@chakra-ui/react";
import * as React from "react";
import { useQuery } from "react-query";
import { getContent } from "../../api/queries";

import { User } from "../../interfaces/user";

import If from "../../components/If";

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
    </div>
  );
}
