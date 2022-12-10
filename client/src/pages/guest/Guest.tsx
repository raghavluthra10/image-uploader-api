import { Button } from "@chakra-ui/react";
import * as React from "react";
import { useQuery } from "react-query";
import { getContent } from "../../api/queries";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const { data, error, isLoading, refetch } = useQuery("users", getContent, {
    enabled: false,
  });

  console.log("hahaha", isLoading, error, data);
  const getData = () => {
    refetch();
  };
  return (
    <div>
      <Button onClick={getData}>Get content</Button>
    </div>
  );
}
