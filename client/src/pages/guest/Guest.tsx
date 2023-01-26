import * as React from "react";
import { BsFillCloudRainHeavyFill } from "react-icons/bs";
import styled from "styled-components";
import useLoggedIn from "../../hooks/use-loggedIn";

// export interface IAppProps {}

const Container = styled.div`
  margin-top: 150px;
  padding: 40px 140px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;

  @media (max-width: 900px) {
    padding: 40px 80px;
  }

  @media (max-width: 700px) {
    /* justify-content: ; */
    flex-direction: column;
    align-items: center;
    padding: 28px 56px;
  }
`;

const LeftSection = styled.div`
  font-size: 32px;
  flex: 0.5;
  font-weight: 500;
  max-width: 400px;
  color: var(--secondary);

  @media (max-width: 700px) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 80px;
  }
`;

const Cloud = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Welcome = styled.h1`
  font-size: 32px;
  flex: 0.5;
  font-weight: 500;
  color: var(--secondary);
  min-width: 300px;

  @media (max-width: 700px) {
    flex: 1;
    font-size: 24px;
  }
`;

export default function App() {
  useLoggedIn();

  return (
    <Container>
      <LeftSection>
        <Welcome>
          Welcome to your only solution for storing images on cloud.
        </Welcome>
      </LeftSection>

      <Cloud>
        <BsFillCloudRainHeavyFill size="300px" color="var(--secondary)" />
      </Cloud>
    </Container>
  );
}
