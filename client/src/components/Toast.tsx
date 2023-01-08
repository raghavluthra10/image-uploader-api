import { Flex, Box } from "@chakra-ui/react";
import * as React from "react";

interface IAppProps {
  title?: string;
  description: string;
  toastColor: string;
}

const App: React.FunctionComponent<IAppProps> = ({
  title,
  description,
  toastColor,
}) => {
  return (
    <Flex
      color="white"
      p="20px"
      borderRadius="8px"
      bg={toastColor}
      flexDirection="column"
    >
      <Box bg={toastColor}>{title}</Box>

      <Box bg={toastColor}>{description}</Box>
    </Flex>
  );
};

export default App;
