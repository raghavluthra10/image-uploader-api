import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 80px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 40px;
`;

const Description = styled.section`
  width: 70vw;
  font-size: 18px;
`;

export default function App() {
  return (
    <Container>
      <Title>About</Title>
      <Description>
        This image uploading application is built using a combination of
        technologies including Express.js for the server-side framework,
        Postgres for the database, Knex.js for database connection and making
        queries, TypeScript for type checking, React.js for the user interface,
        Firebase Storage for storing the uploaded photos, and Docker for the
        local development environment.
        <br />
        <br />
        The application allows users to easily upload and manage their images,
        with a streamlined and user-friendly interface. The use of Docker allows
        for a consistent and easily replicable development environment, while
        Firebase Storage provides a secure and reliable way to store and access
        the uploaded images.
      </Description>
    </Container>
  );
}
