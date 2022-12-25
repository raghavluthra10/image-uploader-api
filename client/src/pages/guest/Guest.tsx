import { Button } from "@chakra-ui/react";
import * as React from "react";
import { BsFillCloudRainHeavyFill } from "react-icons/bs";
import styled from "styled-components";

// export interface IAppProps {}

const Container = styled.div`
  /* padding: 40px 80px; */
  display: flex;
  flex-direction: column;
`;

const SectionOne = styled.div`
  margin-top: 150px;
  padding: 40px 140px;
  display: flex;
  margin-bottom: 100px;
`;

const LeftSection = styled.h1`
  font-size: 32px;
  flex: 0.5;
  font-weight: 500;
  color: var(--secondary);
`;

const Cloud = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CTA = styled.h1`
  font-size: 40px;
  font-weight: 500;
  color: var(--secondary);
  margin-top: 64px;
  /* background-color: var(--tertiary); */
`;

const Welcome = styled.h1`
  font-size: 32px;
  flex: 0.5;
  font-weight: 500;
  color: var(--secondary);
`;

export default function App() {
  return (
    <Container>
      <SectionOne>
        <LeftSection>
          <Welcome>
            Welcome to your only solution for storing images on cloud.
          </Welcome>

          <CTA>Login to get started.</CTA>
        </LeftSection>

        <Cloud>
          <BsFillCloudRainHeavyFill size="300px" color="var(--secondary)" />
        </Cloud>
      </SectionOne>
    </Container>
  );
}
