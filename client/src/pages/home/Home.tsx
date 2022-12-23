import * as React from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { getContent } from "../../api/queries";
import If from "../../components/If";
import {
  Button as ChakraButton,
  ButtonGroup,
  Flex,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { ImCancelCircle } from "react-icons/im";
import { IoMdCloudUpload } from "react-icons/io";
import { Image } from "@chakra-ui/react";
import axios from "axios";
import axiosConfig from "../../axios.config";
import { uploadImage } from "../../api/mutations";
import { Spinner } from "@chakra-ui/react";
export interface IAppProps {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

const UserInfo = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 116px;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 2px 2px 4px #333;
`;

const PhotosSection = styled.section`
  margin-top: 64px;
  padding: 32px;
  /* border: 1px solid black; */
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  /* grid-template-rows: repeat(2, 1fr); */
`;

export default function App(props: IAppProps) {
  const [file, setFile] = React.useState<any>(null);
  const [showUploadButton, setShowUploadButton] =
    React.useState<boolean>(false);

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onMutate: (variable) => {
      console.log("variable upload image mutation ===>", variable);
      return variable;
    },
    onError: (error, variables, context) => {
      console.log(`error =>`, error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      setShowUploadButton(false);
      console.log("success => ", data, variables, context);
    },
  });

  const uploadPhoto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    uploadImageMutation.mutate(formData);
  };

  const hiddenButtonRef = React.useRef<HTMLInputElement>(null);

  const implementUseRef = () => {
    if (hiddenButtonRef.current != null) {
      hiddenButtonRef.current.click();
    }
  };

  const fetchFile = (e: any) => {
    console.log("fetch file", e.target.files[0]);

    setFile(e.target.files[0]);
    setShowUploadButton(true);
  };

  const cancelFormSubmission = () => {
    setFile(null);
    setShowUploadButton(false);
  };

  return (
    <React.Fragment>
      <If condition={uploadImageMutation.isLoading}>
        <Flex alignItems="center" direction="column">
          <Spinner
            mt="124px"
            thickness="4px"
            speed="0.8s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </If>
      <If condition={!uploadImageMutation.isLoading}>
        <Container>
          <UserInfo>
            <Flex p="16px" flexDirection="column">
              <div>Name: raghav</div>
              <div>Photos: 3</div>
            </Flex>
            <Flex p="16px">
              <form
                onSubmit={uploadPhoto}
                method="post"
                encType="multipart/form-data"
              >
                <If condition={showUploadButton}>
                  <ButtonGroup spacing={6}>
                    <ChakraButton type="submit">Upload</ChakraButton>

                    <IconButton aria-label="" onClick={cancelFormSubmission}>
                      <ImCancelCircle />
                    </IconButton>
                  </ButtonGroup>
                </If>
                <input
                  ref={hiddenButtonRef}
                  type="file"
                  name="image"
                  style={{ display: "none" }}
                  onChange={fetchFile}
                />

                <If condition={!showUploadButton}>
                  <IconButton aria-label={""} onClick={implementUseRef}>
                    <IoMdCloudUpload
                      style={{
                        height: "100%",
                        width: "100%",
                        alignSelf: "center",
                        cursor: "pointer",
                      }}
                    />
                  </IconButton>
                </If>
              </form>
            </Flex>
          </UserInfo>

          <PhotosSection>
            <Image
              src="https://images.unsplash.com/photo-1671398297702-4725d9a2f8e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80"
              alt="dnuerdnew"
            />

            <Image
              src="https://images.unsplash.com/photo-1671398297702-4725d9a2f8e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80"
              alt="dnuerdnew"
            />

            <Image
              src="https://images.unsplash.com/photo-1671398297702-4725d9a2f8e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80"
              alt="dnuerdnew"
            />

            <Image
              src="https://images.unsplash.com/photo-1671398297702-4725d9a2f8e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80"
              alt="dnuerdnew"
            />
          </PhotosSection>
        </Container>
      </If>
    </React.Fragment>
  );
}
