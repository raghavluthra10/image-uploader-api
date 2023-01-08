import { Button } from "@chakra-ui/react";
import * as React from "react";
import { BsFillCloudRainHeavyFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import If from "../../components/If";

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

const LeftSection = styled.div`
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
  const [userAuth, setUserAuth] = React.useState<boolean | null>(null);

  const checkIfUserIsAuthenticated = () => {
    const regexJwt = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

    // const cookie = Cookies.get("auth");
    const cookie = window.localStorage.getItem("Authenticate");
    if (cookie && regexJwt.test(cookie)) {
      setUserAuth(true);
    } else {
      setUserAuth(false);
    }
  };

  React.useEffect(() => {
    checkIfUserIsAuthenticated();
  }, []);

  return (
    <Container>
      <SectionOne>
        <LeftSection>
          <Welcome>
            Welcome to your only solution for storing images on cloud.
          </Welcome>

          <If condition={!userAuth}>
            <CTA>
              <Link to="/login">
                <Button size="2lg" padding="16px 28px">
                  Login
                </Button>
              </Link>
              {"  "}
              to get started.
            </CTA>
          </If>
        </LeftSection>

        <Cloud>
          <BsFillCloudRainHeavyFill size="300px" color="var(--secondary)" />
        </Cloud>
      </SectionOne>
    </Container>
  );
}
